/**
 * 注册js 助手到Vue示例和对象中
 */

import customHelper from "customHelper";
import commonHelper from "commonHelper";
import statisticsHelper from "statisticsHelper";
import { appFetch } from "axiosHelper";
import jquery from "jquery";

Vue.customHelper = Vue.prototype.$customHelper = customHelper;
Vue.appCommonH = Vue.prototype.$appCommonH = commonHelper;
Vue.StHelper = Vue.prototype.$StHelper = statisticsHelper;
Vue.appFetch = Vue.prototype.$appFetch = appFetch;
window.$ = window.jQuery = jquery;















