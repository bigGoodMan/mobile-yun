
const CreateGiftList = {
  path: '/create-gift-list',
  name: 'create_gift_list',
  component: () => import(/* webpackChunkName: "CreateGiftList" */ '@v/create-gift/create-gift-list.vue'),
  meta: {
    title: '自建礼品列表'
  }
}
export default [ CreateGiftList ]
