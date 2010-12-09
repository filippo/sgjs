/***********************************
File:    sg.html.js
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

sg.html = Object.create(sg);
sg.html.extend('parseKVPairs', 
	       function(kvStr, sep) {
		   var dict = {};
		   var pairs = kvStr.split(sep);
		   for(var i=0, len=pairs.length; i<len; i++) {
		       var kv = pairs[i].split('=');
		       //look for brackets []
		       open = kv[0].indexOf('[');
		       close = kv[0].indexOf(']', open);
		       if(open !== -1 && close !== -1) {
			   var key = kv[0].substr(0, open);
			   dict[key] = dict[key] || [];
			   if(open+1 === close) {
			       dict[key][dict[key].length] = kv[1];
			   } else {
			       idx = kv[0].substr(open+1, (close-(open+1)));
			       dict[key][idx] = kv[1];
			   }
		       } else {
			   dict[kv[0]] = kv[1];
		       }
		   }
		   return dict;
	       });

/**
Usage Example:
URL:http://example.com/?ciao=1&&pippo=2&pluto[]=ciao&pluto[]=riciao&aaa[1]=10
js> args=sg.html.parseQueryStr()
js> print(args.toJSONString())
{"ciao":"1","pippo":"2","pluto":["ciao","riciao"],"aaa":["10"]}

Note: the query string can also be passed directly to the function. E.g.
args=sg.html.parseQueryStr('ciao=1&&pippo=2&pluto[]=ciao&pluto[]=riciao&aaa[1]=10')
js> print(args.toJSONString())
{"ciao":"1","pippo":"2","pluto":["ciao","riciao"],"aaa":["10"]}
**/
sg.html.extend('parseQueryStr', 
	       function(queryStr) {
		   var qstr = queryStr || location.search.substr(1);
		   return this.parseKVPairs(qstr, '&');
	       });

sg.html.extend('byId', 
	       function(el) {
		   var elRef = null;
		   if(typeof el==='string') {
		       elRef = document.getElementById(el);
		   } else if(typeof el === 'object') {
		       elRef = el;
		   }
		   return elRef;
	       });

sg.html.extend('toggleClass', 
	      function(el, className) {
		  var elRef = this.byId(el);

		  var current = elRef.className.split(' ');
		  var newClass = [];
		  var done = false;
		  for (var i = 0, len = current.length; i < len; i++) {
		      if (current[i] === className) {
			  done = true;
		      } else {
			  newClass[newClass.length] = current[i];
		      }
		  }
		  if (!done) {
		      newClass[newClass.length] = className;
		  }
		  elRef.className = newClass.join(" ");
	      });

//toggleClass alias 
sg.html.extend('roll', 
	       function(el, className) {
		   this.toggleClass(el, className);
	       });
sg.html.extend('html', 
	       function(el, htmlStr) {
		   var elRef = this.byId(el);
		   elRef.innerHTML = htmlStr;
	       });

//method used for email obfuscation
sg.html.extend('email', 
	       function(beforeAt, afterAt, extension) {
		   return beforeAt+'@'+afterAt+'.'+extension;
	       });

function _each(a, f) {
  for(var i=0, l=a.length; i<l; i++) {
    f(a[i]);
  }
}

_each('a big blockquote br b center code div em form h1 h2 h3 h4 h5 h6 hr img iframe input i li ol option pre p script select small span strong style sub sup table tbody td textarea tr ul u'.split(' '),
    function(label){
        sg.html[label]=function(){
            var tag=document.createElement(label);
            _each(arguments, function(arg){
                if(arg.nodeType) {
		  tag.appendChild(arg);
		} else if(typeof arg=='string' || typeof arg=='number') {
		  tag.innerHTML+=arg;
		} else {
		  for(var i = 0, len = arg.length; i < len; i++){
		    var attr = arg[i];
                    if(attr=='style') {
		      var styleList = arg[attr];
		      for(var j = 0, len2 = styleList.length; j < len2; j++){
			var sty = styleList[j];
			tag[attr][sty]=styleList[sty];
		      }
		    } else {
		      tag[attr]=arg[attr];
		    }
                  }
		}
            });
            return tag;
        };
    });