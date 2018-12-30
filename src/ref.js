/* Hypermedia References */

import _ from 'lodash';
import path from 'path';

/** Check if connection is HTTPS
 * @param req {object}
 * @return {boolean}
 */
function is_https (req) {
	if (req && req.headers && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'https') {
		return true;
	}
	return !!(req && req.connection && req.connection.encrypted);
}

/** Get protocol part of the url
 * @param req
 * @return {string}
 */
function get_proto (req) {
	return is_https(req) ? 'https' : 'http';
}

/** Get hostname part of the url
 * @param req {Object}
 * @return {string|undefined}
 */
function get_host (req) {
	return req && req.headers ? req.headers.host : undefined;
}

/**
 *
 * @FIXME: Escape args
 * @param a
 * @returns {string}
 */
function format_arg (a) {
	return ''+a;
}

/** Build a reference function with a default base path.
 *
 * @param base_path {string}
 * @param args1 {Array.<*>>}
 * @return {function(object, ...[*]=): string}
 */
function refFactory (base_path, ...args1) {
	if (!_.isString(base_path)) throw new TypeError("base_path was not a string: " + base_path);
	const args2 = _.concat(['/', base_path], args1);
	return (req, ...args3 ) => {
		if (!(req && _.isObject(req))) throw new TypeError("request was not an object: " + request);
		const args4 = _.concat([], args2, args3).map(format_arg);
		return `${get_proto(req)}://${get_host(req)}${path.resolve(...args4)}`;
	};
}

/**
 * Reference function which takes Request object as first argument and optional suffix paths.
 *
 * @type {function(Object, ...[string]=): string}
 */
let ref = refFactory('/');
ref.withPath = refFactory;

export default ref;

/* EOF */
