module.exports = {
	parser: '@babel/eslint-parser',
	env: {
		es6: true,
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier'],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
		requireConfigFile: false,
	},
	ignorePatterns: [
		'README.md',
		'.gitignore',
		'package-lock.json',
		'.eslintrc.js',
		'package.json',
		'*.html',
		'*.css',
		'handlebars.min.js',
	],
	rules: {
		'prefer-const': 'error',
		'import/extensions': [0, { js: 'ignorePackages' }],
		/*
          Именованные экспорты «включают в себя» своё имя. Эта информация является частью модуля, говорит нам, что именно экспортируется
          В то время как для экспорта по умолчанию мы выбираем любое имя при импорте
         */
		'import/prefer-default-export': 'off',
	},
};
