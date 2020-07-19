/** 销售提升建议 */
const SalesSuggestion = {
  path: "/sales-suggestion",
  name: "SalesSuggestion",
  component: () =>
    import(
      /* webpackChunkName: "SalesSuggestion" */ "@v/business-data/sales-suggestion.vue"
    ),
  meta: {
    title: "销售提升建议",
    tip: "https://mp.weixin.qq.com/s/bi1fs0DQ-0eLWTa-Ys2KRw"
  }
};
export default [SalesSuggestion];
