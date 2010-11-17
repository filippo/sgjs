/***********************************
File:    sg.js
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
 * is_array function
 * Taken from "Javascript: The Good Parts"
 * by Douglas Crockford
 * ISBN: 987-0-596-51774-8
 */
var is_array = function(value) {
  return Object.prototype.toString.apply(value) === '[object Array]';
};

/*
 * Object create method.
 * Creates a new object that uses an old object as its prototype.
 * from "Javascript: The Good Parts"
 * by Douglas Crockford
 * ISBN: 987-0-596-51774-8
 */
if (typeof Object.create !== 'function') {
  Object.create = function(oldObj) {
    var F = function(){};
    F.prototype = oldObj;
    return new F();
  };
}

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
 * Trim method for strings: remove leading and trailing spaces from a string
 * create the prototype on the String object. So you can use it like aString.trim()
 */
String.method('trim', function() {
		// remove leading and trailing whitespace
		// and return everything in between
		return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
	      });

/*
 * Left Trim method for strings: remove leading spaces from a string
 * create the prototype on the String object. So you can use it like aString.ltrim()
 */
String.method('ltrim', function() {
		// remove leading whitespace from a string
		return this.replace(/^\s*(\b.*\b|)/, "$1");
	      });

/*
 * Right Trim method for strings: remove trailing spaces from a string
 * create the prototype on the String object. So you can use it like aString.rtrim()
 */
String.method('rtrim', function() {
		// remove trailing whitespace from a string
		return this.replace(/(\b.*\b|)\s*$/, "$1");
	      });

/*
 * isEmpty method for strings. Check if a string is empty or contains only spaces
 * create the prototype on the String object. So you can use it like aString.is_empty()
 */
String.method('is_empty', function() {
		if (this.length === 0 || this.trim() === "") {
		  return true;
		} else {
		  return false;
		}
	      });

/*
 *  Internet Explorer doesn't have the indexOf method in Arrays.
 *  The function below fixes this.
 */
Array.method('indexOf', function(obj){
	       for(var i=0; i<this.length; i++){
		 if(this[i]==obj){
		   return i;
		 }
	       }
	       return -1;
	     });

/*
 *  Internet Explorer doesn't have the forEach method in Arrays.
 *  The function below fixes this. From:
 *  https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */
Array.method('forEach', function(fun /*, thisp */){
		 //"use strict";
		 if (this === undefined || this === null) {
		     throw new TypeError();		     
		 }

		 var t = Object(this);
		 var len = t.length >>> 0;
		 if (typeof fun !== "function") {
		     throw new TypeError();		     
		 }

		 var thisp = arguments[1];
		 for (var i = 0; i < len; i++) {
		     if (i in t) {
			 fun.call(thisp, t[i], i, t);
		     }
		 }
	     });


/*
 * Functional programming stuff 
 */

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
		 var len = this.length >>> 0;

		 if (typeof f != "function") {
		     throw new TypeError("TypeError: f is not a function");
		 }

		 var res = new Array(len);

		 for (var i=0; i < len; i++) {
		     res[i] = f(this[i]);
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

		 var len = this.length >>> 0;
		 var result = [];
		 for (var i = 0; i < len; i++) {
		     var val = this[i]; // in case f mutates the val
		     if (f(val)) {
			 result[result.length] = val;
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

var sg = function(){
    return {
	'extend': function(name, func) {
	    if(!this[name]) {
		this[name]=func;
	    }
	    return this;
	},
	'replace': function(name, func) {
	    this[name] = func;
	    return this;
	}
    };
}();
