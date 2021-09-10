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

      if (data != null) {
        state.siteConfig = Object.assign({}, data);
        var link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "shortcut icon";
        link.href = `${data.host_url}${data.icon}`;
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    }
  },
  actions: {

  }
}