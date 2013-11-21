// this class does most of the hard work
// inherit from this class and you can create a custom render engine 
// then you only overwrite the methods that you want to change
function BaseRender() {
    this.filename = "";
    this.ext = "";
    this.template = "";
    this.indexTemplate = "";
}

// set a filename
BaseRender.prototype.setFilename = function(filename) {
    this.filename = filename;
};

BaseRender.prototype.setTemplate = function(template) {
    this.template = template;
};

BaseRender.prototype.setIndexTemplate = function(template) {
    this.indexTemplate = template;
};

// get set file extension
BaseRender.prototype.getFileExtension = function() {
    return this.ext;
};

// set the formatting of a line
BaseRender.prototype.writeline = function(name, value) {

    return name + ": " + value;

};

BaseRender.prototype.renderRow = function(result, j) {

    var name, resultData = "";

    resultData += this.writeline("line start", result[j].lineStart);
    name = (result[j].name) ? result[j].name.replace(/^\[\[[^\]]*\]\]\.?/, "") : result[j].name;
    resultData += this.writeline("name", name);
    resultData += this.writeline("statements", result[j].s);
    resultData += this.writeline("lines     ", result[j].lines);
    resultData += this.writeline("comments  ", result[j].comments);
    resultData += this.writeline("% comments  ", Math.round(result[j].comments / (result[j].lines) * 10000) / 100, "%");
    resultData += this.writeline("branches", result[j].b);
    resultData += this.writeline("depth", result[j].blockDepth);
    resultData += this.writeline("complexity", result[j].complexity);
    resultData += this.writeline("Halstead Volume", result[j].halsteadVolume);
    resultData += this.writeline("Halstead Potential", result[j].halsteadPotential);
    resultData += this.writeline("Program Level", result[j].halsteadLevel);
    resultData += this.writeline("MI Volume", result[j].mi);

    return resultData;
};

// setup the way the results will be processed
BaseRender.prototype.processResults = function(jsmeterResult) {

    var name, resultData = "",
        result, j, len;

    result = jsmeterResult;
    len = result.length;

    for (j = 0; j < len; j += 1) {

        resultData += this.renderRow(result, j);

    }
    return resultData;
};

// write the results, override this to write to log file
BaseRender.prototype.writeResults = function(jsmeterResult) {

    console.log(this.processResults(jsmeterResult));

};

BaseRender.prototype.buildIndex = function(dest, fileList) {
    var i;

    for (i = 0; i < fileList.length; i += 1) {

        console.log("Processed:" + fileList[i]);

    }

};

module.exports = BaseRender;
