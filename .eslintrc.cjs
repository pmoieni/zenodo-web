module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		sourceType: "module"
	},
	extends: [
		"eslint:recommended"
	],
	env: {
		es6: true,
		browser: true,
		node: true
	},
	overrides: [
		{
			files: [
				"*.ts"
			],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking"
			],
			parserOptions: {
				project: [
					"./tsconfig.json"
				]
			}
		},
		{
			files: [
				"*.svelte"
			],
			extends: [
				"plugin:svelte/recommended"
			],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: [
					".svelte"
				]
			}
		}
	],
	plugins: [
		"@typescript-eslint"
	],
	ignorePatterns: [
		"node_modules"
	]
}
