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