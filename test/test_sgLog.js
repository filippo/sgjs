load("../lib/sgUtil.js");
load("../lib/sgLog.js");
load("../lib/sgUnit.js");

function test_log() {
  var logMsg = "This is a test!";
  var res = sgLog.msg(logMsg);
  return [sgUnit.assertEqual(typeof(sgLog.msg), 'function'),
	  sgUnit.assertEqual(res, logMsg)];
}

sgUnit.run_tests([test_log]);

