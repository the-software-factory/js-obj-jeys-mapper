# JS Object Keys Mapper
Changes object keys maintaining the same values using `read()` and `write()` methods or creates new keys manipulating object data.

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

## Installation
This project requires [node](https://nodejs.org/).

Please run following commands to install all dependencies:
```sh
$ npm install
```

## Development
The project has the following structure:
```
dist/
	*.min.js // The minified and uglified version of the component.
src/
    *.js // The source file
tests/
    ... // Contains all tests and all needed file to set up a tests environment.
    *.test.js // All tests need to have the "test" suffix before the extension.
...
```

### Grunt Tasks
Here is a list of grunt `tasks` => `actions` mappings, see below for a deeper explanation of the actions.

| *Grunt task* | *jshint* | *uglify* | *watch* |
|--------------|:--------:|:--------:|:-------:|
| grunt        |     *    |     *    |         |
| grunt watch  |          |          |    *    |

* *jshint*: Validate files with JSHint.
* *uglify*: Create the final \*.min.js.
* *watch*: Run `default` task when `src` files are added, changed or deleted.

## Tests
Take a look at [`test/README.md`](test/README.md) for more details.
