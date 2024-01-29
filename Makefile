HUGOMODULE=hugo-fork
H=./hugo

submodules:
	git submodule update --init --remote

build-hugo: submodules
	cd ${HUGOMODULE}; go build; cp hugo ..;

serve: build-hugo
	${H} serve

production: clean
	${H} --minify

clean:
	rm -rf public
