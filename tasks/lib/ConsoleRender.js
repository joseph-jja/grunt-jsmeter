var BaseRender = require("./BaseRender");

// ultimately this is the same as the base render but it gives it a pretty name
// the base renderer is the console render
function ConsoleRender() {}

ConsoleRender.prototype = new BaseRender();

module.exports = ConsoleRender;
