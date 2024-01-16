# Build a hugo app 
dev:
	cd exampleSite && hugo server --bind 0.0.0.0 --port 1313 --gc --minify --theme ../..

run:
	cd exampleSite && hugo server --bind 0.0.0.0 --port 80 --gc --minify --disableLiveReload --watch=false --renderToDisk --theme ../..



# Build using npm
build-old: check-env
	npm --prefix ./com-daeila-www run build

# Just run in dev mode. You should build too because it's hotswap anyway. Up to you!
dev-old: check-env
	npm --prefix ./com-daeila-www run dev

# Run with a full build.
run-old: check-env build
	npm --prefix ./com-daeila-www run start

# Check environment for node and npm
check-env:
	@echo "Checking for Node.js..."
	@(node -v >$null 2>&1) || (echo "Node.js is not installed" && exit 1)
	@echo "Checking for npm..."
	@(npm -v >$null 2>&1) || (echo "npm is not installed" && exit 1)