var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var getRandomString = require("./getRandomString.js");

module.exports = function (filePath, config) {
	var fileDirname = path.dirname(filePath),
		fileExtension = path.extname(filePath),
		fileBasename = path.basename(filePath, fileExtension);
	var targetFilePath = fileDirname + "/" + fileBasename + (config.target_postfix || "") + fileExtension;

	var fileString = fs.readFileSync(filePath, "utf8");
	var convertedFileString = fileString;

	var matchedStrings = fileString.match(new RegExp(config.separator, "g"));
	matchedStrings = _.uniq(matchedStrings);

	matchedStrings.forEach(function (string) {
		getRandomString(config.obfuscationDictionary, string, function (randomString) {
			convertedFileString = convertedFileString.replace(new RegExp(string, "g"), randomString);
		});
	});

	if (fileString === convertedFileString) {
		console.log("[PASS] No need to be converted : " + filePath);
		return;
	}

	if (config.source_postfix) {
		fs.renameSync(filePath, fileDirname + "/" + fileBasename + (config.source_postfix || "") + fileExtension);	
	}
	
	fs.writeFileSync(targetFilePath, convertedFileString, "utf8");

	console.log("[DONE] " + filePath + " -> " + targetFilePath);
	config.convertedFilesCount++;
}