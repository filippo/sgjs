TEST_DIR = test

VSN = 0.3

.PHONY: all

all: build

build: build.foo

build.foo: 
	rm build/*.js; \
	python tools/jsmin.py < lib/sgFun.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgForms.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgHTML.js  >> build/sgjs-$(VSN).js.txt;


test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)