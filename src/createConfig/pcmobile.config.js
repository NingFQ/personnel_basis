/**
 * pc和手机端互相跳转
 */

module.exports = [
  {
    name: '登录',
    type: 1,
    pcPath: '/site/login',
    mobilePath: '/site/m_login',
  },
  {
    name: '个人中心',
    type: 2,
    pcPath: '/site/ucenter',
    mobilePath: '/site/m_message',
    changeFunc: (Router, jumpPath, to) => {
      if (!to.query.showroute || to.query.showroute == 'infoCenter') {
        Router.replace({
          path: jumpPath,
          query: to.query
        })
      }
    }
  },
];