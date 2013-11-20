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

BaseRender.prototype.renderRow = function(result, j) {

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

HTMLRender.prototype.writeResults = function(jsmeterResult, template) {
    var result, tableData = this.processResults(jsmeterResult)
    var template = hbs.compile(fs.readFileSync(template, 'utf-8'));

    result = template({
        'filename': this.logfile,
        'data': tableData
    });
    grunt.file.write(this.logfile, result);
};

module.exports = HTMLRender;
