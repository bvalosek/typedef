var typedef = require('../../lib/typedef');

QUnit.module('Mixins');

test('Basic mixins', function() {

    var M = typedef.mixin('M').define({
        x: function() {}
    });

    strictEqual(M.__mixin__, true, 'is a mixin');
});

test('Mixing into class', function() {

    var f1 = function() {};
    var f2 = function() {};
    var f3 = function() {};
    var f4 = function() {};

    var M = typedef.mixin('M').define({
        f1: f1
    });
    var P = typedef.mixin('P').define({
        f4: f4
    });

    var N = typedef.mixin('N').uses(M, P).define({
        f3: f3
    });

    var C = typedef.class('C').uses(N).define({
        f2: f2
    });

    var cs = typedef.signature(C);

    strictEqual(cs.f1.inheritedFrom, N, 'class shows inherited from');
    strictEqual(C.prototype.f1, f1, 'function shows up on prototye');

});

test('Advice stuff', function() {
    var w = {}; var x = {}; var y = {}; var z = {};

    var A = typedef.class('A').define({
        f: function() { return x; },
        g: function() { return x; }
    });

    var MBad = typedef.mixin('MBad').define({
        __before__after__f: function() { }
    });

    var MBefore = typedef.mixin('MBefore').define({
        __before__f: function() {
            return y;
        }
    });

    var MAfter = typedef.mixin('MAfter').define({
        __after__f: function() {
            return z;
        },
        __before__g: function() {
        }
    });

    var MWrapped = typedef.mixin('MWrapped').define({
        __wrapped__f: function(f) {
            f();
            return w;
        }
    });

    ABefore = typedef.class().extends(A).uses(MBefore).define();
    AAfter = typedef.class().extends(A).uses(MAfter).define();
    AWrapped = typedef.class().extends(A).uses(MWrapped).define();

    strictEqual(new ABefore().f(), x, 'before augmentation does not change return value');
    strictEqual(new AAfter().f(), z, 'after augmentation changes return value');
    strictEqual(new AWrapped().f(), w, 'wrapped augmentation changes return value');
    strictEqual(new AAfter().g(), x, 'no return value on after augmentation returns original value');
});
