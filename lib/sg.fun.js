/***********************************
File:    sg.fun.js
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
 * sg.fun module.
 * Implements a module with basic functional methods.
 */
sg.fun = Object.create(sg);
sg.fun.extend('map', 
	      function(f, list) {
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
	      });
sg.fun.extend('flatten', function(list) {return list.flatten();});
sg.fun.extend('foldl', function(f, list, acc) {return list.foldl(f, acc);});
sg.fun.extend('foldr', function(f, list, acc) {return list.foldr(f, acc);});
sg.fun.extend('filter', function(f, list) {return list.filter(f);});
sg.fun.extend('partial',
	      function(f) {

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
	      });
sg.fun.extend('any', function(f, list) {return list.any(f);});
sg.fun.extend('all', function(f, list) {return list.all(f);});
sg.fun.extend('or', 
	      function(list) {
		  return this.any(function(el) {return el;}, list);
	      });
sg.fun.extend('and', 
	      function(list) {
		  return this.all(function(el) {return el;}, list);
	      });
sg.fun.extend('zip',
	      function() {
		  var slice = Array.prototype.slice;
		  var args = slice.apply(arguments);
		  var nargs = args.length;
		  var n = Math.max.apply(null, sg.fun.map(function(x) {return x.length;}, args));
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
	      });

// Y Combinator
sg.fun.extend('Y', 
	      function(le) {
		  return function (f) {
		      return f(f);
		  }(function (f) {
			return le(function (x) {
				      return f(f)(x);
				  });
		    });
	      });

// list comprehensions
sg.fun.extend('lc', 
	      function(lcObj) {
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
	      });

