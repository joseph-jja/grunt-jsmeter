var JSMeterTask = require("./lib/JSMeterTask");

module.exports = function(grunt) {

	grunt.registerMultiTask(JSMeterTask.taskName, JSMeterTask.taskDescription, function() {
    	var meter, sources, destDir;
                
        sources = this.data.src;
        destDir = this.data.dest;
        
        meter = new JSMeterTask(this, this.options, sources, destDir);
        meter.run();
    });
    
};