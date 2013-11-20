var grunt = require("grunt"),
    _ = grunt.util._;

describe("JSMeterTask test", function() {

    var JSMeterTask = require("../tasks/lib/JSMeterTask");

    var jsmeter = require("../tasks/jsmeter");

    var makeMockTask = function(done) {
        return {
            _taskOptions: {
                engine: "console"
            },
            files: [{
                src: grunt.file.expand({}, "tasks/**/*.js")
            }],
            engine: 'console',
            options: function(defs) {
                return _.defaults(this._taskOptions, defs);
            },
            async: function() {
                return done;
            }
        };
    };

    it("test node require includes", function() {

        expect(jsmeter).toNotEqual(undefined);
        expect(JSMeterTask).toNotEqual(undefined);

    });

    it("registers itself with grunt", function() {

        jsmeter(grunt);

        // Check that it registered
        expect(grunt.task._tasks[JSMeterTask.taskName]).toNotEqual(undefined);
        expect(grunt.task._tasks[JSMeterTask.taskName].info).toEqual(JSMeterTask.taskDescription);
    });

    it("loads options from a task", function() {
        var mock, task, files, actual;

        mock = makeMockTask();
        task = new JSMeterTask(mock, mock, mock.files);
        actual = task.options;

        expect(actual).toNotEqual(undefined);
        expect(actual.engine).toEqual(task.Defaults.engine);
    });

    it("run JSMeterTask ", function() {
        var mock, files, task;

        mock = makeMockTask();
        console.log(mock.files);
        task = new JSMeterTask(mock, mock, mock.files);

        spyOn(task, 'run').andCallThrough();
        spyOn(task, 'processFiles').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
        expect(task.processFiles).toHaveBeenCalled();

    });
});
