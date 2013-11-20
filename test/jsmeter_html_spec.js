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

    it("run JSMeterTask and output html", function() {
        var mock, files, task;

        mock = makeMockTask();
        mock.engine = "HTMLRender";
        mock.dest = "tmp/html";
        task = new JSMeterTask(mock, mock, mock.files);

        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    });


});
