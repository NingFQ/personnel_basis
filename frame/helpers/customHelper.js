/**
 * 功能自定义helper
 */
import Vue from "vue";

const customHelper = {
  /**
   * 获取当前学校，指定维度配置，没有则返回false
   * @param {string} dimension 
   */
  getConfig(dimension) {
    if(appConfig.customConfig && appConfig.customConfig[dimension]) {
      return appConfig.customConfig[dimension];
    }

    return false;
  },
  /**
   * 获取当前学校配置，指定id
   * @param {str} paramName
   * @param {num} id
   */
  getConfigId(paramName, id) {
    let config = this.getConfig(paramName);
    
    return config[id] ? config[id] : config['default'];
  }
}

export default customHelper