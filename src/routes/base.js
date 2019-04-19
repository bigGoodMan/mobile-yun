const Home = {
  path: '/home',
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
export {
  Home,
  Error404
}
