/**
 * 手机端和移动端互跳配置
 */

module.exports = [
  {
    name: '登录',
    type: 1,  //1为路径互跳，不涉及到参数转化，2涉及到参数转化
    pcPath: '/site/login',  //pc端链接地址
    mobilePath: '/site/m_login',  //移动端链接地址
  },
  {
    name: '个人中心',
    type: 2,
    pcPath: '/site/ucenter',
    mobilePath: '/site/m_message',
    nochange: ['ouc'],
    changeFunc: `(Router, jumpPath, to) => {
      if (!to.query.showroute || to.query.showroute == 'infoCenter') {
        Router.replace({
          path: jumpPath,
          query: to.query
        })
      }
    }`
  },
];