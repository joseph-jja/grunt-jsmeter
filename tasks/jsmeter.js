var JSMeterTask = require("./lib/JSMeterTask");

module.exports = function(grunt) {

    grunt.registerMultiTask(JSMeterTask.taskName, JSMeterTask.taskDescription, function() {
        var meter, sources, destDir, engine;
                
        sources = this.data.src;
        destDir = this.data.dest;
        engine = this.data.engine;
        
        meter = new JSMeterTask(this, this.options, sources, destDir, engine);
        meter.run();
    });
    
};
