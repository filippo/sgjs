load("../lib/sgUtil.js");
load("../lib/sgUnit.js");

function test_equal() {
   return [sgUnit.assertEqual(10, 10),
           sgUnit.assertEqual(10, parseInt("10", 10)),
           sgUnit.assertEqual("a string", "a string"),
	   sgUnit.assertEqual([1,2,3], [1,2,3])];
}

function test_not_equal() {
   return [sgUnit.assertNotEqual(10, 11),
           sgUnit.assertNotEqual(1, parseInt("10", 10)),
           sgUnit.assertNotEqual("a string", "a different string"),
	   sgUnit.assertNotEqual([1,2,3], [1,2,4])];
}


sgUnit.run_tests([test_equal, test_not_equal]);

