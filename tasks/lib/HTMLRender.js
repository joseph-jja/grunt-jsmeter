var BaseRender = require("./BaseRender");
var grunt = require("grunt");
var fs = require('fs');
var hbs = require("handlebars");

function HTMLRender() {

    this.ext = ".html";
}

HTMLRender.prototype = new BaseRender();

HTMLRender.prototype.setFilename = function(filename) {
    this.logfile = filename;
};

// get set file extension
HTMLRender.prototype.getFileExtension = function() {
    return this.ext;
};

HTMLRender.prototype.renderRow = function(result, j) {

    var name = (result[j].name) ? result[j].name.replace(/^\[\[[^\]]*\]\]\.?/, "") : result[j].name;

    return {
        name: name,
        lineStart: result[j].lineStart,
        statements: result[j].s,
        lines: result[j].lines,
        comments: result[j].comments,
        commentsPercent: (Math.round(result[j].comments / (result[j].lines) * 10000) / 100) + "%",
        branches: result[j].b,
        depth: result[j].branchDepth,
        complexity: result[j].complexity,
        halsteadVolume: result[j].halsteadVolume,
        halsteadPotential: result[j].halsteadPotential,
        progLevel: result[j].halsteadLevel,
        miVolume: result[j].mi
    };
};

HTMLRender.prototype.processResults = function(jsmeterResult) {

    var resultData = [],
        result, j, len;

    result = jsmeterResult;
    len = result.length;

    for (j = 0; j < len; j += 1) {
        resultData.push(this.renderRow(result, j));
    }
    return resultData;
};

HTMLRender.prototype.setTemplate = function(template) {
    this.template = hbs.compile(fs.readFileSync(template, 'utf-8'));
};

HTMLRender.prototype.setIndexTemplate = function(template) {
    this.indexTemplate = hbs.compile(fs.readFileSync(template, 'utf-8'));
};

HTMLRender.prototype.writeResults = function(jsmeterResult) {
    var result, tableData = this.processResults(jsmeterResult);

    result = this.template({
        'filename': this.logfile,
        'data': tableData
    });
    grunt.file.write(this.logfile, result);
};

HTMLRender.prototype.buildIndex = function(dest, fileList) {
    var result, files = [],
        i, fname;

    for (i = 0; i < fileList.length; i += 1) {
        fname = fileList[i];
        files.push(fname.substring(fname.lastIndexOf("/") + 1) + ".html");
    }
    result = this.indexTemplate({
        'filelist': files
    });
    grunt.file.write(dest + "/index.html", result);
};

module.exports = HTMLRender;
