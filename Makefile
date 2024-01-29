serve:
	./hugo/hugo serve
production:
	hugo --minify
clean:
	rm -rf public
