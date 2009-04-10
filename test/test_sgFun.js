load("../lib/sgUtil.js");
load("../lib/sgUnit.js");
load("../lib/sgFun.js");
/*
 * test object augmentations
 */
function test_array_map() {
  var square = function(x) {return x*x;};
  var res = [1,2,3,4,5].map(square);
  return sgUnit.assertEqual(res, [1,4,9,16,25]);
}

function test_array_fold() {
  var add = function(a,b) {return a+b;};
  var mult = function(a,b) {return a*b;};
  var r1 = [1,2,3,4,5].foldl(add,0);
  var r2 = [1,2,3,4,5].foldr(add,0);
  var r3 = [1,2,3,4,5].foldl(mult,1);
  var r4 = [1,2,3,4,5].foldr(mult,1);
  var sum = 15;
  var product = 120;
  return [sgUnit.assertEqual(r1, sum),
	  sgUnit.assertEqual(r2, sum),
	  sgUnit.assertEqual(r3, product),
	  sgUnit.assertEqual(r4, product)];
}

function test_array_filter() {
  var res = [1,2,3,4,5,6,7].filter(function(x) {return x>3;});
  return sgUnit.assertEqual(res, [4,5,6,7]);
}

function test_array_flatten() {
  var res = [1,[2,[3,4],5],6,[7]].flatten();
  return sgUnit.assertEqual(res, [1,2,3,4,5,6,7]);
}

function test_array_all_any() {
  var res1 = [1,2,3,4].any(function(x) {return x>3;}); //true
  var res2 = [1,2,3,4].any(function(x) {return x>4;}); //false
  var res3 = [1,2,3,4].all(function(x) {return x<5;}); //true
  var res4 = [1,2,3,4].all(function(x) {return x<4;}); //false
  return [sgUnit.assertEqual(res1, true),
	  sgUnit.assertEqual(res2, false),
	  sgUnit.assertEqual(res3, true),
	  sgUnit.assertEqual(res4, false)];
}

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

function test_flatten() {
  var res = sgFun.flatten([1,[2,[3,4],5],6,[7]]);
  return sgUnit.assertEqual(res, [1,2,3,4,5,6,7]);
}

function test_zip() {
  var res1 = sgFun.zip([1,2,3], [4,5,6], [7,8,9]);
  var res2 = sgFun.zip([1,2,3], [4], [5,6]);
  return [sgUnit.assertEqual(res1, [[1,4,7],[2,5,8],[3,6,9]]),
	  sgUnit.assertEqual(res2, [[1,4,5],[2,undefined,6],[3,undefined,undefined]])
	 ];
}

function test_partial() {
  var adder = function(a,b) {return a + b;};
  var add1 = sgFun.partial(adder, 1);
  return [sgUnit.assertEqual(add1(0), 1),
	  sgUnit.assertEqual(add1(4), 5),
	  sgUnit.assertEqual(add1(100), 101),
	  sgUnit.assertEqual(add1(9999), 10000)];
}

function test_folds() {
  var res = sgFun.foldl(function(x, acc) {return acc+x;}, [1,2,3,4], 0);
  var res2 = sgFun.foldl(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  var res3 = sgFun.foldr(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  return [sgUnit.assertEqual(res, 10),
	  sgUnit.assertEqual(res2, -10),
          sgUnit.assertEqual(res3, -10)];
}

function test_lc() {
  /* list comprehension */
  var incr = function(x) {
    return x+1;
  };
  var is_odd = function(x) {
    return (x%2) == 1;
  };
  var res1 = sgFun.lc({'do': incr, 'in': [1,2,3,4,5]});
  var res2 = sgFun.lc({'do': incr, 'in': [1,2,3,4,5], 'if': is_odd});
  return [sgUnit.assertEqual(res1, [2,3,4,5,6]),
	  sgUnit.assertEqual(res2, [2,4,6])];
}

sgUnit.run_tests([test_array_map,
		  test_array_fold,
		  test_array_filter,
		  test_array_flatten,
		  test_array_all_any,
		  test_map,
		  test_zip,
		  test_partial,
		  test_folds,
		  test_flatten,
		  test_filter,
		  test_lc]);

