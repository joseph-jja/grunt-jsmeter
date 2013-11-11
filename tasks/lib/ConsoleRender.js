var BaseRender = require("./BaseRender");

function ConsoleRender() {}

ConsoleRender.prototype = new BaseRender();

ConsoleRender.prototype.setFilename = function(filename) {};

ConsoleRender.prototype.writeline = function(name, value) {
	var leadingSpace = "";
	
	if ( name !== "name" ) { 
		leadingSpace = " ";
	}

	return leadingSpace + name + ": " + value + "\n";

};

module.exports = ConsoleRender;
