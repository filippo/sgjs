TEST_DIR = test

VSN = 0.5.3

.PHONY: all

all: build

build: build.foo

build.foo: 
	rm build/*.*; \
	echo "var sgjs={version: '$(VSN)'};"    > build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgUtil.js  >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgFun.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgLog.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgForms.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgWidgets.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgHTML.js  >> build/sgjs-$(VSN).js.txt;


lint:
	cd $(TEST_DIR) && $(MAKE) lint

test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)

clean: 
	rm build/*.*;
