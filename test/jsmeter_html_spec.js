var grunt = require("grunt"),
    _ = grunt.util._;

describe("JSMeterTask test", function() {

    var JSMeterTask = require("../tasks/lib/JSMeterTask");

    var jsmeter = require("../tasks/jsmeter");

    var makeMockTask = function(done) {
        return {
            _taskOptions: {
                engine: "HTMLRender"
            },
            files: [{
                src: grunt.file.expand({}, "tasks/**/*.js")
            }],
            engine: 'HTMLRender',
            options: function(defs) {
                return _.defaults(this._taskOptions, defs);
            },
            async: function() {
                return done;
            }
        };
    };

    var makeMockTask2 = function(done) {
        return {
            _taskOptions: {
                engine: "HTMLRender",
                complexityLevel: 1
            },
            files: [{
                src: grunt.file.expand({}, "tasks/**/*.js")
            }],
            engine: 'HTMLRender',
            complexityLevel: 1,
            options: function(defs) {
                return _.defaults(this._taskOptions, defs);
            },
            async: function() {
                return done;
            }
        };
    };

    it("run JSMeterTask and output html", function() {
        var mock, files, task;

        mock = makeMockTask();
        mock.dest = "tmp/html";
        task = new JSMeterTask(mock, mock, mock.files);

        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    });

    it("run JSMeterTask with a complexity of 1 and output html", function() {
        var mock, files, task;

        mock = makeMockTask2();
        mock.dest = "tmp/html";
        task = new JSMeterTask(mock, mock, mock.files);

        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    });


});
