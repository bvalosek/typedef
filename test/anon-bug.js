// for a weird bug dealing with anon functions
var test    = require('tape');
var getArgs = require('../lib/getArguments.js');

test('anon function', function(t) {
  t.plan(1);
  var args = getArgs(
    function () {
      return new Promise(function(resolve) {
        setTimeout(function() { resolve(); }, 3000);
      });
    }
  );

  t.deepEqual(args, []);

});

