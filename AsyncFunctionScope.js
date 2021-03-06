#!/usr/bin/env node

'use strict';

const Scope = require('zscope').Scope;
const AsyncFunction = require('./AsyncFunction').AsyncFunction;

class AsyncFunctionScope extends Scope {

	static init (...args) {
		return Object.freeze(new AsyncFunctionScope(...args));
	}

	_setKeyValue (key, value) {
		if (value instanceof AsyncFunction) return super._setKeyValue(key, value);
		throw new Error('AsyncFunctionScope.setItem got value not a AsyncFunction');
	}

	apply (key, args) {
		if (!(args instanceof Array)) args = [args];
		if (this._is(key)) return (this._get(key))(...args);
		throw new Error('AsyncFunctionScope.apply called with key not in Scope');
	}

	call (key, ...args) {
		if (this._is(key)) return (this._get(key))(...args);
		throw new Error('AsyncFunctionScope.call called with key not in Scope');
	}

}

exports.AsyncFunctionScope = AsyncFunctionScope;
