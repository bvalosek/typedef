# Typedef

[![Build Status](https://travis-ci.org/bvalosek/typedef.png?branch=master)](https://travis-ci.org/bvalosek/typedef)

**Typedef** is a lightweight library (1.7 KB, 4.7 KB with
[underscore.js](http://www.underscorejs.org) bundled in) that brings some
much-needed sanity to object-oriented programming in Javascript. These features
will feel very familiar and refreshing to anyone experienced in a more
civilized staticly-typed language like C# or Java.

**Typedef** introduces two interesting concepts for Javascript: class member
decorations, and the idea of "define-time" (semi-static) checking. In addition
it rolls in classical-style inheritance, interfaces, and mixins.

The goal is to let you build scalable web apps with a rich class hierarchy
using proven object-oriented concepts and semantics-enforcing constructs. Wed
with the dynamic nature of Javascript-- it's a potent mix.

The Javascript romantic in you may recoil and shout back about the virtues of
embracing the native prototype-style inheritance model. This is
understandable-- but if you can unburden yourself from the limitations you've
built around the language and keep an open mind... you're in for a wild ride.

## Feature Overview

* **Class inheritance.** Classical inheritance goodness in Javascipt. Create a
  rich class hierarchy that feels sane, with all the power and common sense
  you've come to expect in an object-oriented language.

* **Mixins.** Add member functions to a class without enforcing a strict
  single-inheritance relationships. The `before`, `after`, and `wrapped`
  "advice" decorations can be used to modify existing functions.

* **Interfaces.** Classical `interface` pattern lets you write code that is
  self-documenting and forces define-time checks on code contracts.

* **Member decorations.** Use modifiers on class members, mixin members, or
  interface members to change their behavior or enforce inheritance and access
  semantics, or use custom decorations and reflection to amp up your own
  classes and reduce boilerplate.

* **Define-time semantics checking.** Use the `virtual`, `abstract`, and
  `override` member decorations to ensure predictable inheritance behavior, and
  get feedback in the form of define-time errors when implementation contracts
  are broken.

## Getting Started

**Typedef** is packaged with the [UMD pattern](https://github.com/umdjs/umd),
so it can be used in the browser via a global with a `<script>` tag, on the
server with Node, as an AMD module with RequireJS, or with CommonJS via
[Browserify](https://github.com/substack/node-browserify).

### Building

Install all of the required modules to build and use `grunt` to build the files into the `bin/` directory:

```
npm install
grunt release
```

## Defining Classes

Easy peasy. Defining a class involves passing a hash of all the corresponding
member functions to the typedef function, as well as (optionally) naming the class.

```
// Base class definition example ....
```

It works exactly as you might imagine.

```
// Base class instantiation and use example ...
```

Notice that the (optional) constructor function is provided via the
`__constructor__` property in the hash.

Classes are constructor functions that leverage the native prototypical
inheritance model.

### Extending Classes

**Typedef** allows for single-inheritance from a base class via chaining the
`.extends()` function in your class definition. Child constructors are
implicitly called, from the base up, when instantiating child classes.

```
// Child class definition example
```

Child classes can be thought of as inheriting the members of the base class--
though really what is going on is simply building up the native prototype
chain.

```
// Child class use example
```

### Using Mixins

Mixins provide a way to add or augment existing member functions in a class.
Multiple mixins can be used during a class definition, and the *advice*
decorations allow for modifying existing functions.

Mixins are added *after* the class is setup, meaning any wrapping augmentations
will be applied on top of defined members of the class.

To add a mixin to your class definition, chain the `.uses()` method in your
definition.

```
// Mixin definition ...
```

### Implementing Interfaces

Interfaces give you a way of specifying a required set of member functions be
present in a class implementation. Though this may seem superfluous for a
duck-typed language like Javascript, this allows you run-time inspection of an
object's abilities with a greater degree of clarity.

In addition, using interface patterns allows for your code to be more
self-documenting. Any discrepancy between a class and an interface it
implements will cause define-time exception, informing you of the issue.

Specify that a class implements a specific interface by chaining the
`implements()` method in your class definition.

```
// Interface definition ...
```

## Inheritance Decorations

The inheritance decorations are used to govern and check the inheritance
semantics of your classes.

All inheritance decorations only add additional checking overhead during
define time; no run-time overhead is incurred after the initial load and
definition.

### virtual

The `virtual` decoration follows its classical use, in that indicates a class
member *may* be overridden in child class. By default, all members are
non-virtual, and thus cannot be overridden. This effectively makes any sort of
member hiding in **Typedef** explicit.

Attempting to override a base member that isn't virtual will result in a
define-time error.

### abstract

An `abstract` member is the same as a `virtual` member, with the difference
that a derived class *must* override the abstract member.

A class with at least one abstract member is considered an abstract class. An
exception is thrown when attempting to instantiate an abstract class.

### override

The `override` decoration is required when overriding a base member in a child
class. The base member must be `virtual`.

### new

The `new` decoration indicates that the previous implementation of a member is
to be disregarded. This can be used to explicitly hide a base class member that
isn't set to `virtual`, for example.

### sealed

A `sealed` member indicates that it cannot be override at all, even if using
the `new` decoration. This provides a way to very clearly indicate that a
member should not be changed in derived implementations of a class.

Attempting to override a `sealed` member will result in a define-time
exception.

## Accessor Decorations

### readonly

Using the `readonly` decoration will define the property with the `writable`
flag set to `false`. Any attempts to update a `readonly` property will silently
fail (unless you `use strict`).

Note that this only applies for the values of members; if a member set as
`readonly` is initialized with an object, that object can still be mutated.

### static

## Mixin Decorations

### before

### after

### wrapped

## Behavior-enforcing Decorations

### fluent

This decoration allows you to signal in your public API that method is designed
to returned the `this` pointer. This allows for the elegant "fluent API" style
of method chaining.

The define-time check uses `function#toString` to check all return statements
to ensure that they are returning `this`. Returning something else (or not
having any `return` statements) will result in a define-time warning.

## Compatibility

**Typedef** makes liberal use of ES5 features such as `Object.defineProperty`
and `Object.create`, and thus will work with any modern browser:

* Chrome 7+
* Firefox 4+
* Safari 5.1+
* Opera 4+
* Internet Explorer 9+

### Tests

Testing is powered by [QUnit](http://qunitjs.com/) and can be run from the
command line via `grunt-contrib-qunit`. To install all modules and test:

```
npm install
grunt test
```

### Contributers

* Brandon Valosek [@bvalosek](http://twitter.com/bvalosek)
* Dillon Shook [dshook.is](http://dshook.is)

## License
Copyright 2013 Brandon Valosek

**Typedef** is released under the MIT licenses.

