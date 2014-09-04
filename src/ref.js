/* Hypermedia References */

"use strict";

var path = require('path');
var ARRAY = require('nor-array');

/** Check if connection is HTTPS */
function is_https(req) {
	if(req.headers && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'https') { return true; }
	return (req && req.connection && req.connection.encrypted) ? true : false;
}

/** Get protocol part of the url */
function get_proto(req) {
	return is_https(req) ? 'https' : 'http';
}

/** Get hostname part of the url */
function get_host(req) {
	return req.headers && req.headers.host;
}

// FIXME: Escape args
function format_arg(a) {
	return ''+a;
}

/** Get ref */
function ref() {
	var args = Array.prototype.slice.call(arguments);
	var req = args.shift();
	return get_proto(req) + ':/'+'/' + get_host(req) + path.resolve.apply(path.resolve, ARRAY(['/']).concat(args).map(format_arg).valueOf() );
}

// Exports
module.exports = ref;

/* EOF */
