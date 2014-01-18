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
    args = args[1].replace(/[ ]*,[ ]*/, ',').split(',');
    for (var n = 0; n < args.length; n++) {
      args[n] = args[n].trim();
    }
    ret = args;
  }

  return ret;
}

