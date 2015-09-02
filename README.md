[![Build Status](https://travis-ci.org/the-software-factory/js-object-keys-mapper.svg?branch=master)](https://travis-ci.org/the-software-factory/js-object-keys-mapper)

# JS Object Keys Mapper
Changes object keys maintaining the same values using `read()` and `write()` methods or creates new keys manipulating object data.

## Installation
You'll need [bower](http://bower.io/) to install JS Object Keys Mapper library and its dependencies
Install the library and save it as a dependency in your project:
```sh
$ bower --save install js-object-keys-mapper
```

## Usage
Let's suppose to have the following object:
```js
var obj1 = {
	text: "This is a text",
	rows: 5,
	isVisible: true
}
```
we need to create a new object with differnt keys but with the same values or similar as follows:
```js
var result = {
	data: "This is a text",
	numberOfRows: 5,
	isHidden: false
}
```
Here you are the solution: instanciate a new `ObjectKeysMapper` as follows:
```js
var mask = {
	read: {
		data: 'text',
		numberOfRows: 'rows',
		isHidden: function(obj) {
			return !obj.isVisible;
		}
	},
	write: {
		// NOTE: not needed for this example
	}
};
var mapper = new ObjectKeysMapper(mask);
var result = mapper.read(obj1);
```

## Development
The project has the following structure:
```
dist/
		*.min.js // The uglified version of the component.
src/
		*.js // The source file
test/
		src/*.test.js // Tests
		...						// Task runner configuration file and test dependencies
```

### Installation
This project requires [node](https://nodejs.org/) for the development installation so you can
install its dependencies, build it and test it.

Please run following commands to install all dependencies:
```sh
$ npm install
```

### Grunt Tasks
Here is a list of grunt `tasks` => `actions` mappings, see below for a deeper explanation of the actions.

|   *Grunt task*    | *jshint* | *uglify* | *usebanner* | *watch* | *emptyTheChangelog* |*conventionalChangelog* | *changelogCommit* |
|-------------------|:--------:|:--------:|:-----------:|:-------:|:-------------------:|:----------------------:|:-----------------:|
|      grunt        |    *     |    *     |      *      |         |                     |                        |                   |
| grunt development |          |          |             |    *    |                     |                        |                   |
| grunt changelog   |          |          |             |         |         *           |         *              |         *         |

* *jshint*: Validate files with JSHint.
* *uglify*: Create the final \*.min.js.
* *usebanner*: Prepends a banner to the minified file
* *watch*: Run default task when src or test files are added, changed or deleted.
* *emptyTheChangelog*: Truncates the CHANGELOG.md file as conventionalChangelog task will append fully regenerated changelog
* *conventionalChangelog*: Appends Markdown-formatted changelog history to CHANGELOG.md
* *changelogCommit*: Prepares a new commit with updated CHANGELOG.md and commit message "CHANGELOG.md Updated"

## Tests
Take a look at [`test/README.md`](test/README.md) for more details.

## Contributing
Take a look at [`CONTRIBUTING.md`](CONTRIBUTING.md) for more details.
