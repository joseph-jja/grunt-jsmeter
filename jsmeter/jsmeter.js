exports.jsmeter = (function () {
	var tokens = require("./tokens"),
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
	
	var runJsmeter = function (source, name, mode) {
		var result = [];
		try {
			var parse = require("./parse").make_parse(),
				tree = parse(source),
				complexity = require("./complexity").make_complexity(),
				out = {
					text : "",
					write : function (data) {
						this.text += data;
					}
				};
			complexity.complexity(tree, name);
			complexity.renderStats(out, mode || "JSON");
				
            if (!mode || mode === "JSON") {    
                result = JSON.parse(out.text);
            } else {
                result = out.text;
            }
		} catch (ex) {
			console.log("Could not run jsmeter on file: " + name);
            console.log("\t An exception occured: " + ex.message);
            if ( ex.line ) {
			   console.log("\t on line: " + ex.line);
            }
            result = ex;
		}
        
		return result;
	};
	
	return {
		run : runJsmeter
	};
})();