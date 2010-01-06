TESTS = test_sgUnit.js test_sgFun.js test_sgLog.js
TOLINT = ../lib/*.js

all: lint test

test: ${TESTS}

lint: ${TOLINT}

../lib/%.js: lint.foo
	rhino jslint.js $@

%.js: test.foo
	smjs -s $@

test.foo:
	echo "Running tests..."
	true;

lint.foo:
	echo "Running lint..."
