/**
 * 入口文件
 */

import Vue from 'vue';	//引入Vue
import ElementUI from 'element-ui'
import "./extends/elementUiInit";	//引入element ui 初始化代码
import '../public/static/fonticon/iconfont.css';	//引入字体图标
import './scss/base.common.scss';	//引入全局css
import '../frame/registerHelper.js';	//引入框架注册helper
import appConfigInit from "./config/base/appConfigInit";	//引入全局配置
import i18n from "./createConfig/lang.config"; //引入语言包
import appStore from "./createConfig/store.config.js";	//引入当前环境vuex配置
import RConfig from "./tpl";	//引入当前环境路由文件，并初始化路由
import "./utils";	//引入助手方法
import './scss/element-variables.scss'
//应用路由放在原型中
const appRouter = RConfig.init();
Vue.use(ElementUI)
//实例化根目录
import App from './App.vue'
new Vue({
	router: appRouter,
	store: appStore,
	i18n: i18n,
	render: h => h(App)
}).$mount('#app');

appRouter.beforeEach((to, from, next) => {
	if (to.path.indexOf('login') != -1) {
		next()
	} else {
		if (window.sessionStorage.getItem('token') == null) {
			next({
				path: '/site/login',
			})
		} else {
			next()
		}
	}
})

axios.interceptors.response.use(response => {
	if (response) {
		if (response.data.code == 401) {
			window.sessionStorage.removeItem("userName");
			window.sessionStorage.removeItem("token");
			// window.sessionStorage.removeItem("site_config_info");
			//如果超时就处理 ，指定要跳转的页面(比如登陆页)
			// Message({
			// 	message: 'token失效,请重新登录!',
			// 	type: 'warning',
			// 	center: true,
			// 	onClose: function () {

			// 	}
			// });
			appRouter.replace({
				path: '/site/login',
			})
		}
	}
	return response;
}, error => {
	return Promise.reject(error.response.data) //返回接口返回的错误信息
})