# Typedef

[![Build Status](https://travis-ci.org/bvalosek/typedef.png?branch=master)](https://travis-ci.org/bvalosek/typedef)
[![NPM version](https://badge.fury.io/js/typedef.png)](http://badge.fury.io/js/typedef)

Low-level type-centric utility functions for Javascript.

[![browser support](https://ci.testling.com/bvalosek/typedef.png)](https://ci.testling.com/bvalosek/typedef)

## Installation

**Typedef** can be used on the server with NodeJS or on the client, built with
[Browserify](http://browserify.org/), so install with npm:

```
npm install typedef
```

## Usage

### extends(`Child`, `Base`)

While traditionally, favoring composition over inheritance in Javascript is
typically the way to go, classic inheritance can be useful if used sparingly.

This is the `extends` function that is used in Typescript, Coffeescript, ES6
compilers, etc. It uses prototypes to setup something similar to to classical
single inheritance.

```javascript
var extends_ = require('typedef').extends;

function Base()
{
  console.log('base ctor');
}

Base.prototype.method = function()
{
  console.log('hello from base class');
}

...

extends_(Child, Base);

function Child()
{
  // Call base constructor
  Child.Super.apply(this, arguments);

  console.log('child ctor');
}

Child.prototype.method2 = function()
{
  console.log('hello from child class');
}

...

var foo = new Child();
// base ctor
// child ctor

foo.method();
// hello from base class

foo.method2();
// hello from child class

foo instanceof Child;
// true

foo instanceof Base;
// true
```

### mixin(`Constructor`, `Mixin`)

Class composition method. Mixin methods into `Constructor.prototype`.

If `Mixin` is a constructor function (class), then mixin all static properties
into `Constructor`, and everything on `Mixin.prototype` to
`Constructor.prototype`. If `Mixin` is just a Plain Old Object, then simply add
the members of `Mixin` to `Contructor.prototype`.

### getArguments(`f`) and getName(`f`)

Get the name of all the parameters or name for function `f`.

```javascript
var getArguments = require('typedef').getArguments;
var getName      = require('typedef').getName;

function foo(a, b, c)
{
  ...
}

getArguments(foo);
// ['a', 'b', 'c']

getName(foo);
// 'foo'
```

## Tern Support

The library files are all decorated with [JSDoc3](http://usejsdoc.org/)-style
annotations that work great with the [Tern](http://ternjs.net/) code inference
system. Combined with the Node plugin (see this project's `.tern-project`
file), you can have intelligent autocomplete for methods in this library.

## Testing

Testing is done with [Tape](http://github.com/substack/tape) and can be run
with the command `npm test`.

Automated CI cross-browser testing is provided by
[Testling](http://ci.testling.com/bvalosek/typedef).


## License
Copyright 2014 Brandon Valosek

**Typedef** is released under the MIT license.

