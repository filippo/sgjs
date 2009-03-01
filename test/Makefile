TESTS = test_sgUnit.js test_sgFun.js
TOLINT = ../lib/sgFun.js ../lib/sgForms.js ../lib/sgHTML.js

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
