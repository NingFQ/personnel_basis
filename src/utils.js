/**
 * 在Vue原型链中定义助手方法
 */

import Vue from "vue";

/**
 * 示例方法放入原型链
 */
Vue.demoFunc = Vue.prototype.$demoFunc = function() {
  console.log("这是一个助手方法放到原型链的示例");
}