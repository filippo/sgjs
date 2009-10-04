TESTS = test_sgUnit.js test_sgFun.js test_sgLog.js
TOLINT = ../lib/sgUtil.js ../lib/sgFun.js ../lib/sgLog.js ../lib/sgForms.js ../lib/sgHTML.js ../lib/sgGMaps.js ../lib/sgWidgets.js

all: lint test

test: ${TESTS}

lint: ${TOLINT}

../lib/%.js: lint.foo
	rhino jslint.js ../lib/$@

%.js: test.foo
	smjs -s $@

test.foo:
	echo "Running tests..."
	true;

lint.foo:
	echo "Running lint..."
