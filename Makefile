.PHONY: dev build serve update clean help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

dev: ## Local dev server with live reload (http://localhost:1313)
	hugo server --bind 0.0.0.0 --port 1313 --gc --minify --navigateToChanged

build: ## Production build into ./public
	hugo --gc --minify

serve: build ## Build then serve the production output
	hugo server --bind 0.0.0.0 --port 1313 --disableFastRender --renderToDisk --watch=false

update: ## Update Hugo module dependencies
	hugo mod clean && hugo mod get -u ./... && hugo mod tidy

clean: ## Remove build output and module cache
	rm -rf public resources
