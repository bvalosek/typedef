module.exports = getArguments;

var FUNCTION_ARGS = /function[^\(]*\(([^\)]+)/;

/**
 * Get the parameter names of a function.
 * @param {Function} f A function.
 * @return {Array.<String>} An array of the argument names of a function.
 */
function getArguments(f)
{
  var ret = [];
  var args = f.toString().match(FUNCTION_ARGS);

  if (args) {
    args[1].replace(/[ ]*,[ ]*/, ',')
      .split(',')
      .map(function(s) { return s.trim(); })
      .forEach(function(a) { ret.push(a); }) ;
  }

  return ret;
}

