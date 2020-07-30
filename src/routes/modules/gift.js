const CreateGiftList = {
  path: "/create-gift-list",
  name: "create_gift_list",
  component: () =>
    import(
      /* webpackChunkName: "CreateGiftList" */ "@v/create-gift/create-gift-list.vue"
    ),
  meta: {
    title: "自建礼品列表"
  }
};
const AddEditGift = {
  path: "/create-gift-list/add-edit-gift",
  name: "add_edit_gift",
  component: () =>
    import(
      /* webpackChunkName: "AddEditGift" */ "@v/create-gift/add-edit-gift.vue"
    ),
  meta: {
    toTransition: "slide-down",
    fromTransition: "slide-up"
  }
};
const CreateGiftDetail = {
  path: "/create-gift-list/create-gift-detail",
  name: "create_gift_detail",
  component: () =>
    import(
      /* webpackChunkName: "CreateGiftDetail" */ "@v/create-gift/create-gift-detail.vue"
    ),
  meta: {
    title: "礼品详情"
  }
};
const GiftStorageRecord = {
  path: "/gift-storage-record",
  name: "gift_storage_record",
  component: () =>
    import(
      /* webpackChunkName: "GiftStorageRecord" */ "@v/create-gift/gift-storage-record.vue"
    ),
  meta: {
    title: "礼品入库记录"
  }
};
const AddGiftStorage = {
  path: "/gift-storage-record/add-gift-storage",
  name: "add_gift_storage",
  component: () =>
    import(
      /* webpackChunkName: "AddGiftStorage" */ "@v/create-gift/add-gift-storage.vue"
    ),
  meta: {
    cache: true,
    title: "新增礼品入库"
  }
};
const StoregeGiftAddList = {
  path: "/gift-storage-record/add-gift-storage/storege-gift-add-list",
  name: "storege_gift_add_list",
  component: () =>
    import(
      /* webpackChunkName: "StoregeGiftAddList" */ "@v/create-gift/storege-gift-add-list.vue"
    ),
  meta: {
    title: "自建礼品列表",
    toTransition: "slide-down",
    fromTransition: "slide-up"
  }
};
export default [
  CreateGiftList,
  AddEditGift,
  CreateGiftDetail,
  GiftStorageRecord,
  AddGiftStorage,
  StoregeGiftAddList
];
