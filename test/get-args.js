var test    = require('tape');
var getArgs = require('../lib/getArguments.js');

test('Basic arguments', function(t) {
  t.plan(5);

  function f() { }
  function g(a) { }
  function h(a, b) { }
  function i(a, b, c) { }
  function j(c, b, a) { }

  t.deepEqual(getArgs(f), [], 'no args');
  t.deepEqual(getArgs(g), ['a'], '1 arg');
  t.deepEqual(getArgs(h), ['a', 'b'], '2 args');
  t.deepEqual(getArgs(i), ['a', 'b', 'c'], '3 args');
  t.deepEqual(getArgs(j), ['c', 'b', 'a'], '3 args -- order');

});

test('Weird whitespace arguments', function(t) {
  t.plan(5);

  function f(
    ) { }
  function g(   a  ) { }
  function h(        a   ,
    b) { }
  function i( a  , b
    ,
    c
    ) { }
  function j(  c ,  b

    ,


    a                  ) { }

  t.deepEqual(getArgs(f), [], 'no args');
  t.deepEqual(getArgs(g), ['a'], '1 arg');
  t.deepEqual(getArgs(h), ['a', 'b'], '2 args');
  t.deepEqual(getArgs(i), ['a', 'b', 'c'], '3 args');
  t.deepEqual(getArgs(j), ['c', 'b', 'a'], '3 args -- order');

});
