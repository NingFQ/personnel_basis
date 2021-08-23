/**
 * 统计 helper
 * 将公共统计助手代码和当前定制对象合并
 * @author  李刚
 */

/**
 * 统计助手
 */
import Vue from "vue";
import frameStaHelper from "frameStaHelper";

const StHelper = {
	...frameStaHelper,
	
	/**
	 * 页面加载完成
	 */
	pageLoaded() {
		if(this.loaded) return false;
		 
		this.loaded = true;
	}
}

export default StHelper;























