// vuex 入口文件

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import siteModule from "../merge/site/store/index.js";

//实例化vuex
const appStore = new Vuex.Store({
	modules: {
    site: siteModule,
	}
});

//热加载模块
if (module.hot) {
  module.hot.accept([
    '../merge/site/store/index.js',
  ], () => {
    const newsiteModule = require('../merge/site/store/index.js').default;

    // 加载新模块
    appStore.hotUpdate({
      modules: {
        site: newsiteModule,
      }
    });

  })
}

export default appStore;