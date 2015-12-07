setup:
	npm install

watch:
	NODE_ENV=development gulp

release:
	NODE_ENV=production gulp build
