var sgHTML = {
  parseKVPairs: function(kvStr, sep) {
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
  },
/**
Usage Example:
URL:http://example.com/?ciao=1&&pippo=2&pluto[]=ciao&pluto[]=riciao&aaa[1]=10
js> args=sgHTML.parseQueryStr()
js> print(args.toJSONString())
{"ciao":"1","pippo":"2","pluto":["ciao","riciao"],"aaa":["10"]}

Note: the query string can also be passed directly to the function. E.g.
args=sgHTML.parseQueryStr('ciao=1&&pippo=2&pluto[]=ciao&pluto[]=riciao&aaa[1]=10')
js> print(args.toJSONString())
{"ciao":"1","pippo":"2","pluto":["ciao","riciao"],"aaa":["10"]}
**/
  parseQueryStr: function(queryStr) {
    var qstr = queryStr || location.search.substr(1);
    return this.parseKVPairs(qstr, '&');
  },

  toggleClass: function(el, className) {
    if(typeof el=='string')
      var elRef = document.getElementById(el);
    else if(typeof el == 'object')
      var elRef = el;

    var current = elRef.className.split(' ');
    var newClass = [];
    var done = false;
    for (var i = 0, len = current.length; i < len; i++) {
      if (current[i] == className)
	done = true;
      else
	newClass[newClass.length] = current[i];
    }
    if (!done)
      	newClass[newClass.length] = className;
    elRef.className = newClass.join(" ");
  },
  roll: this.toggleClass //alias x toggleClass
};


function _each(a, f) {
    for(var i=0, l=a.length; i<l; i++)
	f(a[i])
};

_each('a big blockquote br b center code div em form h1 h2 h3 h4 h5 h6 hr img iframe input i li ol option pre p script select small span strong style sub sup table tbody td textarea tr ul u'.split(' '),
    function(label){
        sgHTML[label]=function(){
            var tag=document.createElement(label);
            _each(arguments, function(arg){
                if(arg.nodeType)
		    tag.appendChild(arg);
                else if(typeof arg=='string' || typeof arg=='number')
		    tag.innerHTML+=arg;
                else for(var attr in arg){
                        if(attr=='style')
			    for(var sty in arg[attr])
				tag[attr][sty]=arg[attr][sty];
                        else
			    tag[attr]=arg[attr];
                };
            });
            return tag;
        };
    });