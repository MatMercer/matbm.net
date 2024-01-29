HUGOMODULE=hugo-fork
H=./hugo

serve: hugo
	${H} serve


submodules:
ifeq (,$(wildcard hugo-fork/LICENSE))
	git submodule update --init --remote
endif

hugo: submodules
ifeq (,$(wildcard hugo))
	cd ${HUGOMODULE}; go build; cp hugo ..;
endif

production: clean
	${H} --minify

clean:
	rm -rf public
