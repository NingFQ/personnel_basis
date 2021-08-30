// vuex 入口文件
export default {
  state: function () {
    return {
      /**
       *"title": "登录页标题",
        "login_logo": "登录页LOGO",
        "icon": "浏览器图标",
        "website_name": "网站名称",
        "website_logo": "网站LOGO",
        "logo_background": "登录页背景图"
       */
      siteConfig: {}
    }
  },
  mutations: {
    UPDATA_CONFIG(state, data) {
      state.siteConfig = Object.assign({}, data);
    }
  },
  actions: {

  }
}