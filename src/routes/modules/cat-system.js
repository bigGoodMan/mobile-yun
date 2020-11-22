const CatHome = {
  path: "/cat-home",
  name: "CatHome",
  component: () =>
    import(/* webpackChunkName: "CatHome" */ "@v/cat-system/cat-home.vue"),
  meta: {
    title: "拉福猫"
  }
};
const CatCreateGood = {
  path: "/cat-create-good",
  name: "CatCreateGood",
  component: () =>
    import(
      /* webpackChunkName: "CatCreateGood" */ "@v/cat-system/cat-create-good.vue"
    ),
  meta: {
    title: "商品建档"
  }
};
const CatGiftList = {
  path: "/cat-gift-list",
  name: "CatGiftList",
  component: () =>
    import(
      /* webpackChunkName: "CatGiftList" */ "@v/cat-system/cat-gift-list.vue"
    ),
  meta: {
    title: "商品建档"
  }
};
export default [CatHome, CatCreateGood, CatGiftList];
