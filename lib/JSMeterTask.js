'use strict';

var jsmeter = require("jsmeter");

function JSMeterTask(task) {

	this.origTask = task;
	
	this.options = task.options;

};

JSMeterTask.prototype = {
    // Get the party started.
    run: function() {
 		var meter;
 		
 		meter = meter['jsmeter'];
 		
 		this.files.forEach(function(f) {
 		
 			var src = f.src.filter(function(filepath) {
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
			
 			console.log(src);
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
        var task = new JSMeterTask(this);
 
        task.run();
    });
};
 
module.exports = JSMeterTask;