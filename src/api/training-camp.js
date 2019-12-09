import HttpReq from '@/lib/https'
// 获取商家训练营 信息
function getTrainInfoApi (data) {
  return HttpReq.formPost({
    url: 'Tutorial/hotKeyWords',
    data
  })
}
// 商家训练营 收藏列表
function getTrainFavouriteListApi (data) {
  return HttpReq.formPost({
    url: 'Tutorial/favoriteList',
    data
  })
}
// 商家训练营 收藏或取消收藏
function operetionFavouriteApi (data) { // type（1核心教程，2学习手册, 3新特性 is_favorite(0取消，1收藏)，f_id（文章或者专栏的id）
  return HttpReq.formPost({
    url: 'Tutorial/favorite',
    data
  })
}
// 获取商家训练营 搜索列表
function getTrainSearchListApi (data) { // page,limit,word
  return HttpReq.formPost({
    url: 'Tutorial/searchArticle',
    data
  })
}
// 商家训练营 类别列表
function getTrainTypeListApi (data) { // 传 type  1核心教程 2学习手册 3 新特性  page  limit
  return HttpReq.formPost({
    url: 'Tutorial/getList',
    data
  })
}
// 商家训练营 首页数据
function getTrainHomeApi (data) {
  return HttpReq.formPost({
    url: 'Tutorial/home',
    data
  })
}
// 商家训练营 学习手册详情列表
function getTrainStudyDetailApi (data) { // manual_id   学习手册id
  return HttpReq.formPost({
    url: 'Tutorial/getListSort',
    data
  })
}
export {
  getTrainInfoApi,
  operetionFavouriteApi,
  getTrainFavouriteListApi,
  getTrainSearchListApi,
  getTrainTypeListApi,
  getTrainHomeApi,
  getTrainStudyDetailApi
}
