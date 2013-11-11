# grunt-jsmeter

> Grunt plugin to run jsmeter to get metrics out of the code quality

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsmeter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsmeter');
```

## The "jsmeter" task

### Overview
In your project's Gruntfile, add a section named `jsmeter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jsmeter: {
    data: {
      // Task-specific options go here.
    },
  },
})
```

### Options / data

#### data.src
Type: `Array`
Default value: `'log'`

An array of files.

#### data.dest
Type: `String`
Default value: `'log'`

A string value that is used to identify the location output.  
The default is log, but if the console render is used then this does nothing.

#### data.engine
Type: `String`
Default value: `'console'`

A string value that is used to identify the engine to render the output.  
The default is console.  Alternative renders available are LogRender.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. 
So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  jsmeter: {
    data: {
      src: {
        ['src/testing', 'src/123'],
      }
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  jsmeter: {
    data: {
      dest: 'logs',
      engine: 'LogRender',
      src: {
        ['src/testing', 'src/123'],
      }
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. 
This project uses jshint and jasmine node tests.
Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
