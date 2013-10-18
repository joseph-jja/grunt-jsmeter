
function ConsoleRender() {}

ConsoleRender.prototype.setFilename = function(filename) {};

ConsoleRender.prototype.writeResults = function(jsmeterResult) {

    var name, resultData = "", result, j, len;
    
    result = jsmeterResult;
    len = result.length;
    
    for (j = 0; j < len; j+=1) {
     
        resultData += " line start: " + result[j].lineStart + "\n";
        name = ( result[j].name ) ? result[j].name.replace(/^\[\[[^\]]*\]\]\.?/, "") : result[j].name;
        resultData += "name: " + name + "\n";
        resultData += " statements: " + result[j].s + "\n";
        resultData += " lines:      " + result[j].lines + "\n";
        resultData += " comments:   " + result[j].comments + "\n";
        resultData += " % comments:   " + Math.round(result[j].comments / (result[j].lines) * 10000)/100 + "%" + "\n";
        resultData += " branches: " + result[j].b + "\n";
        resultData += " depth: " + result[j].branchDepth + "\n";
        resultData += " complexity: " + result[j].complexity + "\n";
        resultData += " Halstead Volume: " + result[j].halsteadVolume + "\n";
        resultData += " Halstead Potential: " + result[j].halsteadPotential + "\n";
        resultData += " Program Level: " + result[j].halsteadLevel + "\n";
        resultData += " MI Volume: " + result[j].mi + "\n";

    }  
    console.log(resultData);        
};

module.exports = ConsoleRender;
