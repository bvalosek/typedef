var typedef = require('../../lib/typedef');

QUnit.module('is() function');

var is = typedef.is;

test('Class', function() {

    var C = typedef.class('C').define();
    var D = typedef.class('D').extends(C).define();
    var E = typedef.class('E').extends(D).define();
    var X = typedef.class('X').extends(C).define();
    var Y = typedef.class('Y').extends(D).define();
    var Z = typedef.class('Z').extends(Y).define();

    strictEqual(is(new C(), C), true, 'is self');
    strictEqual(is(new D(), C), true, 'child is parent');
    strictEqual(is(new E(), C), true, 'grandchild is parent');

    strictEqual(is(new C(), D), false, 'parent is not child');
    strictEqual(is(new X(), D), false, 'sibling is not parent');
    strictEqual(is(new E(), X), false, 'grandchild is not cousin');

});

test('Mixins and Interfaces', function() {

    var M = typedef.mixin('M').define();
    var N = typedef.mixin('N').define();
    var O = typedef.mixin('O').define();
    var P = typedef.mixin('P').uses(O).define();

    var A = typedef.class('A').uses(M).define();
    var B = typedef.class('B').extends(A).uses(N).define();
    var C = typedef.class('C').extends(B).uses(P).define();
    var Q = typedef.class('Q').extends(C).define();
    var R = typedef.class('R').extends(Q).define();
    var X = typedef.class('X').extends(B).define();
    var Y = typedef.class('Y').extends(X).define();

    strictEqual(is(new A(), M), true, 'mixin on class');
    strictEqual(is(new B(), M), true, 'mixin on subclass');
    strictEqual(is(new C(), M), true, 'mixin on subsubclass');

    // R is P
    strictEqual(is(new R(), C), true, 'R is C');
    strictEqual(is(new R(), O), true, 'R is O');
    strictEqual(is(new R(), P), true, 'R is P');

    strictEqual(is(new A(), N), false, 'forward mixin not on class');

});
