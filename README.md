# nopt-grunt-fix

> Fix arguments parsing for Grunt ~0.4.x


# Overview

Grunt has a [longstanding issue](https://github.com/gruntjs/grunt/issues/908) ([well](https://github.com/gruntjs/grunt/issues/603), [more](https://github.com/gruntjs/grunt/issues/920) [than](https://github.com/gruntjs/grunt/issues/1005) [one](https://github.com/gruntjs/grunt/issues/1145) [issue](https://github.com/gruntjs/grunt/issues/1282)) to update to a newer version of [`nopt`](https://github.com/npm/nopt) and fix the options parsing. But since it's a breaking change it's not going to be implemented until Grunt 0.5.0...

Well, you don't have to wait, the future is now!

Add this module to your Gruntfile and it will make Grunt options work just as you'd expect.


# Installation

```bash
$ npm install --save nopt-grunt-fix
```

## Usage

At the top of your `Gruntfile.js`:

```javascript
module.exports = function(grunt){

	require('nopt-grunt-fix')(grunt);
	
	//...
}
```

That's it!


# Behaviour

Without `nopt-grunt-fix`, running:

```bash
$ grunt task1 --no-build --once --no-watch -r=1.10
```

will give you:

```javascript	
	grunt.option('no-build') === true  ✓
	grunt.option('once') === '--no-watch'  ✗
	grunt.option('r') === 1.1  ✗
	grunt.option('no-watch') === false  ✗
	grunt.option('watch') === undefined  ✗
```

	
__With__ `nopt-grunt-fix`, running:

```bash	
$ grunt task1 --no-build --once --no-watch -r=1.10
```

will give you:

```javascript
grunt.option('no-build') === true  ✓
grunt.option('once') === true  ✓
grunt.option('r') === '1.10'  ✓
grunt.option('no-watch') === true  ✓
grunt.option('watch') === false  ✓
```


# Debugging

If you run Grunt with the `--debug` flag then we'll log out the old and new flags:

```
[D] (nopt-grunt-fix) old flags:  [ '--no-build', '--once=--no-watch', '--r=1.1', '--debug=1' ]
[D] (nopt-grunt-fix) new flags:  [ '--no-build', '--once', '--r=1.10', '--debug=1', '--no-watch' ]
```

