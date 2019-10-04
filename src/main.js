import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import suibianqi from 'vue-socket.io'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.use(new suibianqi({
  debug: false,
  connection: '192.168.2.106:4000',
}))
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
