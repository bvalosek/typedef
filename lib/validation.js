var util             = require('./util');
var _                = require('underscore');
var TypedefException = require('./exception');

// Validation code. Involved with ensuring that we are semantically correct
// with our interfaces, etc. THIS SHOULD ALL BE OPTIONAL CODE
module.exports = exports = validation = {

    // Pretty print a member + decorations + function sig
    prettyPrint: function(key, info, Thing)
    {
        var s = '';

        // all decorations
        if (info)
            _(info.decorations).each(function(v, dec) {
                s += dec.toLowerCase() + ' ';
            });

        // the actual key
        if (Thing) s += Thing.__name__ + '::';
        s += key;

        if (!info)
            return s;

        // function args
        if (_(info.value).isFunction()) {
            s += '(';
            _(core.getSignature(info.value)).each(function(param, n) {
                if (n)
                    s += ', ';
                if (!param.required)
                    s += '[';
                s += param.name;
                if (!param.required)
                    s += ']';
            });
            s += ')';
        }

        return s;
    },

    // True if (ignoring mixin and inheritance decorations, which are checked
    // in other methods) 2 deco sigs are the same
    sameDecorations: function(d1, d2)
    {
        var dk1 = _(d1).chain()
            .omit(['BEFORE', 'AFTER', 'WRAPPED', 'ABSTRACT', 'VIRTUAL', 'OVERRIDE'])
            .keys().value();
        var dk2 = _(d2).chain()
            .omit(['BEFORE', 'AFTER', 'WRAPPED', 'ABSTRACT', 'VIRTUAL', 'OVERRIDE'])
            .keys().value();

        if (dk1.length != dk2.length)
            return false;

        if (_(dk1).difference(dk2) < 1 && _(dk2).difference(dk1) < 1)
            return true;

        return false;
    },

    // True if the sigs are the same
    sameFunctionSignatures: function(s1, s2)
    {
        if (_(s1).size() !== _(s2).size())
            return false;

        // check sigs in order to ensure they're the same
        return !_(s1).find(function(info, key) {
            return info.required !== s2[key].required;
        });
    },

    // Check that a given class correctly implements an interface
    checkInterface: function(C, iface)
    {
        var sig    = core.getSignature(C);
        var sClass = 'Class ' + C.__name__;

        _(core.getSignature(iface)).each(function(info, key) {
            var cInfo = sig[key];
            var s     = validation.prettyPrint(key, info, iface);
            var cs    = validation.prettyPrint(key, cInfo, C);

            // ensure that we have it (and are both functions)
            if (!C.prototype[key])
                throw new TypedefException(sClass + ' does not implement ' + s);

            // ensure that the decorations match
            if (!validation.sameDecorations(info.decorations, cInfo.decorations))
                throw new TypedefException(cs + ' does not correctly implement ' + s);

            // ensure function sig matches
            if (!validation.sameFunctionSignatures(
                core.getSignature(info.value),
                core.getSignature(cInfo.value)))
                    throw new TypedefException(cs + ' does not correctly implement ' + s);
        });

    },

    // This ensures that all inheritance stuff makes sense from child class.
    // Returns true if okay
    checkInheritance: function(C)
    {
        var Base   = _(C.__parents__).find(function(x) { return x.__class__; });
        if (!Base)
            return;

        var sClass = 'Class ' + C.__name__;
        var sBase  = 'Class ' + Base.__name__;

        var bSig = core.getSignature(Base);

        _(core.getSignature(C)).each(function(info, key) {
            var bInfo = bSig[key];
            var s     = validation.prettyPrint(key, info, C);
            var bs    = validation.prettyPrint(key, bInfo, Base);
            var isOwn = !!C.__signature__[key];

            if (!isOwn) return;

            // No base member but we say override
            if (info.decorations.OVERRIDE && !bInfo)
                throw new TypedefException(
                    'Invalid override decoration for ' + s);

            // if we have our own method and base is sealed
            if (bInfo && bInfo.decorations.SEALED)
                throw new TypedefException(sClass +
                    ' cannot override sealed inherited member ' + bs);

            // if we're new or no base member, we're done
            if (info.decorations.NEW || !bInfo)
                return;

            // Have to use override
            if (!info.decorations.OVERRIDE)
                throw new TypedefException(sClass +
                    ' cannot override inherited member ' + bs +
                    ', use override');

            // Base member must be overrideable
            if (!bInfo.decorations.VIRTUAL &&
                !bInfo.decorations.OVERRIDE &&
                !bInfo.decorations.ABSTRACT)
                    throw new TypedefException(sClass +
                        ' cannot override inherited member ' + bs +
                        ', base member must be abstract of virtual');

            // same decorations
            if (!validation.sameDecorations(info.decorations, bInfo.decorations))
                throw new TypedefException(s + ' and ' + bs +
                    ' must have same member decorations');

            if (_(bInfo.value).isFunction() && !_(info.value).isFunction())
                throw new TypedefException(s + ' must be a function');

            // same function signatures
            if (!validation.sameFunctionSignatures(
                    core.getSignature(info.value),
                    core.getSignature(bInfo.value)))
                throw new TypedefException(s + ' and ' + bs +
                    ' must have same function signatures');

        });
    },

    // Check for any thing else we're trying to enforce
    checkMisc: function(C)
    {
        // Check for fluent stuff
        var sClass = 'Class ' + C.__name__;

        _(core.getSignature(C)).each(function(info, key) {
            var s = validation.prettyPrint(key, info, C);

            if (info.decorations.FLUENT) {

                if (!_(info.value).isFunction()) {
                    throw new TypedefException('fluent member ' + s +
                        ' must be function');
                }

                var re      = /return\s+([^;]+)/g;
                var body    = info.value.toString();
                var good    = true;
                var matches = 0;
                var tots    = 0;

                while ((match = re.exec(body)))
                {
                    tots++;
                    if (match[1] == 'this')
                        matches++;
                }

                if (!matches || matches != tots) {
                    throw new TypedefException('fluent member ' + s +
                        ' must return own instance in all code paths');
                }
            }

        });
    },
};
