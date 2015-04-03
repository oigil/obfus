# Obfus

  Obfuscate IDs or classNames with unique and random strings.

## Installation

```bash
$ npm install obfus -g
```

## Usage
```bash
$ obfus <config-json-path>
```

## Config JSON Specification
```bash
    {
        "separator": "\\_\\_(.+?)\\_\\_", // Be sure to use the unique separator to avoid unnecessary work.
        "source": [
                "public/css", //If a directory is defined, it explorers all the sub-directories and files.
                "public/index.html"
        ],
        "obfuscationDictionary": {}, //Dictionary object to load. (Keep it blank)
        "obfuscationDictionaryLog": "obfus_dictionary.log", //Dictionary log's filename. (Keep it blank if you don't need it.)
        "source_postfix": "_old",
        "target_postfix": ""
    }
```
----
## Quick Start
### 1. Prefare source files. (IDs and classNames must be wrapped using the separator.)
```bash
test/
+-- public
|   +-- css
|   |   +-- style.css
|   +-- index.html
+-- obfusConfig.json
```

#### - index.html
```
<!DOCTYPE html>
<html>
<head>
	<title>Obfus Test</title>
	<meta charset="utf-8">
	<link href="./css/style.css" rel="stylesheet">
</head>
<body>
<div id="__wrapper__">
	<h1 class="__title__">Big Title</h1>
	<p class="__paragraph__">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</p>
</div>
</body>
</html>
```
#### - style.css
```
#__wrapper__ {background:yellow;}
#__wrapper__ h1 {font-size:64px;font-style:italic;}
#__wrapper__ .__title__ {color:blue;}
#__wrapper__ .__paragraph__ {font-size:20px;}
```
#### - obfusConfig.json
```
    {
        "separator": "\\_\\_(.+?)\\_\\_",
        "source": [
                "public/css/",
                "public/index.html"
        ],
        "obfuscationDictionary": {},
        "obfuscationDictionaryLog": "obfus_dictionary.log",
        "source_postfix": "_old",
        "target_postfix": ""
    }
```
### 2. Run 'obfus' with config-json path 

```bash
test$ obfus ./obfusConfig.json
```
### 3. Result
```bash
test/
+-- public
|   +-- css
|   |   +-- style.css
|   |   +-- style_old.css
|   +-- index.html
|   +-- index_old.html
+-- obfus_dictionary.log
+-- obfusConfig.json
```

#### - index.html
```
<!DOCTYPE html>
<html>
<head>
	<title>Obfus Test</title>
	<meta charset="utf-8">
	<link href="./css/style.css" rel="stylesheet">
</head>
<body>
<div id="AE">
	<h1 class="jT">Big Title</h1>
	<p class="Oe">
		Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</p>
</div>
</body>
</html>
```
#### - style.css
```
#AE {background:yellow;}
#AE h1 {font-size:64px;font-style:italic;}
#AE .jT {color:blue;}
#AE .Oe {font-size:20px;}
```
#### - obfus_dictionary.log
```
{"__wrapper__":"AE","__title__":"jT","__paragraph__":"Oe"} 
```

## People

Cavin Jo ([oigil.jo@gmail.com](https://github.com/oigil))
