TEST_DIR = test

.PHONY: all

all: build

build: build.foo

build.foo: 
	rm build/*.js; \
	python tools/jsmin.py < lib/sgFun.js   >> build/sgjs.js; \
	python tools/jsmin.py < lib/sgForms.js >> build/sgjs.js; \
	python tools/jsmin.py < lib/sgHTML.js  >> build/sgjs.js;


test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)