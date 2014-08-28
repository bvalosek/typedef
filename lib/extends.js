module.exports = extends_;

/**
 * The well documented, oft-used (Coffeescript, Typescript, ES6... etc) extends
 * pattern to get some sort of single-inheritance in Javascript.  Modify a
 * Child class to have inherited the static members via copying and link the
 * prototypes.
 *
 * If the `Parent` class has a `extend` method (like Backbone or Ampersand), it
 * will defer to that.
 * @param {Function} Child Child constructor function.
 * @param {Function} Parent Parent contrusctor function.
 * @return {Function} The Child constructor.
 */
function extends_(Child, Parent)
{
  if (typeof Parent.extend === 'function') {

    var proto = {};

    // Add in all the prototype members
    for (var p in Child.prototype) {
      proto[p] = Child.prototype[p];
    }

    proto.constructor = Child;

    // Delegate
    Parent.extend(proto);

    // Give static to access parent
    Child.Super = Parent;

    return;
  }

  // Drop in statics
  for (var key in Parent) {
    if (!Child.hasOwnProperty(key) && Parent.hasOwnProperty(key)) {
      Child[key] = Parent[key];
    }
  }

  // Give static to access parent
  Child.Super = Parent;

  // Child's prototype property is an object with the parent's prototype
  // property its [[prototype]] + constructor
  if (Object.create instanceof Function) {
    Child.prototype = Object.create(Parent.prototype, {
      constructor: { value: Child }
    });
  } else {
    // IE8 and below shim
    var T = makeT(Child);
    T.prototype = Parent.prototype;
    Child.prototype = new T();
  }

  return Child;
}

/**
 * @param {Function} Child
 * @return {Function}
 */
function makeT(Child)
{
  return function T() { this.constructor = Child; };
}

