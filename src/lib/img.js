import LOGO from '@a/img/logo.png'
import HOME from '@a/img/home.png'
let {
  logo,
  home
} = {}
// if (process.env.NODE_ENV === 'production') {
//   const cdn = 'http://stat.i3020.com/free-play/src/assets/img/'
//   logo = `${cdn}logo.png`
// } else {
//   logo = LOGO
// }
logo = LOGO
home = HOME
export {
  logo,
  home
}
