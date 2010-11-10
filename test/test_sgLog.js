load("../lib/sgUtil.js");
load("../lib/sgLog.js");
load("../lib/sgUnit.js");

function test_log() {
  var logMsg = "This is a test!";
  var res = sgLog.msg(logMsg);
  return [sg.unit.assertEqual(typeof(sgLog.msg), 'function'),
	  sg.unit.assertEqual(res, logMsg)];
}

sg.unit.run_tests([test_log]);

