import _ from 'lodash';
import assert from 'assert';
import ref from '../../dist/ref.js';

/**
 * Hostname used in the tests.
 *
 * @type {string}
 */
const TEST_HOSTNAME = 'example.com';

/**
 *
 * @type {Array.<{args: {[p: string]: string, headers: {host: string}, "x-forwarded-proto": string, connection: {encrypted: boolean}}[], result: string, skip:
 *     boolean, it: string}>}
 */
const TESTS = [

	/**
	 * Test an request object which has been forwarded to HTTP service from outside HTTPS-enabled proxy.
	 */
	{
		it: 'should return correct url for http request with https proxy',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME,
				'x-forwarded-proto': 'https'
			},
			connection: {
				encrypted: false
			}
		}],
		result: `https://${TEST_HOSTNAME}/`
	},

	/**
	 * Test an request object which was received directly to HTTPS service without a proxy.
	 */
	{
		it: 'should return correct url for https request no proxy',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME
			},
			connection: {
				encrypted: true
			}
		}],
		result: `https://${TEST_HOSTNAME}/`
	},

	/**
	 * Test an request object which was received directly to HTTP service without a proxy.
	 */
	{
		it: 'should return correct url for https request no proxy',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME
			},
			connection: {
				encrypted: false
			}
		}],
		result: `http://${TEST_HOSTNAME}/`
	},

	/**
	 * Test an request object which has been forwarded to HTTP service from outside HTTPS-enabled proxy.
	 */
	{
		it: 'should return correct url for http request with http proxy',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME,
				'x-forwarded-proto': 'http'
			},
			connection: {
				encrypted: false
			}
		}],
		result: `http://${TEST_HOSTNAME}/`
	},

	/**
	 * Test an request object which has been forwarded to HTTP service from outside HTTPS-enabled proxy.
	 */
	{
		it: 'should return correct url for http request with https proxy, and api suffix',
		skip: false,
		args: [
			{
				headers: {
					host: TEST_HOSTNAME,
					'x-forwarded-proto': 'https'
				},
				connection: {
					encrypted: false
				}
			},
			'api'
		],
		result: `https://${TEST_HOSTNAME}/api`
	},

	/**
	 * Test an request object which was received directly to HTTPS service without a proxy.
	 */
	{
		it: 'should return correct url for https request no proxy, and api suffix',
		skip: false,
		args: [
			{
			headers: {
				host: TEST_HOSTNAME
			},
			connection: {
				encrypted: true
			}
		}, 'api'],
		result: `https://${TEST_HOSTNAME}/api`
	},

	/**
	 * Test an request object which was received directly to HTTP service without a proxy.
	 */
	{
		it: 'should return correct url for https request no proxy, and api suffix',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME
			},
			connection: {
				encrypted: false
			}
		}, 'api'],
		result: `http://${TEST_HOSTNAME}/api`
	},

	/**
	 * Test an request object which has been forwarded to HTTP service from outside HTTPS-enabled proxy.
	 */
	{
		it: 'should return correct url for http request with http proxy, and api suffix',
		skip: false,
		args: [{
			headers: {
				host: TEST_HOSTNAME,
				'x-forwarded-proto': 'http'
			},
			connection: {
				encrypted: false
			}
		}, 'api'],
		result: `http://${TEST_HOSTNAME}/api`
	}

];

describe('ref', () => {

	it('should be a function', () => {
		assert.equal(_.isFunction(ref), true, "must be a function");
	});

	TESTS.forEach(test => {
		(test.skip ? xit : it)(test.it, () => {
			assert.equal(ref(...test.args), test.result);
		});
	});

	describe('#withPath', () => {

		it('should be a function', () => {
			assert.equal(_.isFunction(ref.withPath), true, "must be a function");
		});

	});

});
