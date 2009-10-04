/***********************************
File:    sgLog.js
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

var sgLog = function() {
  return {
    msg: function() {
      var res = undefined;
      if (typeof(window) !== "undefined" && window.console && window.console.log) {
	// called in a browser with firebug installed
	res = function (x) {console.log(x); return x;};
      } else if (typeof(window) !== "undefined" && window.alert) {
	// called in a browser (use window.alert)
	res = function (x) {window.alert(x); return x;};
      } else if (typeof(window) === "undefined" && print) {
	// called from command line
	res = function (x) {print(x); return x;};
      } else {
	// fallback to a function f(x) -> x
	res = function(x) {return x;};
      }
      return res;
    }()
  };
}();