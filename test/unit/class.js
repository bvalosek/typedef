var typedef = require('../../lib/typedef');

QUnit.module('Class');

test('Simple class definition', function() {

    var m1 = {};
    var m2 = {};

    var C = typedef.class('C').define({
        m1: m1,
        __virtual__m2: m2
    });

    strictEqual(C.prototype.m1, m1, 'Basic member appears on prototype');
    strictEqual(C.prototype.m2, m2, 'Decorated member appears on prototype');
    strictEqual(C.__name__, 'C', 'Class name meta prop');
    strictEqual(C.__class__, true, 'Class flag set');
    strictEqual(C.__signature__.m2.decorations.VIRTUAL, true, 'Decoration sets flag in signature');
    strictEqual(C.__signature__.m2.inheritedFrom, C, 'Signature shows own members as inherited from self');

});

test('Inheritance', function() {
    var m1 = {};
    var m2 = {};
    var m3 = {};

    var C = typedef.class('C').define({
        m1: m1,
        __virtual__m3: undefined
    });

    var D = typedef.class('D').extends(C).define({
        m2: m2,
        __override__m3: m3
    });

    var ds = typedef.signature(D);

    strictEqual(ds.m1.inheritedFrom, C, 'inheritedFrom on child is parent');
    strictEqual(ds.m3.inheritedFrom, D, 'inheritedFrom on overridden child is child');
});

test('Constructor semantics', function() {

    var log = '';

    var C = typedef.class('C').define({
        __constructor__: function() {
            log += 'c';
        }
    });

    new C();
    strictEqual(log, 'c', 'constructor called');
    log = '';

    var D = typedef.class('D').extends(C).define({
        __constructor__: function() {
            log += 'd';
        }
    });

    new D();
    strictEqual(log, 'cd', 'child and parent constructors called in order');

});

test('Static members', function() {

    var m1 = {};
    var m2 = {};

    var C = typedef.class('C').define({
        __static__m1: m1
    });

    var D = typedef.class('D').extends(C).define();
    var ds = typedef.signature(D);

    strictEqual(C.m1, m1, 'static member shows up on ctor');
    strictEqual(C.prototype.m1, undefined, 'static member does not show on prototype');
    strictEqual(ds.m1, undefined, 'static member doesnt show up on child signature');
    strictEqual(D.m1, undefined, 'static member not on child ctor');

});

test('inheritedFrom handled on derived classes', function() {

    var m1 = {};
    var m2 = {};
    var m3 = {};

    var C = typedef.class('C').define({
        __virtual__m1: undefined,
        m3: m3
    });

    var D = typedef.class('D').extends(C).define({
        __override__m1: m1,
        m2: m2
    });

    var ds = typedef.signature(D);
    strictEqual(ds.m1.inheritedFrom, D, 'override member correct inheritedFrom');
    strictEqual(ds.m2.inheritedFrom, D, 'non-override member correct inheritedFrom');
    strictEqual(ds.m3.inheritedFrom, C, 'inherited member correct inheritedFrom');

});
