/**
 * 入口文件
 */

import Vue from 'vue';	//引入Vue
import "./extends/elementUiInit";	//引入element ui 初始化代码
import '../public/static/fonticon/iconfont.css';	//引入字体图标
import './scss/base.common.scss';	//引入全局css
import '../frame/registerHelper.js';	//引入框架注册helper
import appConfigInit from "./config/base/appConfigInit";	//引入全局配置
import i18n from "./createConfig/lang.config"; //引入语言包
import appStore from "./createConfig/store.config.js";	//引入当前环境vuex配置
import RConfig from "./tpl";	//引入当前环境路由文件，并初始化路由
import "./utils";	//引入助手方法

//应用路由放在原型中
const appRouter = RConfig.init();

//实例化根目录
import App from './App.vue'
new Vue({
	router: appRouter,
	store: appStore,
	i18n: i18n,
	render: h => h(App)
}).$mount('#app');

// function setRemFontSize() {
// 	var remSize = window.innerWidth / 19.2;
// 	document.querySelector("html").style.fontSize = remSize + "px";
// }

// setRemFontSize();

// window.addEventListener("resize", function () {
// 	setTimeout(function () {
// 		setRemFontSize();
// 	}, 200)
// });