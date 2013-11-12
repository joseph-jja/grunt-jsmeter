var JSMeterTask = require("./lib/JSMeterTask");

module.exports = function(grunt) {

    grunt.registerMultiTask(JSMeterTask.taskName, JSMeterTask.taskDescription, function() {
        var meter, sources, destDir, engine, options;

        // to get options you MUST do this       
        options = this.options({
            dest: 'log',
            engine: 'console'
        });

        // get the source files this is an object of files
        sources = this.files;

        meter = new JSMeterTask(this, options, sources);
        meter.run();
    });

};
