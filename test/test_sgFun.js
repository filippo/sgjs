load("../lib/sgUtil.js");
load("../lib/sgUnit.js");
load("../lib/sgFun.js");
/*
 * test object augmentations
 */
function test_array_forEach() {
    var a = [1,2,3,4,5];
    var square = function(x, index, array) {array[index] = x*x;};
    a.forEach(square);
    return sg.unit.assertEqual(a, [1,4,9,16,25]);
}
function test_array_map() {
  var square = function(x) {return x*x;};
  var res = [1,2,3,4,5].map(square);
  return sg.unit.assertEqual(res, [1,4,9,16,25]);
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
  return [sg.unit.assertEqual(r1, sum),
	  sg.unit.assertEqual(r2, sum),
	  sg.unit.assertEqual(r3, product),
	  sg.unit.assertEqual(r4, product)];
}

function test_array_filter() {
  var res = [1,2,3,4,5,6,7].filter(function(x) {return x>3;});
  return sg.unit.assertEqual(res, [4,5,6,7]);
}

function test_array_flatten() {
  var res = [1,[2,[3,4],5],6,[7]].flatten();
  return sg.unit.assertEqual(res, [1,2,3,4,5,6,7]);
}

function test_array_all_any() {
  var res1 = [1,2,3,4].any(function(x) {return x>3;}); //true
  var res2 = [1,2,3,4].any(function(x) {return x>4;}); //false
  var res3 = [1,2,3,4].all(function(x) {return x<5;}); //true
  var res4 = [1,2,3,4].all(function(x) {return x<4;}); //false
  return [sg.unit.assertEqual(res1, true),
	  sg.unit.assertEqual(res2, false),
	  sg.unit.assertEqual(res3, true),
	  sg.unit.assertEqual(res4, false)];
}

function test_map() {
  var doubleF = function(x) {return 2*x;};
  var res = sg.fun.map(doubleF, [1,2,3,4]);
  var res2 = [1,2,3,4].map(doubleF);
  return [sg.unit.assertEqual(res, res2),
	  sg.unit.assertEqual(res, [2,4,6,8]),
	  sg.unit.assertEqual(res2, [2,4,6,8])];
}

function test_filter() {
  var res = sg.fun.filter(function(x) {return x>2;}, [1,2,3,4]);
  return sg.unit.assertEqual(res, [3,4]);
}

function test_flatten() {
  var res = sg.fun.flatten([1,[2,[3,4],5],6,[7]]);
  return sg.unit.assertEqual(res, [1,2,3,4,5,6,7]);
}

function test_zip() {
  var res1 = sg.fun.zip([1,2,3], [4,5,6], [7,8,9]);
  var res2 = sg.fun.zip([1,2,3], [4], [5,6]);
  return [sg.unit.assertEqual(res1, [[1,4,7],[2,5,8],[3,6,9]]),
	  sg.unit.assertEqual(res2, [[1,4,5],[2,undefined,6],[3,undefined,undefined]])
	 ];
}

function test_partial() {
  var adder = function(a,b) {return a + b;};
  var add1 = sg.fun.partial(adder, 1);
  return [sg.unit.assertEqual(add1(0), 1),
	  sg.unit.assertEqual(add1(4), 5),
	  sg.unit.assertEqual(add1(100), 101),
	  sg.unit.assertEqual(add1(9999), 10000)];
}

function test_folds() {
  var res = sg.fun.foldl(function(x, acc) {return acc+x;}, [1,2,3,4], 0);
  var res2 = sg.fun.foldl(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  var res3 = sg.fun.foldr(function(x, acc) {return acc-x;}, [1,2,3,4], 0);
  return [sg.unit.assertEqual(res, 10),
	  sg.unit.assertEqual(res2, -10),
          sg.unit.assertEqual(res3, -10)];
}

function test_lc() {
  /* list comprehension */
  var incr = function(x) {
    return x+1;
  };
  var is_odd = function(x) {
    return (x%2) == 1;
  };
  var res1 = sg.fun.lc({'do': incr, 'in': [1,2,3,4,5]});
  var res2 = sg.fun.lc({'do': incr, 'in': [1,2,3,4,5], 'if': is_odd});
  return [sg.unit.assertEqual(res1, [2,3,4,5,6]),
	  sg.unit.assertEqual(res2, [2,4,6])];
}

sg.unit.run_tests([test_array_forEach,
		   test_array_map,
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

