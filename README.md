#Obfus

  Obfuscate IDs or classNames with unique and random strings.

### Installation

```bash
$ npm install obfus -g
```

### Usage
```bash
$ obfus <config-json-path>
```

### Config JSON Specification
```bash
    {
        "separator": "\_\_(.+?)\_\_"
        "source": [
                "public/js", //If a directory is defined, it explorers all the sub-directories and files.
                "public/css",
                "public/index.html"
        ]
        "obfuscationDictionary": {} //Dictionary object to load. (Keep it blank)
        "obfuscationDictionaryLog": "obfus_dictionary.log" //Dictionary log's filename. (Keep it blank if you don't need it.)
        "source_postfix": "_old"
        "target_postfix": ""
    }
```

## People

Cavin Jo ([oigil.jo@gmail.com](https://github.com/oigil))

## License

  [MIT]
