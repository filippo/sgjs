/***********************************
File:    sgUtil.js
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
 * Trim method for strings: remove leading and triling spaces from a string
 * create the prototype on the String object. So you can use it like aString.trim()
 */
String.method('trim', function() {
		// remove leading and trailing whitespace
		// and return everything in between
		return this.replace(/^\s*(\b.*\b|)\s*$/, "$1");
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
