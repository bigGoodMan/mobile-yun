
const CreateGiftList = {
  path: '/create-gift-list',
  name: 'create_gift_list',
  component: () => import(/* webpackChunkName: "CreateGiftList" */ '@v/create-gift/create-gift-list.vue'),
  meta: {
    title: '自建礼品列表'
  }
}
const AddEditGift = {
  path: '/create-gift-list/add-edit-gift',
  name: 'add_edit_gift',
  component: () => import(/* webpackChunkName: "CreateGiftList" */ '@v/create-gift/add-edit-gift.vue'),
  meta: {
    toTransition: 'slide-down',
    fromTransition: 'slide-up'
  }
}
const CreateGiftDetail = {
  path: '/create-gift-list/create-gift-detail',
  name: 'create_gift_detail',
  component: () => import(/* webpackChunkName: "CreateGiftDetail" */ '@v/create-gift/create-gift-detail.vue'),
  meta: {
  }
}
export default [ CreateGiftList, AddEditGift, CreateGiftDetail ]
