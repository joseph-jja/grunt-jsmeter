var grunt = require("grunt");

function JSMeterTask(task, options, sources, dest, engine) {

    this.task = task; 
    this.options = options; 
    this.sources = sources;
    
    this.Defaults = {
        dest: 'log',
        engine: 'console'
    };

    this.dest = ( ! dest ) ? this.Defaults.dest: dest;
    this.engine = ( ! engine ) ? this.Defaults.engine: engine;
}

JSMeterTask.prototype.run = function() {

    var meter, jsmeter = require("jsmeter"), writer, outputfile, dest,
        Render;

    try {
        Render = ( this.engine === 'console' ) ? require("./ConsoleRender") : require("./" + this.engine);
        if ( ! Render ) { 
            Render = require("./ConsoleRender");
        }
    } catch(e) { 
       console.log(e);
       Render = require("./ConsoleRender");
    }
    
    dest = this.dest;
    if ( ! this.sources ) { 
        console.log("No files to meter!");
        return;
    }
    meter = jsmeter['jsmeter'];
    
    writer = new Render();
    this.sources.forEach(function(f) {
        var data, results; 
        
        data = grunt.file.read(f);
        results = meter.run(data);
        if ( dest !== 'console' ) {
            outputfile = dest + "/" + f.substring(f.lastIndexOf("/") + 1) + ".log";
            writer.setFilename(outputfile);
        }
        writer.writeResults(results); 
 
    });
    
};

// Some static task information
JSMeterTask.taskName = "jsmeter";
JSMeterTask.taskDescription = "Grunt plugin to run jsmeter to get metrics out of the code quality";

 
module.exports = JSMeterTask;
