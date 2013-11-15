var BaseRender = require("./BaseRender");
var grunt = require("grunt");
var page = require("../../templates/page");
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

    var data = row["templates/row.tmpl"]({
        'name': name,
        'value': value
    });

    return data;
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
