var grunt = require("grunt");

// this is the main starting point of the tasks
function JSMeterTask(task, options, sources) {
    this.task = task;
    this.options = options || {};
    this.sources = sources;

    this.Defaults = {
        dest: 'log',
        engine: 'console',
        template: __dirname + '/../../templates/page.hbs',
        indexTemplate: __dirname + '/../../templates/index.hbs',
        complexityLevel: 10
    };

    this.dest = (!options.dest) ? this.Defaults.dest : options.dest;
    this.engine = (!options.engine) ? this.Defaults.engine : options.engine;
    this.template = (!options.template) ? this.Defaults.template : options.template;
    this.indexTemplate = (!options.indexTemplate) ? this.Defaults.indexTemplate : options.indexTemplate;
    this.complexityLevel = (!options.complexityLevel) ? this.Defaults.complexityLevel : options.complexityLevel;
}

// this processes the list of source files 
JSMeterTask.prototype.processFiles = function(f, meter, writer, allFiles) {
    var i, len, filename, data, results,
        outputfile, dest;

    dest = this.dest;
    len = f.src.length;

    for (i = 0; i < len; i += 1) {
        filename = f.src[i];
        data = grunt.file.read(filename);
        data = data.trim();
        if (data && data !== null && data.length > 0) {
            // jsmeter sometimes has an exception and returns undefined
            // not much we can do about it
            results = meter.run(data, filename);
            if (results && results !== null && results.length > 0) {
                if (this.engine !== 'console') {
                    outputfile = dest + "/" + filename + writer.getFileExtension();
                    writer.setFilename(outputfile);
                }
                writer.writeResults(results);
                allFiles[filename] = writer.isComplex;
            }
        }
    }
    return allFiles;
};

// main method to run
JSMeterTask.prototype.run = function() {

    var meter, jsmeter = require("../../jsmeter/jsmeter"),
        writer, dest,
        Render, allFiles = {},
        self;

    try {
        Render = (this.engine === 'console') ? require("./ConsoleRender") : require("./" + this.engine);
        if (!Render) {
            Render = require("./ConsoleRender");
        }
    } catch (e) {
        console.log(e);
        Render = require("./ConsoleRender");
    }

    dest = this.dest;
    if (!this.sources) {
        console.log("No files to meter!");
        return;
    }
    meter = jsmeter['jsmeter'];

    writer = new Render();
    writer.setTemplate(this.template);
    writer.setIndexTemplate(this.indexTemplate);
    writer.setDest(dest);
    writer.complexityLevel = this.complexityLevel;

    self = this;
    this.sources.forEach(function(f) {

        self.processFiles(f, meter, writer, allFiles);

    });
    // build an index
    writer.buildIndex(allFiles);
};

// Some static task information
JSMeterTask.taskName = "jsmeter";
JSMeterTask.taskDescription = "Grunt plugin to run jsmeter to get metrics out of the code quality";


module.exports = JSMeterTask;
