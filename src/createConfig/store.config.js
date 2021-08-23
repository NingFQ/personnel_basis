// vuex 入口文件

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);


//实例化vuex
const appStore = new Vuex.Store({
	modules: {
	}
});

//热加载模块
if (module.hot) {
  module.hot.accept([
  ], () => {

    // 加载新模块
    appStore.hotUpdate({
      modules: {
      }
    });

  })
}

export default appStore;