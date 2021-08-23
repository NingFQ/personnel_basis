/**
 * 公共方法
 * 引入框架公共方法，并定义自己的公共方法
 */

import Vue from "vue";
import frameComHelper from "frameComHelper";
import apiHelper from "apiHelper";

const appCommonH = frameComHelper;

/**
 * 访问扩展
 * @param  {[type]} extend [description]
 * @return {[type]}        [description]
 */
appCommonH.toExtend = function (extend, params) {
  switch (extend.type) {
    case "download":
      var downloadUrl = apiHelper.getApi(extend.url);


      window.open(this.setGetUrl(downloadUrl, params));
      break;
  }
}

export default appCommonH;
