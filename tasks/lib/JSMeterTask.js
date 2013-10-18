'use strict';

var jsmeter = require("jsmeter"), 
	grunt = require("grunt");

function JSMeterTask(task) {

	this.origTask = task;
	
	this.options = task.options;

	this.files = task.filesSrc;
};

JSMeterTask.prototype = {
    // Get the party started.
    run: function() {
 		var meter, options, result, i;
 		
 		options = this.options;

 		meter = jsmeter['jsmeter'];
 		
 		if ( ! this.files ) { 
 			console.log("No files to meter");
 			return;
 		}

 		this.files.src.forEach(function(f) {
 			f = grunt.file.expand({}, f);
 			var src = f.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
				  grunt.log.warn('Source file "' + filepath + '" not found.');
				  return false;
				} else {
				  return true;
				}
			}).map(function(filepath) {
				// Read file source.
				return grunt.file.read(filepath);
			});
			
            result = meter.run(src);
			
			//console.log("here " + options.dest);
			if ( ! options.dest || options.dest === 'console' ) { 
				//for (var j = 0; j < result.length; j++) {
 				//	console.log(result[j].name);
 				//}
 				console.log(src);
 			} else {
 			//	grunt.file.write(options.dest + "/" + src + "log", result);
 			}
 		});
    }
};
 
// A static attribute holding our defaults so we can test against them.
JSMeterTask.Defaults = {
    destination: 'console'
};

// Some static task information
JSMeterTask.taskName = "jsmeter";
JSMeterTask.taskDescription = "Grunt plugin to run jsmeter to get metrics out of the code quality";
 
// A static helper method for registering with Grunt
JSMeterTask.registerWithGrunt = function(grunt) {
 
    grunt.registerMultiTask(JSMeterTask.taskName, JSMeterTask.taskDescription, function() {
		var task, currentTask;
		
		currentTask = this;
		
        task = new JSMeterTask(currentTask);
 
        task.run();
    });
};
 
module.exports = JSMeterTask;