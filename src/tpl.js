/**
 * 路由实例化和个性化设置
 */
import Vue from 'vue';
import baseTpl from "../frame/baseTpl";
import tplConfig from "./createConfig/router.config.js";

//实例化当前路由
const defaultConfig = new baseTpl(tplConfig);

/**
 * [模块加载前回调函数]
 * @param {[type]} Router [description]
 */
defaultConfig.beforeEnterModule = function(Router) {
	Router.beforeEach((to, from, next) => {
		next();
	});
}

export default defaultConfig;
