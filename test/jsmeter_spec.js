var grunt = require("grunt"),
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
		
        JSMeterTask.registerWithGrunt(grunt);
 
        // Check that it registered
        expect(grunt.task._tasks[JSMeterTask.taskName]).toNotEqual(undefined);
        expect(grunt.task._tasks[JSMeterTask.taskName].info).toEqual(JSMeterTask.taskDescription);
    });
 
    it("loads options from a task", function() {
        var task = new JSMeterTask(makeMockTask()),
            actual = task.options;
 
        expect(actual).toNotEqual(undefined);
 
        expect(actual.dest).toEqual(JSMeterTask.Defaults.dest);
    });

});