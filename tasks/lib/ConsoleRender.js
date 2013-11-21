var BaseRender = require("./BaseRender");

function ConsoleRender() {}

ConsoleRender.prototype = new BaseRender();

ConsoleRender.prototype.setFilename = function(filename) {};

module.exports = ConsoleRender;
