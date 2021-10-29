module.exports = {
	parser: '@typescript-eslint/parser',
	globals: {
		"Handlebars": "readonly"
	},
	env: {
		es6: true,
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'prettier',  'plugin:@typescript-eslint/recommended' ],
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
		'src/precompiled/*',
		'src/templates/*',
		'handlebars.min-v4.7.7.js',
		'webpack.config.js',
		'dist/'
	],
	rules: {
		'prefer-const': 'error',
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				"js": "never",
				"jsx": "never",
				"ts": "never",
				"tsx": "never",
			}
		],
		"max-classes-per-file": 1, // 0 - игнорировать, 1 - warning, 2 - ошибка
		/*
          Именованные экспорты «включают в себя» своё имя. Эта информация является частью модуля, говорит нам, что именно экспортируется
          В то время как для экспорта по умолчанию мы выбираем любое имя при импорте
         */
		'import/prefer-default-export': 'off',
		//'@typescript-eslint/no-var-requires': 1, // require нужны для handlebars
	},
	"settings": {
		"import/resolver": {
			"webpack": {
				"config": "webpack.config.js"
			}
		}
	},
};
