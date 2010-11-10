load("../lib/sgUtil.js");
load("../lib/sgLog.js");
load("../lib/sgUnit.js");

function test_log() {
  var logMsg = "This is a test!";
  var res = sg.log.msg(logMsg);
  var res2 = sg.log.msg(logMsg);
  var res3 = sg.log.msg(logMsg);
  return [sg.unit.assertEqual(typeof(sg.log.msg), 'function'),
	  sg.unit.assertEqual(res, logMsg),
	  sg.unit.assertEqual(res2, logMsg),
	  sg.unit.assertEqual(res3, logMsg)];
}

sg.unit.run_tests([test_log]);

