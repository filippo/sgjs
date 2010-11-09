/***********************************
File:    sg.unit.js
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
/*jslint forin: true  */
sg.unit = Object.create(sg);
sg.unit.extend('assertEqual',
	       function(v1, v2) {
		   try {
		       if (typeof(v1) === 'object') {
			   this.assertEqual(v1.length, v2.length);
			   if (is_array(v1)) {
			       for (var i=0; i<v1.length; i++) {
				   this.assertEqual(v1[i], v2[i]);
			       }
			   } else {
			       for (var j in v1) {
				   this.assertEqual(v1[j], v2[j]);
			       }
			   }
		       } else {
			   if (v1!=v2) {
			       throw new this.AssertionError("different");
			   } else {
			       return true;
			   }
		       }
		       return true;
		   } catch(e) {
		       throw new this.AssertionError("expected "+v2+" got "+v1);
		   }
	       });

sg.unit.extend('assertNotEqual', 
	       function(v1, v2) {
		   try {
		       if (typeof(v1) === 'object') {
			   try {
			       this.assertEqual(v1, v2);
			       throw new this.AssertionError("equal");
			   } catch(e) {
			       if (e instanceof this.AssertionError) {
				   return true;
			       }
			       throw e;
			   }
		       } else {
			   if (v1!=v2) {
			       return true;
			   } else {
			       throw new this.AssertionError("qual");
			   }
		       }
		       return true;
		   } catch(e2) {
		       throw new this.AssertionError("expected "+v1+" != "+v2);}
	       });

sg.unit.extend('run_test', 
	       function(t) {
		   var msg = "[pass]Running :";
		   var errMsg;
		   try {
		       t();
		       return "[pass]  ... "+t.name;
		   } catch (e) {
		       errMsg = "[error] ... "+t.name+"(";
		       if (t['arguments']) {
			   errMsg += t['arguments'];
		       }
		       errMsg += ")"+": "+e.message;
		       return errMsg;
		   }
	       });

sg.unit.extend('run_tests',
	       function(testList, resId) {
		   for (var i=0, len = testList.length; i < len; i++) {
		       if (typeof window === 'undefined') {
			   // print test result on the console
			   this._toConsole(testList[i], resId);
		       } else {
			   // fill resId element with test result
			   this._toBrowser(testList[i], resId);
		       }
		   }
	       });

sg.unit.extend('_id', 
	       function (elId) {
		   return document.getElementById(elId);
	       });

sg.unit.extend('_toBrowser', 
	       function(test, resId) {
		   this._id(resId).innerHTML += "<br>" + this.run_test(test);
	       });

sg.unit.extend('_toConsole', 
	       function(test, foo) {
		   print(this.run_test(test));
	       });

sg.unit.extend('AssertionError', 
	       function(message) {
		   this.message = message;
		   this.name = "AssertionError";
	       });

