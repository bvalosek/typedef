# Change History

## 1.1.0 (2014-08-28)

* Allow `extends_` method to delegate to `Parent.extend` if present. This way
  typedef can be used with libs like [AmpersandJS](http://ampersandjs.com/)
  and [Backbone](http://backbonejs.org/).

## 1.0.4 (2014-05-17)

* Updated NPM dependencies.

## 1.0.3 (2014-04-14)

* Fixed a bug that would cause incorrect arguments to be parsed from a
  zero-argument anonymous function that contained a non-zero argument closure.

## 1.0.2 (2014-01-17)

* Fixed a bug that would cause a child class static member to get
 overwritten if `extends()` is called after it is defined.

## 1.0.1 (2014-01-17)

* Attempt to fix bad NPM publish

## 1.0.0 (2014-01-17)

* First release
