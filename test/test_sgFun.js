load("../lib/sgUnit.js");
load("../lib/sgFun.js");

function test_map() {
  res = sgFun.map(function(x) {return 2*x;}, [1,2,3,4]);
  return sgUnit.assertEqual(res, [2,4,6,8]);
}

function test_filter() {
  res = sgFun.filter(function(x) {return x>2;}, [1,2,3,4]);
  return sgUnit.assertEqual(res, [3,4]);
}

function test_folds() {
  res = sgFun.foldl(function(x, acc) {return acc+x;}, [1,2,3,4], 0);
  res2 = sgFun.foldl(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  res3 = sgFun.foldr(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  return [sgUnit.assertEqual(res, 10),
	  sgUnit.assertEqual(res2, -10),
          sgUnit.assertEqual(res3, -10)];
}

sgUnit.run_tests([test_map, test_folds, test_filter]);

