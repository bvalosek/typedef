# Typedef

[![Build Status](https://travis-ci.org/bvalosek/typedef.png?branch=master)](https://travis-ci.org/bvalosek/typedef)
[![NPM version](https://badge.fury.io/js/typedef.png)](http://badge.fury.io/js/typedef)

Low-level type-centric utility functions for Javascript.

## Installation

**Typedef** is meant to be used with [Browserify](http://browserify.org/) on
the client (or just as a normal Node module), so install it with npm:

```
npm install typedef
```

## Tern Support

The library files are all decorated with [JSDoc](http://usejsdoc.org/)-style
annotations that work great with the [Tern](http://ternjs.net/) code interence
system. Combined with the Node plugin (see this project's `.tern-project`
file), you can have intelligent autocomplete for methods in this library.

## Testing

Unit testing is done by [QUnit](http://qunitjs.com/) and can be run from the
command line via [Grunt](http://gruntjs.com/).

Testing requires [node/npm](http://nodejs.org) and
[grunt-cli](https://github.com/gruntjs/grunt-cli) to be installed on your
system.

To ensure you have the required apps:

```
npm install -g grunt-cli
```

Then install all the dev dependencies and run the tests:

```
npm install
grunt test
```

## License
Copyright 2014 Brandon Valosek

**Typedef** is released under the MIT license.


