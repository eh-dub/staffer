compile:
	cd src && flow;
	cd src/es6 && babel --no-comments -d ../../tests/lib -l flow *.es6;

test:
	node --harmony tests/bootstrap.js;
