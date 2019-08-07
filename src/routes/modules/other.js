const Article = {
  path: '/article',
  name: 'Article',
  component: () => import(/* webpackChunkName: "Article" */ '@v/other/article/article.vue'),
  meta: {
  }
}
export default [Article]
