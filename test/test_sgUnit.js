load("../lib/sg.js");
load("../lib/sg.unit.js");

function test_equal() {
   return [sg.unit.assertEqual(10, 10),
           sg.unit.assertEqual(10, parseInt("10", 10)),
           sg.unit.assertEqual("a string", "a string"),
	   sg.unit.assertEqual([1,2,3], [1,2,3])];
}

function test_not_equal() {
   return [sg.unit.assertNotEqual(10, 11),
           sg.unit.assertNotEqual(1, parseInt("10", 10)),
           sg.unit.assertNotEqual("a string", "a different string"),
	   sg.unit.assertNotEqual([1,2,3], [1,2,4])];
}


sg.unit.run_tests([test_equal, test_not_equal]);

