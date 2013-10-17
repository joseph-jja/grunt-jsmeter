var grunt = require("grunt"),
    should = require("should"),
    _ = grunt.util._;

var JSMeterTask = require("../lib/JSMeterTask");

describe("JSMeterTask test", function() {

	var makeMockTask = function(done) {
        return {
            _taskOptions: { dest: "console" },
            filesSrc: grunt.file.expand("test/res/good*.js"),
            options: function(defs) { return _.defaults(this._taskOptions, defs); },
            async: function() {
                return done;
            }
        };
    };
    
    it("registers itself with grunt", function() {
		should.exist(JSMeterTask.registerWithGrunt);
 
        JSMeterTask.registerWithGrunt(grunt);
 
        // Check that it registered
        should.exist(grunt.task._tasks[JSMeterTask.taskName]);
        grunt.task._tasks[JSMeterTask.taskName].info.should.equal(JSMeterTask.taskDescription);
    });
 
    it("loads options from a task", function() {
        var task = new JSMeterTask(makeMockTask()),
            actual = task.options;
 
        should.exist(actual);
 
        actual.something.should.equal(JSMeterTask.Defaults.something);
    });

});