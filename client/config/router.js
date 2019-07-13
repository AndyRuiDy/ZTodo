import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 去除/#/
    // base: '/base/'
    fallback: true
  })
}
