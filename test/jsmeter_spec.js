var grunt = require("grunt"),
    _ = grunt.util._;

describe("JSMeterTask test", function() {

    var JSMeterTask = require("../tasks/lib/JSMeterTask");

    var jsmeter = require("../tasks/jsmeter");

    var makeMockTask = function(done) {
        return {
            _taskOptions: { dest: "console" },
            filesSrc: {
                src: [ "tasks/**/*.js", "tasks/lib/**/*.js" ]
            },
            dest: 'console',
            options: function(defs) { return _.defaults(this._taskOptions, defs); },
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
        
        var meter = jsmeter(grunt);
 
        // Check that it registered
        expect(grunt.task._tasks[JSMeterTask.taskName]).toNotEqual(undefined);
        expect(grunt.task._tasks[JSMeterTask.taskName].info).toEqual(JSMeterTask.taskDescription);
    });
 
    it("loads options from a task", function() {
        var mock, task, files, actual;
        
        mock = makeMockTask();
        files = grunt.file.expand({}, mock.filesSrc.src);
        task = new JSMeterTask(mock, mock, files);
        actual = task.options;
        expect(actual).toNotEqual(undefined);
 
        expect(actual.dest).toEqual(task.Defaults.dest);
    });

    it("run JSMeterTask ", function() {
        var mock, files, task; 
        
        mock = makeMockTask();
        files = grunt.file.expand({}, mock.filesSrc.src);
        task = new JSMeterTask(mock, mock, files);
         
        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    
    });


});