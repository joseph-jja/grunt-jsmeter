var grunt = require("grunt");

function JSMeterTask(task, options, sources) {
    this.task = task;
    this.options = options || {};
    this.sources = sources;

    this.Defaults = {
        dest: 'log',
        engine: 'console',
        template: __dirname + '/../../templates/page.hbs',
        indexTemplate: __dirname + '/../../templates/index.hbs',
    };

    this.dest = (!options.dest) ? this.Defaults.dest : options.dest;
    this.engine = (!options.engine) ? this.Defaults.engine : options.engine;
    this.template = (!options.template) ? this.Defaults.template : options.template;
    this.indexTemplate = (!options.indexTemplate) ? this.Defaults.indexTemplate : options.indexTemplate;
}

JSMeterTask.prototype.run = function() {

    var meter, jsmeter = require("jsmeter"),
        writer, outputfile, dest,
        Render, template, allFiles = [];

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
    template = this.template;
    if (!this.sources) {
        console.log("No files to meter!");
        return;
    }
    meter = jsmeter['jsmeter'];

    writer = new Render();
    writer.setTemplate(this.template);
    writer.setIndexTemplate(this.indexTemplate);

    this.sources.forEach(function(f) {
        var data, results, len, filename, i;

        len = f.src.length;

        for (i = 0; i < len; i += 1) {
            filename = f.src[i];
            allFiles.push(filename);
            data = grunt.file.read(filename);
            // hmm this line sometimes has an exception and returns undefines?
            results = meter.run(data, filename);
            if (this.engine !== 'console') {
                outputfile = dest + "/" + filename.substring(filename.lastIndexOf("/") + 1) + writer.getFileExtension();
                writer.setFilename(outputfile);
            }
            writer.writeResults(results);
        }

    });
    // build an index
    writer.buildIndex(allFiles);
};

// Some static task information
JSMeterTask.taskName = "jsmeter";
JSMeterTask.taskDescription = "Grunt plugin to run jsmeter to get metrics out of the code quality";


module.exports = JSMeterTask;
