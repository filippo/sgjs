TEST_DIR = test

VSN = 0.5.4

.PHONY: all

all: build

build: build.foo unittest.foo

build.foo: 
	rm build/*.*; \
	echo "var sgjs={version: '$(VSN)'};"    > build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgUtil.js  >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgFun.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgLog.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgForms.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgHTML.js  >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgGMaps.js  >> build/sgjs-$(VSN).js.txt;


unittest.foo: 
	echo "var sgjs={version: '$(VSN)'};"    > build/sgunit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgUtil.js  >> build/sgunit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgFun.js   >> build/sgunit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgUnit.js  >> build/sgunit-$(VSN).js.txt;

lint:
	cd $(TEST_DIR) && $(MAKE) lint

test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)

clean: 
	rm build/*.*;
