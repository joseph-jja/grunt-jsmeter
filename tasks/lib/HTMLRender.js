var BaseRender = require("./BaseRender");
var grunt = require("grunt");
var fs = require('fs');
var hbs = require("handlebars");

function HTMLRender() {

    this.ext = ".html";
}

HTMLRender.prototype = new BaseRender();

/* setter overrides start */
HTMLRender.prototype.setTemplate = function(template) {
    this.template = hbs.compile(fs.readFileSync(template, 'utf-8'));
};

HTMLRender.prototype.setIndexTemplate = function(template) {
    this.indexTemplate = hbs.compile(fs.readFileSync(template, 'utf-8'));
};
/* setter overrides end */

// overrides parent so that we can render json instead of a string
HTMLRender.prototype.renderRow = function(result, j) {

    var complexityCSS;

    this.checkComplexity(result[j].complexity);

    complexityCSS = (j % 2 === 0) ? 'odd' : 'even';
    complexityCSS += (result[j].complexity > this.complexity) ? " complex" : "";

    return {
        cssClassName: complexityCSS,
        name: this.formatName(result[j].name),
        lineStart: result[j].lineStart,
        statements: result[j].s,
        lines: result[j].lines,
        comments: result[j].comments,
        commentsPercent: this.formatCommentPercent(result[j].comments, result[j].lines),
        branches: result[j].b,
        depth: result[j].blockDepth,
        complexity: result[j].complexity,
        halsteadVolume: result[j].halsteadVolume,
        halsteadPotential: result[j].halsteadPotential,
        progLevel: result[j].halsteadLevel,
        miVolume: result[j].mi
    };
};

HTMLRender.prototype.processResults = function(jsmeterResult) {

    var resultData = [],
        j, len;

    len = jsmeterResult.length;

    for (j = 0; j < len; j += 1) {
        resultData.push(this.renderRow(jsmeterResult, j));
    }
    return resultData;
};

HTMLRender.prototype.writeResults = function(jsmeterResult) {
    var result, tableData = this.processResults(jsmeterResult);

    result = this.template({
        'filename': this.filename.replace(this.dest + "/", ""),
        'data': tableData
    });
    grunt.file.write(this.dest + "/" + this.filename.substring(this.filename.lastIndexOf("/") + 1), result);
};

HTMLRender.prototype.buildIndex = function(fileList) {
    var result, files = [],
        i, fname, complex = "";

    for (i in fileList) {
        fname = i;
        complex = "";
        if (fileList[i] === true) {
            complex = " has a higher complexity level than " + this.complexity + ".";
        }
        files.push({
            'filename': fname.substring(fname.lastIndexOf("/") + 1) + ".html",
            'complexity': complex
        });
    }
    files = files.sort(function(a, b) {
        if (a.filename > b.filename) {
            return 1;
        } else if (a.filename < b.filename) {
            return -1;
        }
        return 0;
    });
    result = this.indexTemplate({
        'filelist': files
    });
    grunt.file.write(this.dest + "/index.html", result);
};

module.exports = HTMLRender;
