# Typedef

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

* **Mixins.** Add member functions to a class without enforcing a
  strict single-inheritance relationships. The `before`, `after`, and `wrapped`
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

## Defining Classes

### Extending Classes

### Using Mixins

### Implementing Interfaces

## Class Member Decorations

Member decorations are a key part of **Typedef**. They allow for the attachment
of meta tags onto members during class definition. This meta information can
then be used to inforce certain rules, or change the behavior of the member.

All decorations are surrounded by 2 underscores, and multiple decorations can
be set on a single member.

## Inheritance Decorations

The inheritance decorations are used to govern and check the inheritance
semantics of your classes.

All inheritance decorations only add additional checking overhead during
define time; no run-time overhead is incurred after the initial load and
definition.

### virtual

### abstract

### override

### sealed

### new

## Accessor Decorations

### readonly

### static

## Mixin Decorations

### before

### after

### wrapped

## Semantic Decorations

### fluent

## Constructor Decoration

### constructor

## Compatibility

**Typedef** will work with the following browsers:

* Chrome 7+
* Firefox 4+
* Safari 5.1+
* Opera 4+
* Internet Explorer 9+

### Tests

```
npm install
grunt test
```

## Special Thanks

### Contributers

* Brandon Valosek [@bvalosek](http://twitter.com/bvalosek)
* Dillon Shook [dshook.is](http://dshook.is)

## License
Copyright 2013 Brandon Valosek

**Typedef** is released under the MIT licenses.

