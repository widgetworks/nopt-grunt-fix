/**
 * Reparse the Grunt command line options flags.
 * 
 * Using the arguments parsing logic from Grunt:
 * https://github.com/gruntjs/grunt/blob/master/lib/grunt/cli.js
 */
module.exports = function(grunt){
	
	// Get the current Grunt CLI instance.
	var nopt = require('nopt'),
		parsedOptions = parseOptions(nopt, grunt.cli.optlist);
	grunt.log.debug('(nopt-grunt-fix) old flags: ', grunt.option.flags());
	
	// Reassign the options.
	resetOptions(grunt, parsedOptions);
	
	grunt.log.debug('(nopt-grunt-fix) new flags: ', grunt.option.flags());
	return grunt;
};


// Normalise the parameters and then parse them.
function parseOptions(nopt, optlist){
	var params = getParams(optlist);
	var parsedOptions = nopt(params.known, params.aliases, process.argv, 2);
	initArrays(optlist, parsedOptions);
	
	return parsedOptions;
}


// Reassign the options on the Grunt instance.
function resetOptions(grunt, parsedOptions){
	for (var i in parsedOptions){
		if (parsedOptions.hasOwnProperty(i) && i != 'argv'){
			grunt.option(i, parsedOptions[i]);
		}
	}
}


// Parse `optlist` into a form that nopt can handle.
function getParams(optlist){
	var aliases = {};
	var known = {};
	
	Object.keys(optlist).forEach(function(key) {
		var short = optlist[key].short;
		if (short) {
			aliases[short] = '--' + key;
		}
		known[key] = optlist[key].type;
	});
	
	return {
		known: known,
		aliases: aliases
	}
}


// Initialize any Array options that weren't initialized.
function initArrays(optlist, parsedOptions){
	Object.keys(optlist).forEach(function(key) {
		if (optlist[key].type === Array && !(key in parsedOptions)) {
			parsedOptions[key] = [];
		}
	});
}
