import HttpReq from "@/lib/https";
// 拉福猫商品建档
function catSystemAddGood(data) {
  return HttpReq.formPost({
    url: "laughing_mall/add_goods",
    data
  });
}
// 拉福猫商品列表
function catSystemGoodList(data) {
  return HttpReq.formPost({
    url: "laughing_mall/goods_list",
    data
  });
}
// 拉福猫商品入库
function catSystemGoodStockIn(data) {
  return HttpReq.formPost({
    url: "laughing_mall/goods_stock_in",
    data
  });
}
export { catSystemAddGood, catSystemGoodList, catSystemGoodStockIn };
