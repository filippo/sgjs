TEST_DIR = test

.PHONY: all

all: test


test: test.foo

test.foo:
	cd $(TEST_DIR) && $(MAKE)