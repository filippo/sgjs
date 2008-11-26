var sgUnit = {
  assertEqual: function(v1, v2) {
    try {
      if (typeof(v1) == 'object') {
	this.assertEqual(v1.length, v2.length);
	if (this._isArray(v1)) {
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
	  throw "diferent";
	} else {
	  return true;
	}
      }
      return true;
    } catch(e) {
      throw new this.AssertionError("expected "+v2+" got "+v1);}
  },

  run_test: function(t) {
    var msg = "[pass]Running :";
    try {
      t();
      return "[pass]  ... "+t.name;
    } catch (e) {
      errMsg = "[error] ... "+t.name+"(";
      if (t.arguments) {
	errMsg += t.arguments;
      }
      errMsg += ")"+": "+e.message;
      return errMsg;
    }
  },

  run_tests: function(testList, resId) {
    for (var i=0, len = testList.length; i < len; i++) {
      if (typeof window === 'undefined') {
	// print test result on the console
	this._toConsole(testList[i], resId);
      } else {
	// fill resId element with test result
	this._toBrowser(testList[i], resId);
      }
    }
  },

  // Internal functions
  _id: function (elId) {
    return document.getElementById(elId);
  },

  _toBrowser: function(test, resId) {
    this._id(resId).innerHTML += "<br>" + this.run_test(test);
  },
  _toConsole: function(test, foo) {
    print(this.run_test(test));
  },

  AssertionError: function(message) {
    this.message = message;
    this.name = "AssertionError";
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
