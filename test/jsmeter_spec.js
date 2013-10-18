var grunt = require("grunt"),
    _ = grunt.util._;

var JSMeterTask = require("../lib/JSMeterTask");

describe("JSMeterTask test", function() {

    var makeMockTask = function(done) {
        return {
            _taskOptions: { dest: "console" },
            filesSrc: {
                src: [ "package.json", "Gruntfile.js", "tasks/**/*.js", "test/**/*.js" ]
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
        var task = new JSMeterTask(makeMockTask()),
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
        var mockTask, task; 
        
        mockTask = makeMockTask();
        //mockTask['dest'] = "log/jsmeter";
        task = new JSMeterTask(mockTask);
         
        spyOn(task, 'run').andCallThrough();
        task.run();
        expect(task.run).toHaveBeenCalled();
    
    });


});