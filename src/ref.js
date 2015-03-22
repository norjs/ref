/* Hypermedia References */

"use strict";

var path = require('path');
var ARRAY = require('nor-array');
var FUNCTION = require('nor-function');

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
function ref(base_path) {
	var args2 = ['/'].concat(Array.prototype.slice.call(arguments));
	return function _ref() {
		var args = Array.prototype.slice.call(arguments);
		var req = args.shift();
		args = args2.concat(args);
		return get_proto(req) + ':/'+'/' + get_host(req) + FUNCTION(path.resolve).apply(path.resolve, ARRAY([base_path]).concat(args).map(format_arg).valueOf() );
	};
};

// Exports
var _root_ref = module.exports = ref('/');
_root_ref.withPath = ref;

/* EOF */
