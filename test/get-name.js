var test = require('tape');
var getName = require('../lib/getName.js');


test('Basic get name', function(t) {
  t.plan(5);

  function a() { }
  function a_b() { }
  function __aB_$(a) { }
  function __aB_$_(a, b, c) { }
  function __aB_$3__$$a1sdfz(a3x, bx_, _c) { }

  t.strictEqual(getName(a), 'a', 'no args');
  t.strictEqual(getName(a_b), 'a_b', 'ugly args');
  t.strictEqual(getName(__aB_$), '__aB_$', 'ugly with arg');
  t.strictEqual(getName(__aB_$_), '__aB_$_', 'ugly with 3 args');
  t.strictEqual(getName(__aB_$3__$$a1sdfz), '__aB_$3__$$a1sdfz', 'real ugly and ugly args');
  
});

test('Whitespace get name', function(t) {
  t.plan(5);

  function a      (
  
    ) 
    { }
  function a_b(){}

  function __aB_$ ( 
  
  
  a) 
  
  { 
  
  }

  function __aB_$_(
  a, 
  b, c) { }
  function 
  __aB_$3__$$a1sdfz
  (a3x,bx_,_c) { }

  t.strictEqual(getName(a), 'a', 'no args');
  t.strictEqual(getName(a_b), 'a_b', 'ugly args');
  t.strictEqual(getName(__aB_$), '__aB_$', 'ugly with arg');
  t.strictEqual(getName(__aB_$_), '__aB_$_', 'ugly with 3 args');
  t.strictEqual(getName(__aB_$3__$$a1sdfz), '__aB_$3__$$a1sdfz', 'real ugly and ugly args');
  
});
