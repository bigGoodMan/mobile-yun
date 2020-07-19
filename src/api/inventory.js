import HttpReq from "@/lib/https";
// 创建盘点单
function createInventoryOrderApi(data) {
  return HttpReq.formPost({
    url: "Inventory/startInventory",
    data
  });
}
// 盘点礼品列表（同添加礼品列表
function inventoryGiftApi(data) {
  return HttpReq.formPost({
    url: "Inventory/getGiftList",
    data
  });
}
// 提交盘点单
function submitInventoryApi(data) {
  return HttpReq.formPost({
    url: "Inventory/saveInventory",
    data
  });
}
// 关闭盘点单
function closeInventoryApi(data) {
  return HttpReq.formPost({
    url: "Inventory/cancelInventory",
    data
  });
}
// 增加盘点数
function addInventoryDataApi(data) {
  return HttpReq.formPost({
    url: "Inventory/insInventoryGift",
    data
  });
}
// 盘点单列表
function getInventoryListApi(data) {
  return HttpReq.formPost({
    url: "Inventory/getInventoryList",
    data
  });
}
// 盘点单详情
function getInventoryDetailApi(data) {
  return HttpReq.formPost({
    url: "Inventory/inventoryDetail",
    data
  });
}
// 盘点单详情礼品列表
function getInventoryDetailGiftListApi(data) {
  return HttpReq.formPost({
    url: " Inventory/getInventoryGiftList  ",
    data
  });
}
export {
  createInventoryOrderApi, // 创建盘点单
  inventoryGiftApi, // 盘点礼品列表（同添加礼品列表
  submitInventoryApi, // 提交盘点
  closeInventoryApi, // 关闭盘点单
  addInventoryDataApi, // 增加盘点数
  getInventoryListApi, // 盘点单列表
  getInventoryDetailApi, // 盘点单详情
  getInventoryDetailGiftListApi // 盘点单详情礼品列表
};
