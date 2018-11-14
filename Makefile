all: build

init:
	npm install

clean:
	rm -rf node_modules
	npm install

build:
	grunt
