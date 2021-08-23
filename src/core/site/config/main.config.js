/**
 * 版本主配置文件
 */

module.exports = {
	//接口配置列表
	apis: {
		login: '/site/login/login', //登录页面
	},

	//页面配置列表
	pages: {
		login: {
			viewPath: "view/login",
			metaInfo: {
				title: '登录',
			},
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
				'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css'
			],
			js: [],
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			loadedApiParams: { appkey: 'loaded' },
		},
		index: {
			viewPath: "view/index/index",
			metaInfo: {
				title: '首页',
			},
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			isIndexPage: true, // 基础页面
			loadedApiParams: { appkey: 'loaded' },
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css'
			]
		},
		site: {
			viewPath: "view/site_config",
			metaInfo: {
				title: '网站配置',
			},
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
				'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css'
			],
			js: [],
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			loadedApiParams: { appkey: 'loaded' },
		},
		group: {
			viewPath: "view/group/group_config",
			metaInfo: {
				title: '组织架构',
			},
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
				'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css'
			],
			js: [],
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			loadedApiParams: { appkey: 'loaded' },
		},
		limit: {
			viewPath: "view/limit_config",
			metaInfo: {
				title: '权限管理',
			},
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
				'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css'
			],
			js: [],
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			loadedApiParams: { appkey: 'loaded' },
		},
		password: {
			viewPath: "view/password_config",
			metaInfo: {
				title: '修改密码',
			},
			css: [
				'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
				'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css'
			],
			js: [],
			notNeedLogin: false,	//是否允许登陆
			loadedApis: ['getSiteConfig'],	//该页面哪些接口调用完成后算页面加载完成
			loadedApiParams: { appkey: 'loaded' },
		},
	}
}

