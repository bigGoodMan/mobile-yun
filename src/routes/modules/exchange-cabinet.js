const ExchangeCabinetList = {
  path: "/exchange-cabinet-list",
  name: "ExchangeCabinetList",
  component: () =>
    import(
      /* webpackChunkName: "ExchangeCabinetList" */ "@v/exchange-cabinet/exchange-cabinet-list.vue"
    ),
  meta: {
    cache: true,
    title: "兑换柜"
  }
};
const ExchangeCabinetDetail = {
  path: "/exchange-cabinet-detail",
  name: "ExchangeCabinetDetail",
  component: () =>
    import(
      /* webpackChunkName: "ExchangeCabinetDetail" */ "@v/exchange-cabinet/exchange-cabinet-detail.vue"
    ),
  meta: {
    goHome: "ExchangeCabinetList",
    title: "兑换柜详情"
  }
};
export default [ExchangeCabinetList, ExchangeCabinetDetail];
