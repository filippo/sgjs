TEST_DIR = test

VSN = 0.8.1

.PHONY: all

all: build

build: build.foo unittest.foo

build.foo: 
	rm build/*.*; \
	cat license_header.txt                   > build/sgjs-$(VSN).js.txt; \
	echo "var sgjs={version: '$(VSN)'};"    >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.js       >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.fun.js   >> build/sgjs-$(VSN).js.txt; \
	cat lib/sg.sjcl.js                      >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.log.js   >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.forms.js >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.html.js  >> build/sgjs-$(VSN).js.txt; \
	python tools/jsmin.py < lib/sg.gmaps.js >> build/sgjs-$(VSN).js.txt;


unittest.foo: 
	cat license_header_sgunit.txt           > build/sg.unit-$(VSN).js.txt; \
	echo "var sgjs={version: '$(VSN)'};"   >> build/sg.unit-$(VSN).js.txt; \
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
