/**
 * 项目配置文件
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appConfig = require('./src/config/base/appConfig.js');
const scssConfig = require('./src/createConfig/scss.config.js');
const aliasConfig = require('./src/createConfig/alias.config.js');
const createAppConfig = require('./src/createConfig/app.config.js');
const path = require("path");

module.exports = {
	runtimeCompiler: true,
	//应用所在域名根目录位置
	publicPath: process.env.VUE_APP_PATH,

	//开发环境设置
	devServer: {
		// host: "local." + appConfig.devApi,
		host: appConfig.devApi,
		// port: appConfig.port,
		open: true,
		hot: true,
		compress: true,
		clientLogLevel: 'warning',
		historyApiFallback: {
			rewrites: [
				{ from: /.*/, to: path.posix.join(process.env.VUE_APP_PATH, 'index.html') },
			],
		},
		publicPath: process.env.VUE_APP_PATH,
		proxy: {
			'/api': {
				target: appConfig.apiProtocol + "://" + appConfig.devApi,
				pathRewrite: { "^/api": "" },
				secure: false
			}
		}
	},

	//输出相关
	outputDir: "dist/" + createAppConfig.envWebId + "_v1",
	assetsDir: process.env.VUE_APP_STATIC,
	indexPath: 'index.html',

	//需要做es语法转义的依赖
	transpileDependencies: [],

	//是否启用生产环境map
	productionSourceMap: false,

	//修改load
	chainWebpack: (config) => {
		//修改vue-loader
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap((options) => {
				options.compilerOptions.whitespace = "preserve";

				return options;
			});

		config.plugin("html").tap((options) => {
			options[0].meta = { sourceV: createAppConfig.sourceV };

			return options;
		})
	},

	//webpack 自定义配置
	configureWebpack: config => {
		let plugins = [];

		//剥离不需要打包的文件
		config.externals = {
			'jquery': "jQuery",
			'vue': 'Vue',
			'vue-router': 'VueRouter',
			'vuex': 'Vuex',
			'axios': 'axios',
			'element-ui': 'ELEMENT',
			'js-md5': 'md5',
			'i18n': 'vue-i18n'
		};

		config.plugins.forEach((pluginOne, index) => {
			if (!(pluginOne instanceof MiniCssExtractPlugin) && !(pluginOne instanceof CopyWebpackPlugin)) {
				plugins.push(pluginOne);
			}
		});

		//配置自动检索文件目录
		config.resolve.modules = [
			...config.resolve.modules,
			...[
				'frame/helpers',
				'src/helpers',
				'src/extends',
			]
		];

		config.resolve.extensions = [
			...config.resolve.extensions,
			...['.css', '.less', '.scss']
		];

		//配置别名
		config.resolve.alias = {
			...config.resolve.alias,
			...aliasConfig
		};

		if (process.env.NODE_ENV === 'production') {
			config.output = {
				...config.output,
				...{
					filename: process.env.VUE_APP_STATIC + '/js/[name].[chunkhash:6].js?v=' + createAppConfig.sourceV,
					chunkFilename: process.env.VUE_APP_STATIC + '/js/[id].[chunkhash:6].js?v=' + createAppConfig.sourceV
				}
			};

			config.plugins = [
				...plugins,
				...[
					new MiniCssExtractPlugin({
						filename: process.env.VUE_APP_STATIC + '/css/[name].[contenthash:6].css?v=' + createAppConfig.sourceV,
						allChunks: true,
						ignoreOrder: true
					}),
					new CopyWebpackPlugin([
						{
							from: process.env.VUE_APP_PUBLICDIR + '/' + process.env.VUE_APP_STATIC,
							to: process.env.VUE_APP_STATIC,
							ignore: ['.*']
						}
					])
				]
			];
		} else {
			config.output = {
				...config.output,
				...{
					filename: process.env.VUE_APP_STATIC + '/js/[name].js?v=' + createAppConfig.sourceV,
					chunkFilename: process.env.VUE_APP_STATIC + '/js/[id].js?v=' + createAppConfig.sourceV
				}
			};

			config.plugins = [
				...plugins,
				...[
					new CopyWebpackPlugin([
						{
							from: process.env.VUE_APP_PUBLICDIR + '/' + process.env.VUE_APP_STATIC,
							to: process.env.VUE_APP_STATIC,
							ignore: ['.*']
						}
					])
				]
			];
		}
	},

	//css 相关配置
	css: {
		requireModuleExtension: true,
		loaderOptions: {
			...scssConfig,
			...{
				css: {

				}
			}
		}
	}
};





