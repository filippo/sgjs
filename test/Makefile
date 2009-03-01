TESTS = test_sgUnit.js test_sgFun.js

all: test

test: ${TESTS}

%.js: test.foo
	smjs -s $@

test.foo:
	true;