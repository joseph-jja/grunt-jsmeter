var BaseRender = require("./BaseRender");
var grunt = require("grunt");

function LogRender() {

    this.ext = ".log";
}

LogRender.prototype = new BaseRender();

LogRender.prototype.setFilename = function(filename) {
    this.logfile = filename;
};

// get set file extension
LogRender.prototype.getFileExtension = function() {
    return this.ext;
};

LogRender.prototype.writeline = function(name, value) {
    var leadingSpace = "";

    if (name !== "name") {
        leadingSpace = " ";
    }

    return leadingSpace + name + ": " + value + "\n";

};

LogRender.prototype.writeResults = function(jsmeterResult) {

    grunt.file.write(this.logfile, this.processResults(jsmeterResult));
};

module.exports = LogRender;
