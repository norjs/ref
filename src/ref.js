/* Hypermedia References */

import _ from 'lodash';
import path from 'path';

/** Check if connection is HTTPS
 * @param req
 * @return {boolean}
 */
function is_https (req) {
	if (req.headers && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'https') {
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
 * @param req
 * @return {*}
 */
function get_host (req) {
	return req.headers ? req.headers.host : undefined;
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

/** Get ref
 *
 * @param args
 * @return {function(...[*]=): string}
 */
function ref (...args) {
	const base_path = _.first(args);
	const args2 = _.concat(['/'], args);
	return ( ...args ) => {
		const req = args.shift();
		args = _.concat(args2, args);
		const args3 = _.concat([base_path], args).map(format_arg);
		return `${get_proto(req)}://${get_host(req)}${path.resolve(...args3)}`;
	};
}

// Exports
let rootRef = ref('/');
rootRef.withPath = ref;

export default rootRef;

/* EOF */
