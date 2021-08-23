/**
 * 路由配置 动态生成而成
 */

export default {
	template: {
		common: {
  	},
		site: {
      login: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/login'], resolve);
		    },
		    metaInfo: {
					title: '登录',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css',
					],
					js: [
					],
		    }
		  },
      index: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/index/index'], resolve);
		    },
		    metaInfo: {
					title: '首页',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
            isIndexPage: true,
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
					],
					js: [
					],
		    }
		  },
      site: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/site_config'], resolve);
		    },
		    metaInfo: {
					title: '网站配置',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css',
					],
					js: [
					],
		    }
		  },
      group: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/group/group_config'], resolve);
		    },
		    metaInfo: {
					title: '组织架构',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css',
					],
					js: [
					],
		    }
		  },
      limit: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/limit_config'], resolve);
		    },
		    metaInfo: {
					title: '权限管理',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css',
					],
					js: [
					],
		    }
		  },
      password: {
		    comLoad: function (resolve) {
		    	require(['../merge/site/view/password_config'], resolve);
		    },
		    metaInfo: {
					title: '修改密码',
					notNeedLogin: false,
					loadedApis: ["getSiteConfig"],
					loadedApiParams: {"appkey":"loaded"},
					auth: '',
					css: [
						'https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css',
						'https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css',
					],
					js: [
					],
		    }
		  },
  	},
	}
}










