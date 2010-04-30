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
2008-2010 S.G. Consulting srl. All Rights Reserved.

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
		  var slice = Array.prototype.slice, // get the slice function from array
		  args = slice.apply(arguments),     // it's needed to convert aruments to a proper Array object
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

	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }

	       for (var i=0, len = this.length; i < len; i++) {
		 res[res.length] = f(this[i]);
	       }
	       return res;
	     });

/*
 * Add foldl and foldr method to Arrays
 */
Array.method('foldl', function(f, acc) {
	       var result = acc;

	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }

	       for (var i = 0, len = this.length; i < len; i++) {
		 result = f(this[i], result);
	       }
	       return result;
	     });

Array.method('foldr', function(f, acc) {
	       var result = acc;

	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }

	       for (var i = this.length-1; i >= 0; i--) {
		 result = f(this[i], result);
	       }
	       return result;
	     });

/*
 * Add filter method to Arrays
 */
Array.method('filter', function(f) {
	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }
	       var result = [];
	       for (var i = 0, len = this.length; i < len; i++) {
		 if (f(this[i])) {
		   result[result.length] = this[i];
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
 * Add any method to Arrays.
 * Tests whether some element in the array passes the test
 * implemented by the provided function f.
 */
Array.method('any', function(f) {
	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }
	       for (var i = 0, len = this.length; i < len; i++) {
		 if (f(this[i])) {
		   return true;
		 }
	       }
	       return false;
	     });

/*
 * Add all method to Arrays.
 * Tests whether all elements in the array passes the test
 * implemented by the provided function f.
 */
Array.method('all', function(f) {
	       if (typeof f != "function") {
		 throw new TypeError("TypeError: f is not a function");
	       }
	       for (var i = 0, len = this.length; i < len; i++) {
		 if (!f(this[i])) {
		   return false;
		 }
	       }
	       return true;
	     });

/*
 * sgFun module.
 * Implements a module with basic functional methods.
 */
var sgFun = function() {
  return {
    map: function(f, list) {
      var res = [];
      if (is_array(list)) {
	res = list.map(f);
      } else {
	for (field in list) {
	  if (list.hasOwnProperty(field)) {
	    res[i] = f(list[field]);
	  }
	}
      }
      return res;
    },

    flatten: function(list) {
      return list.flatten();
    },

    foldl: function(f, list, acc) {
      return list.foldl(f, acc);
    },

    foldr: function(f, list, acc) {
      return list.foldr(f, acc);
    },

    filter: function(f, list) {
      return list.filter(f);
    },

    partial: function(f) {

      if (typeof f != "function") {
	throw new TypeError("TypeError: f is not a function");
      }

      var slice = Array.prototype.slice;
      var fixed = slice.apply(arguments);
      fixed.splice(0,1);
      var res = function() {
	var newargs = slice.apply(arguments);
	var allargs = fixed.concat(newargs);
	return f.apply(null, allargs);
      };
      return res;
    },

    any: function(f, list) {
      return list.any(f);
    },

    all: function(f, list) {
      return list.all(f);
    },

    or: function(list) {
      return this.any(function(el) {return el;}, list);
    },

    and: function(list) {
      return this.all(function(el) {return el;}, list);
    },

    zip: function() {
      var slice = Array.prototype.slice;
      var args = slice.apply(arguments);
      var nargs = args.length;
      var n = Math.max.apply(null, sgFun.map(function(x) {return x.length;}, args));
      var res = [];
      var i,j;

      /* check arguments */
      for (j = 0; j < nargs; j++) {
        if (!is_array(arguments[j])) {
	  throw new TypeError("TypeError: '"+arguments[j]+"' is not an Array");
	}
      }

      for (i = 0; i < n; i++) {
	var tmp = [];
	for (j = 0; j < nargs; j++) {
	  tmp[tmp.length] = args[j][i];
	}
	res[i] = tmp;
      }
      return res;
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
    lc: function(lcObj) {
      var funArg  = lcObj['do'];
      var theList = lcObj['in'];
      var test    = lcObj['if'];
      if (typeof funArg != "function") {
	throw new TypeError("TypeError: 'do' is not a function");
      }
      if (!is_array(theList)) {
	throw new TypeError("TypeError: 'in' is not an Array");
      }
      if (test !== undefined && typeof test != "function") {
	throw new TypeError("TypeError: 'if' is not a function");
      }
      var result = [];
      for (var i = 0, len = theList.length; i < len; i++) {
	if (test===undefined) {
	  result[result.length] = funArg(theList[i]);
	} else if (test(theList[i])) {
	  result[result.length] = funArg(theList[i]);
	}
      }
      return result;
    }
  };
}();
