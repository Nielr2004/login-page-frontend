'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = require('es-errors/type');

var objectKeys = require('object-keys');

var callBound = require('call-bound');

var callBind = require('call-bind');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));

var forEach = require('../helpers/forEach');
var isObject = require('../helpers/isObject');

// https://262.ecma-international.org/14.0/#sec-enumerableownproperties

module.exports = function EnumerableOwnProperties(O, kind) {
	if (!isObject(O)) {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};