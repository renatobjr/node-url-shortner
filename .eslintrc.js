/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	rules: {
		"prettier/prettier": [
			"error",
			{},
			{
				usePrettierrc: true,
			},
		],
		"@typescript-eslint/no-unused-vars": ["error"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"no-console": "warn",
		"no-debugger": "error",
		"no-empty": "error",
		"no-constant-condition": "error",
		"no-unreachable": "error",
		"no-irregular-whitespace": "error",
	},
};
