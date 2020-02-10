const Article = {
  path: '/article',
  name: 'Article',
  component: () => import(/* webpackChunkName: "Article" */ '@v/other/article/article.vue'),
  meta: {
  }
}
const Page = {
  path: '/page',
  name: 'Page',
  component: () => import(/* webpackChunkName: "Page" */ '@v/other/page.vue'),
  meta: {
  }
}
export default [Article, Page]
