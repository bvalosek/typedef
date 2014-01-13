module.exports = extends_;

/**
 * The well documented, oft-used (Coffeescript, Typescript, ES6... etc) extends
 * pattern to get some sort of single-inheritance in Javascript.  Modify a
 * Child class to have inherited the static members via copying and link the
 * prototypes.
 * @param {Function} Child Child constructor function.
 * @param {Function} Parent Parent contrusctor function.
 * @return {Function} The Child constructor.
 */
function extends_(Child, Parent)
{
  // Drop in statics
  for (var key in Parent) {
    if (Parent.hasOwnProperty(key)) {
      Child[key] = Parent[key];
    }
  }

  // Give static to access parent
  Child.Super = Parent;

  // Child's prototype property is an object with the parent's prototype
  // property its [[prototype]] + constructor
  Child.prototype = Object.create(Parent.prototype, {
    constructor: { value: Child }
  });

  return Child;
}

