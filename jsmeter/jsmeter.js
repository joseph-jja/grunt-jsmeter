exports.jsmeter = (function () {
	var basePath = process.cwd(),
		fs = require("fs"),
		tokens = require("./tokens"),
		results = [],
		events = require("events");
	tokens.setup();
	
	var SimpleEventedObject = function () {
		events.EventEmitter.call(this);
	};
	SimpleEventedObject.super_ = events.EventEmitter;
	SimpleEventedObject.prototype = Object.create(events.EventEmitter.prototype, {
		constructor : {
			value : SimpleEventedObject,
			enumerable : false
		}
	});
	
	var runJsmeter = function (source, name) {
		var result = [];
		try {
			var parse = require("./parse").make_parse(),
				tree = parse(source),
				complexity = require("./complexity").make_complexity();
				out = {
					text : "",
					write : function (data) {
						this.text += data;
					}
				};
			complexity.complexity(tree, name);
			complexity.renderStats(out, "JSON");
						
			result = JSON.parse(out.text);
		} catch (ex) {
			console.log("Could not run jsmeter on file: " + name);
            console.log("\t An exception occured: " + ex.message);
            if ( ex.line ) {
			   console.log("\t on line: " + ex.line);
            }
		}
		delete parse;
		delete source;
		delete tree;
		
		return result;
	};
	
	var start = function () {
		var verbose = false;
		var args = process.argv;
		for (var a = 2; a < args.length; a++) {
			if (args[a] === "--verbose") {
				verbose = true;
				continue;
			}
			fs.readFile(args[a], "utf8", (function (name) {
				return function (err, data) {
					if (err) throw err;
					var result = runJsmeter(data, name.match(/([^\/])\.js$/)[1]);
					for (var i = 0; i < result.length; i++) {
						if (verbose) {
							console.dir(result[i]);
						}
						console.log(name, result[i].name.replace(/^\[\[[^\]]*\]\]\.?/, ""));
						console.log(" line start: %d", result[i].lineStart);
						console.log(" lines:      %d", result[i].lines);
						console.log(" statements: %d", result[i].s);
						console.log(" comments:   %d", result[i].comments);
						console.log(" complexity: %d", result[i].complexity);
						console.log(" M.I.:       %d", result[i].mi);
					}
				};
			})(args[a]));
		}
	};
	
	start();
	
	return {
		run : runJsmeter
	};
})();