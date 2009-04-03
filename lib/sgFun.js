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

/*
 * Add 'method' method to Function types
 * Taken from "Javascript: The Good Parts"
 * by Douglas Crockford
 * ISBN: 987-0-596-51774-8
 */
Function.prototype.method = function(name, func) {
  if(!this.prototype[name]) {
    this.prototype[name]=func;
  }
};

/*
 * Add 'curry' method to Function types
 * Taken from "Javascript: The Good Parts"
 * by Douglas Crockford
 * ISBN: 987-0-596-51774-8
 */
Function.method('curry', function () {
		  var slice = Array.prototype.slice,
		  args = slice.apply(arguments),
		  that = this;
		  return function () {
		    return that.apply(null, args.concat(slice.apply(arguments)));
		  };
		});

/*
 * Add map method to Arrays
 */
Array.method('map', function(f) {
	       var res = [];
	       for (var i=0, len = this.length; i < len; i++) {
		 res[res.length] = f(this[i]);
	       }
	       return res;
	     });

/*
 * Add foldl and foldr method to Arrays
 */
Array.method('foldl', function(fun, acc) {
	       var result = acc;
	       for (var i = 0, len = this.length; i < len; i++) {
		 result = fun(this[i], result);
	       }
	       return result;
	     });

Array.method('foldr', function(fun, acc) {
	       var result = acc;
	       for (var i = this.length-1; i >= 0; i--) {
		 result = fun(this[i], result);
	       }
	       return result;
	     });

/*
 * Add filter method to Arrays
 */
Array.method('filter', function(fun) {
	       var result = [];
	       for (var i = 0, len = this.length; i < len; i++) {
		 if (fun(this[i])) {
		   result[result.length] = list[i];
		 }
	       }
	       return result;
	     });

/*
 * Add flatten method to Arrays.
 */
Array.method('flatten', function() {
	       var res = [];
	       for (var i=0, len=this.length; i<len; i++) {
		 if (is_array(this[i])) {
		   res = res.concat(this[i].flatten());
		 } else {
		   res[res.length] = this[i];
		 }
	       }
	       return res;
	     });

/*
 * sgFun module.
 * Implements a module with basic functional methods.
 */
var sgFun = function() {
  return {
    map: function(fun, list) {
      var res = [];
      if (is_array(list)) {
	res = list.map(fun);
      } else {
	for (field in list) {
	  res[i] = fun(list[field]);
	}
      }
      return res;
    },

    flatten: function(list) {
      return list.flatten();
    },

    foldl: function(fun, list, acc) {
      return list.foldl(fun, acc);
    },

    foldr: function(fun, list, acc) {
      return list.foldr(fun, acc);
    },

    filter: function(fun, list) {
      return list.filter(fun);
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
      var result = [];
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
    }
  };
}();
