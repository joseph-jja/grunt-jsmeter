var BaseRender = require("./BaseRender");
var grunt = require("grunt");

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
    var leadingSpace = "";

    if (name !== "name") {
        leadingSpace = " ";
    }

    return leadingSpace + name + ": " + value;

};

HTMLRender.prototype.writeResults = function(jsmeterResult) {

    grunt.file.write(this.logfile, this.processResults(jsmeterResult));
};

module.exports = HTMLRender;
