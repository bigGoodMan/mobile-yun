const Home = {
  path: '/my_machine',
  alias: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ '@v/home/home.vue'),
  meta: {
    title: '洞见云'
  }
}
const Error404 = {
  path: '/error-404',
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
    title: '登录'
  }
}
export {
  Home,
  Error404,
  Login
}
