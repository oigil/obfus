var fs = require("fs");
var path = require("path");
var _ = require("underscore");
var dir = require("node-dir");
var Sync = require("sync");

var obfuscateFile = require("./obfuscateFile.js");

Object.prototype.hasOwnValue = function(val) {
    for(var prop in this) {
        if(this.hasOwnProperty(prop) && this[prop] === val) {
            return true;   
        }
    }
    return false;
};

module.exports = function (options) {
	Sync(function () {
		console.log("");
		console.log("[Started] Starting Obfus task...");

		/**
		Parse Option
		*/

		options.resolveBase = path.dirname(options.configJson);
		
		var resolvePath = function (to) {
		    return path.resolve(options.resolveBase, to);
		  };

		var config = require(resolvePath(options.configJson));

		if(!config || !config.separator || !config.source || !config.source.length || !config.obfuscationDictionary) {
			console.error("[ERROR] Not sufficient config data.");
			return;
		}

		/**
		Get Target files
		*/

		var targetFiles = [];

		var addFilePath = function (filePath) {
			filePath = resolvePath(filePath);

			var fsStat = fs.lstatSync(filePath);
			var subPaths;

			if (fsStat.isFile()) {
				targetFiles.push(filePath);

			} else if (fsStat.isDirectory) {
				subPaths = dir.paths.sync(null, filePath);

				if (subPaths.files && subPaths.files.length > 0) {
					subPaths.files.forEach(addFilePath);
				} 
				
				if (subPaths.dirs && subPaths.dirs.length > 0) {
					subPaths.dirs.forEach(addFilePath);
				}
				
			}
		}

		config.source.forEach(addFilePath);

		targetFiles = _.uniq(targetFiles);

		
		/**
		Process obfuscationl
		*/
		
		config.convertedFilesCount = 0;
		targetFiles.forEach(function (filePath) {
	
			filePath = resolvePath(filePath);

			if(!fs.existsSync(filePath)) {
				console.log("[ERROR] File doesn't exist : " + filePath);
				return;
			}
			
			obfuscateFile(filePath, config);
			
		});

		/**
		Save Log file.
		*/

		if (config.obfuscationDictionaryLog && config.convertedFilesCount > 0) {
			fs.writeFileSync(resolvePath(config.obfuscationDictionaryLog), JSON.stringify(config.obfuscationDictionary), "utf8");
			console.log("[LOG] Dictionary file saved at : " + resolvePath(config.obfuscationDictionaryLog));
		}

		console.log("[FINISHED] " + config.convertedFilesCount + " Files converted.");
		console.log("");

	})
}







