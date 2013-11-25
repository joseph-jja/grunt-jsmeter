// this class does most of the hard work
// inherit from this class and you can create a custom render engine 
// then you only overwrite the methods that you want to change
function BaseRender() {
    this.filename = "";
    this.ext = "";
    this.template = "";
    this.indexTemplate = "";
    this.dest = "";
    this.complexityLevel = 10;
    this.isComplex = false;
}

/* setters start */
// set a filename
BaseRender.prototype.setDest = function(dest) {
    this.dest = dest;
};

// set a filename
BaseRender.prototype.setFilename = function(filename) {
    this.filename = filename;
    this.isComplex = false;
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

BaseRender.prototype.formatCommentPercent = function(comments, lines) {
    var pct = 0;
    if (lines !== 0) {
        pct = Math.round(comments / (lines) * 10000) / 100 + "%";
    }
    return pct;
};

BaseRender.prototype.checkComplexity = function(complexity) {

    if (complexity > this.complexityLevel) {
        this.isComplex = true;
    }
};

BaseRender.prototype.renderRow = function(result, j) {

    var name, resultData = "";

    resultData += "name: " + this.formatName(result[j].name) + "\n";
    resultData += " line start: " + result[j].lineStart + "\n";
    resultData += " statements: " + result[j].s + "\n";
    resultData += " lines: " + result[j].lines + "\n";
    resultData += " comments: " + result[j].comments + "\n";
    resultData += " % comments: " + this.formatCommentPercent(result[j].comments, result[j].lines) + "\n";
    resultData += " branches: " + result[j].b + "\n";
    resultData += " depth: " + result[j].blockDepth + "\n";
    resultData += " complexity: " + result[j].complexity + "\n";
    resultData += " Halstead Volume: " + result[j].halsteadVolume + "\n";
    resultData += " Halstead Potential: " + result[j].halsteadPotential + "\n";
    resultData += " Program Level: " + result[j].halsteadLevel + "\n";
    resultData += " MI Volume: " + result[j].mi + "\n";

    this.checkComplexity(result[j].complexity);

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

    for (i in fileList) {

        console.log("Processed:" + i);

    }

};
/* output end */

module.exports = BaseRender;
