TEST_DIR = test

VSN = 0.7.0

.PHONY: all

all: build

build: build.foo unittest.foo

build.foo: 
	rm build/*.*; \
	echo "var sgjs={version: '$(VSN)'};"     > build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.js       >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.fun.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.log.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgForms.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgHTML.js  >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sgGMaps.js  >> build/sgjs-$(VSN).js.txt;


unittest.foo: 
	echo "var sgjs={version: '$(VSN)'};"    > build/sg.unit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.js      >> build/sg.unit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.fun.js  >> build/sg.unit-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.unit.js >> build/sg.unit-$(VSN).js.txt;

lint:
	cd $(TEST_DIR) && $(MAKE) lint

test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)

clean: 
	rm build/*.*;
