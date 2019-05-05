import Tip from './tip'
const install = (Vue, options = {}) => {
  Vue.prototype.$Tip = Tip
}
export default install
