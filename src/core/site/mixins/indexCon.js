/**
 * 混入
 * 
 */

export default {
  data() {
    return {
      mixShowButton: true,  //默认混入，是否显示按钮
    }
  },

  components: {
    mixTemplate: {
      template: `<span>这里是混入定制默认碎片元素</span>`
    }
  },

  methods: {
    /**
     * 默认混入文件，定义点击按钮行为
     */
    clickButton() {
      alert("你点击了按钮");
    }
  },
}