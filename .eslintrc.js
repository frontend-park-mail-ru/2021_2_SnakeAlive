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
		project: "./tsconfig.json"
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
		'src-old/**',
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
		"no-console": 1,
		"max-classes-per-file": 1, // 0 - игнорировать, 1 - warning, 2 - ошибка
		/*
          Именованные экспорты «включают в себя» своё имя. Эта информация является частью модуля, говорит нам, что именно экспортируется
          В то время как для экспорта по умолчанию мы выбираем любое имя при импорте
         */
		'import/prefer-default-export': 'off',
		'@typescript-eslint/no-empty-interface': 'off'
	},
	"settings": {
		"import/resolver": {
			"webpack": {
				"config": "webpack.config.js"
			}
		}
	},
};
