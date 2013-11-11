var JSMeterTask = require("./lib/JSMeterTask");

module.exports = function(grunt) {

    grunt.registerMultiTask(JSMeterTask.taskName, JSMeterTask.taskDescription, function() {
        var meter, sources, destDir, engine, options;
         
        // to get options you MUST do this       
        options = this.options({
            dest: 'log',
            engine: 'console'
        });
                
        sources = this.files.src;
        
        meter = new JSMeterTask(this, options, sources);
        meter.run();
    });
    
};
