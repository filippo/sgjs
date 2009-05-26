load("../lib/sgUtil.js");
load("../lib/sgLog.js");
load("../lib/sgUnit.js");

function test_log() {
  sgLog.msg("This is a test");
  return [sgUnit.assertEqual(typeof(sgLog.msg), 'function'),
	  sgUnit.assertEqual(sgLog.msg, print)];
}

sgUnit.run_tests([test_has_log]);

