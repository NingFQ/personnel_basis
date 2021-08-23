/**
 * 定制混入
 * 
 */

export default {
  data() {
    return {
      mixShowButton: false,  //默认混入，是否显示按钮
    }
  },

  components: {
    mixTemplate: {
      template: `<span>这里是混入定制央财碎片元素</span>`
    }
  }
}