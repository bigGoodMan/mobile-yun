const StockTaking = {
  path: "/stock-taking",
  name: "stock_taking",
  component: () =>
    import(
      /* webpackChunkName: "StockTaking" */ "@v/stock-taking/stock-taking.vue"
    ),
  meta: {
    title: "库存盘点"
  }
};
const CreateInventory = {
  path: "/stock-taking/create-inventory",
  name: "create_inventory",
  component: () =>
    import(
      /* webpackChunkName: "CreateInventory" */ "@v/stock-taking/create-inventory.vue"
    ),
  meta: {
    title: "新建盘点单"
  }
};
const Inventorying = {
  path: "/stock-taking/create-inventory/inventorying",
  name: "inventorying",
  component: () =>
    import(
      /* webpackChunkName: "Inventory" */ "@v/stock-taking/inventorying.vue"
    ),
  meta: {
    title: "盘点中"
  }
};
const InventoryMoreGift = {
  path: "/stock-taking/create-inventory/inventorying/inventory-more-gift",
  name: "inventory_more_gift",
  component: () =>
    import(
      /* webpackChunkName: "InventoryMoreGift" */ "@v/stock-taking/inventory-more-gift.vue"
    ),
  meta: {
    title: "更多礼品",
    toTransition: "slide-down",
    fromTransition: "slide-up"
  }
};
const InventoryDetail = {
  path: "/stock-taking/inventory-detail",
  name: "inventory_detail",
  component: () =>
    import(
      /* webpackChunkName: "InventoryDetail" */ "@v/stock-taking/inventory-detail.vue"
    ),
  meta: {
    title: "盘点单详情"
  }
};
const InventoryGiftList = {
  path: "/stock-taking/inventory-detail/inventory-gift-list",
  name: "inventory_gift_list",
  component: () =>
    import(
      /* webpackChunkName: "InventoryGiftList" */ "@v/stock-taking/inventory-gift-list.vue"
    ),
  meta: {
    title: "盘点礼品列表",
    toTransition: "slide-down",
    fromTransition: "slide-up"
  }
};
export default [
  StockTaking,
  CreateInventory,
  Inventorying,
  InventoryMoreGift,
  InventoryDetail,
  InventoryGiftList
];
