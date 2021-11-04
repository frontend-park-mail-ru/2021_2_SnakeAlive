const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		static: './dist',
		port: 3000,
		historyApiFallback: true,
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
