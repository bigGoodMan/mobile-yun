import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
// import './registerServiceWorker'
import '@a/css/common.styl'
import '@a/css/animate.styl'
import Vant from 'vant'
import plugins from './plugins'
import '@/plugins/css/common.styl'
import '@a/icon/iconfont.css'
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(plugins)
// Vue.use(Lazyload, {
//   preLoad: 1.3,
//   error: 'static/img/error.jpg',
//   loading: 'http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif',
//   attempt: 3
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
