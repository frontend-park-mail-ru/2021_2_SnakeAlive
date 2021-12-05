const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// const MockDevServer = require('webpack-mock-dev-server');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		static: './dist',
		port: 2000,
		historyApiFallback: true,
		// before: MockDevServer(path.resolve(__dirname, 'mock-dev-server.config')),
		devMiddleware: {
			writeToDisk: true,
		},
	},
	stats: {
		children:true,
	},
	context: path.resolve(__dirname, 'src'),
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			"@": path.resolve(__dirname, 'src')
		}
	},
	entry: {
		main: './index.ts',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist'),
		publicPath: "/"
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		// new WorkboxPlugin.GenerateSW({
		// 	// these options encourage the ServiceWorkers to get in there fast
		// 	// and not allow any straggling "old" SWs to hang around
		// 	clientsClaim: true,
		// 	skipWaiting: true,
		// }),
	],
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
			},
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico|webp)$/i,
				use: [{
					loader: 'file-loader',
					options: {
						outputPath: 'image',
						relativePath: true,
					}
				}],
			},
			// {
			// 	test: /\.(html)$/,
			// 	loader: 'html-loader'
			// }
		],
	},
};
