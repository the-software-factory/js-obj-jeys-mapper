# JS Object Keys Mapper Tests
Defines how to set up an environment to test the project.

## Tests Suite Structure
The directories structure within the `tests` folder reflects what is inside the `src` folder:

    src
    \---->[folder-name]
    \-------->[file-name].js
    tests
    \---->src/
    \-------->[folder-name]
    \------------>[file-name].test.js

## Installation
The environment requires `npm`, install it from here if needed ([Guide for Installing Node](https://nodejs.org/)).

### Install all dependencies
To install all modules you just need to follow these steps:
- Go to `tests`
- Run `npm install`

For example:
```sh
$ cd tests
$ npm install
```
## unning tests
Follow these steps to run the tests suite:
- Go to `tests`
- Run `karma start [config-file]`

For example:
```sh
$ cd tests
$ ./node_modules/karma/bin/karma start test.config.js
```
