import HttpReq from '@/lib/https'
/**
 * 获取销售提升建议列表
 * @param {{store_id: number; sort: string; sort_by: string; page: number; limit: number}} data 数据对象
 * @returns {Promise}
 */
function getSalesSuggestionList (data) {
  return HttpReq.formPost({
    url: 'Gift_sell_advise/advice_list',
    data
  })
}
export {
  getSalesSuggestionList
}
