var BaseRender = require("./BaseRender");
var grunt = require("grunt");
var page = require("../../templates/page");
var cell = require("../../templates/cell");
var row = require("../../templates/row");

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

HTMLRender.prototype.writeline = function(name, value) {

    var data = cell["templates/cell.tmpl"]({
        'value': value
    });

    return data;
};

HTMLRender.prototype.processResults = function(jsmeterResult) {

    var name, resultData = "",
        metered,
        result, j, len;

    result = jsmeterResult;
    len = result.length;

    for (j = 0; j < len; j += 1) {

        metered = this.renderRow(result, j);
        resultData += row["templates/row.tmpl"]({
            'rowData': metered
        });

    }
    return resultData;
};

HTMLRender.prototype.writeResults = function(jsmeterResult) {
    var result, tableData = this.processResults(jsmeterResult);

    result = page["templates/page.tmpl"]({
        'filename': this.logfile,
        'tableData': tableData
    });

    grunt.file.write(this.logfile, result);
};

module.exports = HTMLRender;
