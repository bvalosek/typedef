module.exports = getArguments;

var FUNCTION_ARGS = /^\w*function[^\(]*\(([^\)]+)/;

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
    args = args[1]
      .replace(/[ ]*,[ ]*/, ',')
      .split(',');
    for (var n = 0; n < args.length; n++) {
      var a = args[n].replace(/^\s+|\s+$/g, '');
      if (a) ret.push(a);
    }
  }

  return ret;
}

