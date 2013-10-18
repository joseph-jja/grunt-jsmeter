var JSMeterTask = require("../lib/JSMeterTask");
 
module.exports = function(grunt) {

	grunt.registerMultiTask('jsmeter', 'Run jsmeter', function() {
    	var data, meter = require("jsmeter"), 
    		name, sources, slen, i, result, 
    		destDir, outputfile, resultData;
                
        meter = meter['jsmeter'];

        sources = this.data.src;
        destDir = this.data.dest;
        slen = sources.length;
        for ( i =0; i < slen; i+= 1 ) {  
            data = grunt.file.read(sources[i]);
            outputfile = destDir + "/" + sources[i].substring(sources[i].lastIndexOf("/") + 1) + ".log";
             
            result = meter.run(data);
            
            resultData = "";
            for (var j = 0; j < result.length; j++) {
             
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
			grunt.file.write(outputfile, resultData); 
        }
    });
    
};