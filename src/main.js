import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
// import './registerServiceWorker'
import '@a/css/common.styl'
import '@a/css/animate.styl'
// import { install, Lazyload } from 'vant'
import plugins from './plugins'
import '@/plugins/css/common.styl'
import '@a/icon/iconfont.css'
// import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(vant)
Vue.use(vant.Lazyload)
Vue.use(plugins)
// Vue.use(Lazyload, {
//   preLoad: 1.3,
//   error: 'static/img/error.jpg',
//   loading: 'http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif',
//   attempt: 3
// })
// Vue.directive('soft-keyboard-hide', {
//   bind: function (el) {
//     console.log(el)
//     const display = el.style.display
//     el.onfocus = () => {
//       el.style.display = 'none'
//     }
//     el.onblur = () => {
//       el.style.display = display
//     }
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
