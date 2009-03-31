load("../lib/sgUtil.js");
load("../lib/sgUnit.js");
load("../lib/sgFun.js");

function test_map() {
  var doubleF = function(x) {return 2*x;};
  var res = sgFun.map(doubleF, [1,2,3,4]);
  var res2 = [1,2,3,4].map(doubleF);
  return [sgUnit.assertEqual(res, res2),
	  sgUnit.assertEqual(res, [2,4,6,8]),
	  sgUnit.assertEqual(res2, [2,4,6,8])];
}

function test_filter() {
  var res = sgFun.filter(function(x) {return x>2;}, [1,2,3,4]);
  return sgUnit.assertEqual(res, [3,4]);
}

function test_folds() {
  var res = sgFun.foldl(function(x, acc) {return acc+x;}, [1,2,3,4], 0);
  var res2 = sgFun.foldl(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  var res3 = sgFun.foldr(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  return [sgUnit.assertEqual(res, 10),
	  sgUnit.assertEqual(res2, -10),
          sgUnit.assertEqual(res3, -10)];
}

sgUnit.run_tests([test_map, test_folds, test_filter]);

