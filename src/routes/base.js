
const Error404 = {
  path: '*',
  name: 'error_404',
  component: () => import(/* webpackChunkName: "404" */ '@v/error-page/error-404.vue'),
  meta: {
    title: '404'
  }
}
const Login = {
  path: '/login',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@v/login/login.vue'),
  meta: {
    title: '登录',
    toTransition: 'slide-down',
    fromTransition: 'slide-up'
  }
}
export {
  Error404,
  Login
}
