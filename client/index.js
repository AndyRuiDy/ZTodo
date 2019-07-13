import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import './assets/styles/footer.styl'
import createRouter from './config/router'
import createStore from './store/store'
import Notification from './components/notification'
import Tabs from './components/tabs'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Notification)
Vue.use(Tabs)

const router = createRouter()
const store = createStore()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
