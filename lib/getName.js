module.exports = getName;

var FUNCTION_NAME = /function\s+([^\s(]+)/;

/**
 * Get the name of a function (e.g. constructor)
 * @param {Function} f
 * @return {String} The function name.
 */
function getName(f)
{
  var name = '';

  if (f instanceof Function) {
    if (f.name) {
      return f.name;
    }

    var match = f.toString().match(FUNCTION_NAME);

    if (match) {
      name = match[1];
    }
  } else if (f && f.constructor instanceof Function) {
    name = getName(f.constructor);
  }

  return name;
}
