var grunt = require("grunt"),
    _ = grunt.util._;

var JSMeterTask = require("../tasks/lib/JSMeterTask");

describe("JSMeterTask test", function() {

    var makeMockTask = function(done) {
        return {
            _taskOptions: { dest: "console" },
            filesSrc: {
                src: [ "tasks/**/*.js", "lib/**/*.js" ]
            },
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
        var mock, task, files, actual;
        
        mock = makeMockTask();
        files = mock.filesSrc;
        task = new JSMeterTask(mock, mock, files);
        actual = task.options;
 
        expect(actual).toNotEqual(undefined);
 
        expect(actual.dest).toEqual(JSMeterTask.Defaults.dest);
    });

    it("run JSMeterTask", function() {
        var task = new JSMeterTask(makeMockTask());
        
        //grunt.config.set(makeMockTask());
        
        spyOn(task, 'run').andCallThrough();
        //JSMeterTask.registerWithGrunt(grunt);
        task.run();
        expect(task.run).toHaveBeenCalled();
    
    });

    it("run JSMeterTask and output to file", function() {
        var mock, files, task; 
        
        mock = makeMockTask();
        files = mock.filesSrc;
        task = new JSMeterTask(mock, mock, files.src);
         
        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    
    });


});