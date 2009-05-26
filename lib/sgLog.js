var sgLog = function() {
  return {
    msg: function() {
      var res = undefined;
      if (print) {
	res = print;
      } else if (console && console.log) {
	res = console.log;
      } else if (alert) {
	res = alert;
      }
      return res;
    }()
  };
}();