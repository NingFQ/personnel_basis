/**
* 网站自动生成的基础配置
*/
let Vue = require('vue');

module.exports = {
	  /**
	   * 环境id
	   * @type {String}
	   */
	  webId: 'default',

		/**
		 * 运行环境id
		 */
		envWebId: 'default',

	  /**
	   * 登陆地址
	   * @type {String}
	   */
	  login: '',
	
	  /**
	   * 退出登陆地址
	   * @type {String}
	   */
	  logout: '',
	
	  /**
	   * cookie前缀
	   * @type {String}
	   */
	  userKeyPrefix: '',

		/**
		 * 当前版本号
		 */
		version: '1.0',
		
		/**
		 * 环境
		 */
		env: 'product',

		/**
		 * 版本号
		 */
		sourceV: 1629710434414,

		/**
		 * 功能定制全局统一配置
		 */
		customConfig: {},
		
	  	  /**
	   * 只允许访问的客户端：pc：只允许访问pc端，mobile：值允许访问移动端
	   */
	  onlyClient: function() {
		if(Vue.appCommonH.isWeixin().isWeixin) {
			return 'mobile';
		} else {
			return false;
		}
	},
	  };
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	