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
		index: {
			viewPath: "view/indexView",
			metaInfo: {
				title: '首页'
			},
			css: [],
			js: [],
			notNeedLogin: false
		}
	}
}