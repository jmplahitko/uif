module.exports = {
	extends: ['airbnb-typescript/base'],
	plugins: ['import'],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/space-before-function-paren': ['warn', 'never']
	},
	parserOptions: {
		project: './tsconfig.eslint.json',
	},
};
