/**
 * 全局配置
 */

module.exports = {
  //端口
  port: '8080',
  //接口协议类型
  apiProtocol: "https",

  //移动端最大支持的页面宽度
  mobileMaxWidth: 640,

  //本地调试，接口域名
  // devApi: 'test-workflow.campusapp.com.cn',
  devApi: 'personal.dripm.cn',

  //网站根目录
  baseUrl: '',

  //接口根目录
  apiBaseUrl: '',

  //静态文件根目录
  staticUrl: '/' + process.env.VUE_APP_STATIC + '/',

  //路由二级路径
  routeBasePath: process.env.VUE_APP_PATH,

  //下载文件根目录
  uploadUrl: 'https://dev-officeflowimg.rlstech.cn/',

  //图片域名
  upImageUrl: 'http://test.officeflowimg.rlstech.cn/',

  //文件重命名地址
  upFileUrl: '',

  //默认uid的cookie key
  uidKey: "vjuid",

  //资源版本
  sourceV: '0',

  //公共接口配置接口列表
  apis: {
    getSiteConfig: "/api/home/site-options", // 获取网站信息
    departmentList: '/department/lists',// 部门列表
  },

  //路径转换列表
  pcMobileChange: [
  ],

  //功能定制全局统一配置
  customConfig: {
  },
};





