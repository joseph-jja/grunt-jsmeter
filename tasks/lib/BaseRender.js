// this class does most of the hard work
// inherit from this class and you can create a custom render engine 
// then you only overwrite the methods that you want to change
function BaseRender() {
    this.filename = "";
    this.ext = "";
    this.template = "";
    this.indexTemplate = "";
    this.dest = "";
    this.rowPrefix = "";
    this.rowSuffix = "";
}

/* setters start */
// set a filename
BaseRender.prototype.setDest = function(dest) {
    this.dest = dest;
};

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
/* setters end */

/* processing start */
// format the name of the function
BaseRender.prototype.formatName = function(name) {
    name = (name) ? name.replace(/^\[\[[^\]]*\]\]\.?/, "") : name;
    return name;
};

// set the formatting of a line
BaseRender.prototype.formatLine = function(name, value) {

    var leadingSpace = "";

    if (name !== "name") {
        leadingSpace = " ";
    }

    return leadingSpace + name + ": " + value + "\n";

};

BaseRender.prototype.renderRow = function(result, j) {

    var name, resultData = "";

    resultData = this.rowPrefix;
    resultData += this.formatLine("line start", result[j].lineStart);
    resultData += this.formatLine("name", this.formatName(result[j].name));
    resultData += this.formatLine("statements", result[j].s);
    resultData += this.formatLine("lines     ", result[j].lines);
    resultData += this.formatLine("comments  ", result[j].comments);
    resultData += this.formatLine("% comments  ", Math.round(result[j].comments / (result[j].lines) * 10000) / 100, "%");
    resultData += this.formatLine("branches", result[j].b);
    resultData += this.formatLine("depth", result[j].blockDepth);
    resultData += this.formatLine("complexity", result[j].complexity);
    resultData += this.formatLine("Halstead Volume", result[j].halsteadVolume);
    resultData += this.formatLine("Halstead Potential", result[j].halsteadPotential);
    resultData += this.formatLine("Program Level", result[j].halsteadLevel);
    resultData += this.formatLine("MI Volume", result[j].mi);
    resultData += this.rowSuffix;

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
/* processing end */

/* output start */
// write the results, override this to write to log file
BaseRender.prototype.writeResults = function(jsmeterResult) {

    console.log(this.processResults(jsmeterResult));

};

BaseRender.prototype.buildIndex = function(fileList) {
    var i;

    for (i = 0; i < fileList.length; i += 1) {

        console.log("Processed:" + fileList[i]);

    }

};
/* output end */

module.exports = BaseRender;
