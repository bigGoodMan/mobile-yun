import Tip from './tip'
import Confirm from './confirm'
import Loading from './loading'
import './css/common.styl'
import './css/loading.styl'
const install = (Vue, options = {}) => {
  Vue.prototype.$Tip = Tip
  Vue.prototype.$Confirm = Confirm
  Vue.prototype.$Loading = Loading
}
export default {
  install,
  Tip,
  Confirm,
  Loading
}
