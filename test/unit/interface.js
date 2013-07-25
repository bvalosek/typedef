var typedef = require('../../lib/typedef');

QUnit.module('Interface');

test('Simple interface definition', function() {

    var I = typedef.interface('I').define({
        a: function() {},
        b: function(x) {},
        c: function(x, _y, _z) {}
    });

    strictEqual(I.__name__, 'I', 'name meta');

});

test('Interface tree', function() {

    var I = typedef.interface('I').define({
        i: function(a) {}
    });

    var J = typedef.interface('J').implements(I).define({
        j: function(b) {}
    });

    var K = typedef.interface('K').define({
        k: function(c) {}
    });

    var H = typedef.interface('H').implements(J, K).define({
        h: function(d) {},
        __fluent__addNewView: function(view, viewOpts, _showFirst, _extraParams) {}
    });

    var s = typedef.signature(J);
    var s2 = typedef.signature(H);

    strictEqual(s.i.inheritedFrom, I, 'base member is legit');
    strictEqual(s.j.inheritedFrom, J, 'child member is legit');
    strictEqual(s2.i.inheritedFrom, J, 'deep child is legit');
    strictEqual(s2.k.inheritedFrom, K, 'shallow child works');
});

test('Interface validation', function() {

    var I = typedef.interface('I').define({
        __a__b__c__f: function(x,_y) {}
    });

    throws(function() {
        var C = typedef.class('C').implements(I).define();
    }, typedef.Exception, 'missing function');

    throws(function() {
        var C = typedef.class('C').implements(I).define({
            __x__y__a__f: function(x, _y) {}
        });
    }, typedef.Exception, 'incorrect decoration');

    throws(function() {
        var C = typedef.class('C').implements(I).define({
            __a__b__c__f: function(x, y) {}
        });
    }, typedef.Exception, 'incorrect function signature (optional)');

    throws(function() {
        var C = typedef.class('C').implements(I).define({
            __a__b__c__f: function(x, y, z) {}
        });
    }, typedef.Exception, 'incorrect function signature (arg count)');

});
