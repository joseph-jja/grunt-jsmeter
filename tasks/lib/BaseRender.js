function BaseRender() {
    this.filename = "";
}

BaseRender.prototype.setFilename = function(filename) {
    this.filename = filename;
};

// override for different formatting
BaseRender.prototype.writeline = function(name, value) {

    return name + ": " + value;

};

// override for different processing
BaseRender.prototype.processResults = function(jsmeterResult) {

    var name, resultData = "", result, j, len;
    
    result = jsmeterResult;
    len = result.length;
    
    for (j = 0; j < len; j+=1) {
     
        resultData += this.writeline("line start", result[j].lineStart);
        name = ( result[j].name ) ? result[j].name.replace(/^\[\[[^\]]*\]\]\.?/, "") : result[j].name;
        resultData += this.writeline("name", name);
        resultData += this.writeline("statements", result[j].s);
        resultData += this.writeline("lines     ", result[j].lines);
        resultData += this.writeline("comments  ", result[j].comments);
        resultData += this.writeline("% comments  ", Math.round(result[j].comments / (result[j].lines) * 10000)/100, "%");
        resultData += this.writeline("branches", result[j].b);
        resultData += this.writeline("depth", result[j].branchDepth);
        resultData += this.writeline("complexity", result[j].complexity);
        resultData += this.writeline("Halstead Volume", result[j].halsteadVolume);
        resultData += this.writeline("Halstead Potential", result[j].halsteadPotential);
        resultData += this.writeline("Program Level", result[j].halsteadLevel);
        resultData += this.writeline("MI Volume", result[j].mi);

    }  
    return resultData;        
};

BaseRender.prototype.writeResults = function(jsmeterResult) { 

    console.log(this.processResults(jsmeterResult));

};

module.exports = BaseRender;