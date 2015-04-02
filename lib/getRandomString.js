var randomstring = require("random-string");

module.exports = function (dictionary, key, callback, stringLength) {

	if (dictionary[key]) {
		return callback(dictionary[key]);
	}

	stringLength = (stringLength !== undefined) ? stringLength + 1 : 2;
	
	var newRandomString = randomstring({length: stringLength, numeric: false});

	if (dictionary.hasOwnValue(newRandomString)) {
		return module.exports(dictionary, key, callback, stringLength);

	} else {
		dictionary[key] = newRandomString;
		return callback(newRandomString);

	}
};