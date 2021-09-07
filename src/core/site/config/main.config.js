/**
 * 版本主配置文件
 */

module.exports = {
	//接口配置列表
	apis: {
		// 民族字典
		nationList: "/api/nation/lists",
		// 离职原因列表
		levelReasonList: "/api/common/quit_lists",
		// 领导职务字典
		leaderList: "/api/common/job_lists",
		// 登录图形验证码
		loginImgCode: "/auth/captcha",
		// 登录
		loginIn: "/auth/login",
		// 退出登录
		loginOut: "/api/manager/logout",
		// 修改密码
		changePassword: "/api/manager/modify/password",
		// 获取部门列表
		departmentList: "/api/department/lists",
		// 部门编辑
		departmentEdit: "/api/department/save",
		//  部门删除
		departmentDelete: "/api/department/remove",
		// 获取用户列表
		userList: "/api/user/lists",
		// 用户删除
		deleteUser: "/api/user/delete",
		// 权限组列表
		adminList: "/api/common/lists",
		// 管理员列表
		adminUserList: "/api/manager/lists",
		// 添加管理员
		addAdmin: "/api/manager/add",
		// 移除管理员
		removeAdmin: "/api/manager/remove",
		// 网站配置获取
		webConfigInfo: "/sysconfig/info",
		// 网站配置修改
		saveWebConfig: "/api/sysconfig/save",
		// 上传图片
		uploadImg: "/upload/image",
		// 导入excel
		uploadExcel: "/api/user/import",
		// 查看导入进度
		importResult: "/api/user/importResult",
		// 导出用户
		exportUser: "/api/user/download",
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
			viewPath: "view/limit/limit_config",
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

