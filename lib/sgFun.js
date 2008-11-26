/***********************************
File:    sgFun.js
Author  : filippo pacini <filippo.pacini@gmail.com>
License :
The contents of this file are subject to the Mozilla Public
License Version 1.1 (the "License"); you may not use this file
except in compliance with the License. You may obtain a copy of
the License at http://www.mozilla.org/MPL/

Software distributed under the License is distributed on an "AS IS"
basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
the License for the specific language governing rights and
limitations under the License.
The Initial Developer of the Original Code is S.G. Consulting
srl. Portions created by S.G. Consulting s.r.l. are Copyright (C)
2008 S.G. Consulting srl. All Rights Reserved.

************************************/
var sgFun = {
    map: function(fun, list) {
	var res = [];
	if (sgFun._isArray(list)) {
	    for (var i = 0, len = list.length; i < len; i++) {
		res[i] = fun(list[i]);
	    }
	} else {
	    for (field in list) {
		res[i] = fun(list[field]);
	    }
	}
	return res;
    },

    flatten: function(list) {
	var res = [];
	for (var i=0, len=list.length; i<len; i++) {
	    if (sgFun._isArray(list[i])) {
		res = res.concat(sgFun.flatten(list[i]));
	    } else {
		res[res.length] = list[i];
	    }
	}
	return res;
    },

    foldl: function(fun, list, acc) {
	var result = acc;
	for (var i = 0, len = list.length; i < len; i++) {
            result = fun(list[i], result);
	}
	return result;
    },

    foldr: function(fun, list, acc) {
	var result = acc;
	for (var i = list.length-1; i >= 0; i--) {
            result = fun(list[i], result);
	}
	return result;
    },

    filter: function(fun, list) {
	var result = [];
	for (var i = 0, len = list.length; i < len; i++) {
            if (fun(list[i])) {
		result[result.length] = list[i];
	    }
	}
	return result;
    },


    partial: function(fun) {
	var fixed=arguments;
	var res = function() {
	    var newargs = [];
	    for (var arg in fixed) {
		newargs[newargs.length] = arg;
	    }
	    for (var arg2 in arguments) {
		newargs[newargs.length] = arg2;
	    }
	    return apply(fun, newargs);
	};
	return res;
    },

    any: function(fun, list) {
	for (var i = 0, len = list.length; i < len; i++) {
            if (fun(list[i])) {
		return true;
	    }
	}
	return false;
    },

    all: function(fun, list) {
	for (var i = 0, len = list.length; i < len; i++) {
            if (!fun(list[i])) {
		return false;
	    }
	}
	return true;
    },

    or: function(list) {
	return this.any(function(el) {return el;}, list);
    },

    and: function(list) {
	return this.all(function(el) {return el;}, list);
    },

    // Y Combinator
    Y: function(le) {
	return function (f) {
            return f(f);
	}(function (f) {
            return le(function (x) {
		return f(f)(x);
            });
	});
    },

    /* list comprehensions */
    lc: function(expression) {
	var parsed = this._parse_lc(expression);
	var expr = parsed[1];
	var unbound = parsed[2]; //FIXME check if unbound is a list of elements
	var theList = parsed[3];
	try {
	    list = eval(theList);
	} catch (e) {
	    if (e instanceof ReferenceError) {
		throw new SyntaxError("SyntaxError: undefined list "+theList);
	    }
	}
	var result = new Array(list.length);
	for (var i = 0, len = list.length; i < len; i++) {
	    result[i] = eval(expr.replace(unbound, list[i]));
	}
	return result;
    },
    _parse_lc: function(expession) {
	var result = [];
	var re = /([A-Za-z0-9_()\[\],]+) for (\w+) in ([A-Za-z0-9_()\[\],]+)/;
	var match = re.exec(expession);
	if (! match) {
	    throw new SyntaxError("Invalid syntax: "+expession);
	}
	return match;
    },
    _isArray: function(el) {
	var s = typeof el;
	if (s === 'object') {
            if (el) {
		if (typeof el.length === 'number' &&
                    !el.propertyIsEnumerable('length') &&
                    typeof el.splice === 'function') {
                    return true;
		}
            }
	}
	return false;
    }
};
