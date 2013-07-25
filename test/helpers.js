var print = function(Thing)
{
    var sig = typedef.signature(Thing);
    var s = '';

    if (typdef.isClass(Thing))
        s += 'class ';
    else if (typdef.isMixin(Thing))
        s += 'mixin ';
    else
        s += 'interface ';

    s += Thing.__name__;

    var Parent = null;
    var mixins = [];
    var interfaces = [];

    // parents
    _(Thing.__parents__).each(function(parent, n) {
        if (parent === typdef.BaseObject)
            return;
        if (typdef.isClass(parent)) Parent = parent;
        if (typdef.isMixin(parent)) mixins.push(parent);
        if (typdef.isInterface(parent)) interfaces.push(parent);
    });

    if (Parent)
        s += ' extends ' + Parent.__name__;
    if (mixins.length) {
        s += ' uses ';
        _(mixins).each(function(m, i) {
            if (i)
                s += ', ';
            s += m.__name__;
        });
    }
    if (interfaces.length) {
        s += ' implements ';
        _(interfaces).each(function(iface, i) {
            if (i)
                s += ', ';
            s += iface.__name__;
        });
    }

    s += '\n{\n';

    // Members
    _(sig).each(function(info, key) {
        var val = info.value;
        var attr = info.attributes;

        s += '    ';

        // attributes
        if (!_(attr).isEmpty()) {
            s += '[';
            var n = 0;
            _(attr).each(function(value, key) {
                if (n++)
                    s += ', ';
                s += key + ' = "' + value + '"';
            });
            s += ']\n    ';
        }

        // decorations
        _(info.decorations).each(function(x, a) {
            s += a.toLowerCase() + ' ';
        });

        s += key;

        // values
        if (_(val).isFunction()) {
            s += '(';
            var fs = typdef.signature(val);
            _(fs).each(function(param, n) {
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

        s += ';';

        if (info.inheritedFrom !== Thing) {
            s += ' -> inherited from ' + info.inheritedFrom.__name__;
        }

        s += '\n\n';
    });

    s += '}';

    console.log(s);
};
