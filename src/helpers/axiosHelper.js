// 封装ajax请求，方便统一处理接口返回值

import Vue from "vue";
import axios from "axios";
import apiHelper from "apiHelper";

//需要统一处理的error
const erroCode = [-2];
const qs = require('qs');
const appFetch = function (params, success, error) {
	var oldUrl = params.url;
	if (params === undefined) {
		console.error("必须传递参数");
		return false;
	}

	//去配置文件查找uri  增加筛选条件http--如果没有http 就进行封装方法修饰链接，有就直接用-用于直接填写api的控件
	if (params.url.toLocaleLowerCase().indexOf('http') < 0) {
		params.url = apiHelper.getApi(params.url);
	}

	params.withCredentials = true;

	//设置默认header
	let defaultHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Source-Version': Vue.appConfig.sourceV
	};

	//如果不是本地调试，则添加header头，以满足接口对请求类型的判断
	if (window.location.href.indexOf("local.") === -1) {
		defaultHeaders['X-Requested-With'] = 'XMLHttpRequest';
	}

	if (params.headers) {
		params.headers = {
			...defaultHeaders,
			...params.headers
		};
	} else {
		params.headers = defaultHeaders;
	}

	//参数统一用data,syf修改
	if (params.method.toLowerCase() == 'get') {
		params.params = params.data;
		delete params.data
	}

	if (params.data) {
		params.data = qs.stringify(params.data);
	}
	return new Promise((resolve, reject) => {
		axios(params)
			.then(function (response) {
				let d = response.data || {};

				d.e = +d.e;

				success && success(response.data);
				resolve(response.data)
				Vue.StHelper.add(oldUrl);
			})
			.catch(function (err) {
				console.error(err, 'API ' + oldUrl);
				error && error(err);
				reject(err)
			})
	});
}

export { appFetch };
