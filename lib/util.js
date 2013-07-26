var _ = require('underscore');

// Misc helpers and utility functions that we're using
module.exports = exports = util = {

    // Return a cleaned (decoration free) hash containing all keys and their
    // decoration signature
    processDecorations: function(hash)
    {
        var r = {};

        _(hash).each(function(val, k) {
            var m           = k.toUpperCase().match(/^__([A-Z_]+)__/);
            var decorations = m ? m[1].split('__') : [];
            var key         = m ? k.substring(m[0].length) : k;

            var a = util.makeHash(decorations, true);

            if (!a.PUBLIC && !a.PROTECTED && !a.PRIVATE)
                a = _({PUBLIC: true}).extend(a);

            if (key !== '') {
                r[key] = {
                    value: val,
                    decorations: a
                };
            }
        });

        return r;
    },

    // Exploit function.prototype.toString to get the function parameters as an
    // array of objects of type {name: 'param', optional: false}
    getFunctionSignature: function(f)
    {
        // Extract parameter string
        var args = f.toString().match(/function\s?\(([^\)]+)/);
        if (!args)
            return [];
        args = args[1];

        // Split and map string into array of objects
        var r = [];
        args = args.replace(/[ ]*,[ ]*/, ',')
            .split(',')
            .map(function(s) { return s.trim(); });

        args.forEach(function(a) {
            var name = a.replace(/^_/, '');
            var required = a[0] !== '_';
            r.push({ name: name, required: required });
        });

        return r;
    },

    // Helper function to convert an array of strings into an object with key
    // vals that are equal (ie {STATIC: 'STATIC'}) or fixed with the 2nd
    // parameter
    makeHash: function(strings, value)
    {
        var h = {};
        _(strings).each(function(s) { h[s] = value ? value : s; });
        return h;
    },

    // Convenience function that creates read-only, hidden variable on an
    // object. Can bypass the writable part with last param
    defHidden: function(obj, key, val, writable) {

        // can use a hash instead of a single key val
        var hash = {};
        if (!_(key).isObject())
            hash[key] =  val;
        else
            hash = key;

        _(hash).each(function(val, key) {
            Object.defineProperty(obj, key, {
                value: val,
                enumberable: false,
                configurable: true,
                writable: writable === undefined ? false : writable
            });
        });
    }

};
