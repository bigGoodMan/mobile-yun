/** 销售提升建议 */
const SalesSuggestion = {
  path: '/sales-suggestion',
  name: 'SalesSuggestion',
  component: () => import(/* webpackChunkName: "SalesSuggestion" */ '@v/business-data/sales-suggestion.vue'),
  meta: {
    title: '销售提升建议'
  }
}
export default [SalesSuggestion]
