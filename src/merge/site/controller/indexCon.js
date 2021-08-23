/**
 * 首页controller
 */

//引入混入
import mixIndexCon from "@site/mixins/indexCon.js";
import mixCIndexCon from "@site/mixins/c_indexCon.js";

export default {
  name: "siteindex",
  mixins: [mixIndexCon, mixCIndexCon],  //使用混入，默认混入文件放前面
  data: () => {
    return {
      name: ''
    }
  },

  mounted() {
    // this.init();
  },

  methods: {
    init() {
      this.$appFetch({
        url: 'getSiteConfig',
        method: 'GET',
        success: () => {
          console.log("请求成功")
        }
      });

      this.$appFetch({
        url: 'login',
        method: 'GET',
        success: () => {
          console.log("请求成功")
        }
      })
    }
  }
}