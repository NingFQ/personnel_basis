/**
 * 默认环境模块配置文件
 */
const commonModules = require("../../base/commonModules");

module.exports = {
	/**
	 * 环境id
	 * @type {String}
	 */
  webId: 'default',

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
	 * 返回只允许访问的客户端：false：根据标准逻辑判断，pc：只允许访问pc端，mobile：只允许访问移动端
	 */
  onlyClient: `function() {
		if(Vue.appCommonH.isWeixin().isWeixin) {
			return 'mobile';
		} else {
			return false;
		}
	}`,

	/**
	 * 模块列表
	 * @type {Array}
	 */
  modules: [...commonModules]
};