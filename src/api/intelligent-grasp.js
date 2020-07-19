import HttpReq from "@/lib/https";
// 获取抓感配置礼品列表 store_id page limit name  status
function getGraspGiftListApi(data) {
  return HttpReq.formPost({
    url: "Smart_grip/getGiftList",
    data
  });
}
// 开始配置只能抓感 store_id   mid  gift_id
function startConfigureGraspApi(data) {
  return HttpReq.formPost({
    url: "Smart_grip/startDeploy",
    data
  });
}
// 获取配置抓感结果 store_id   mid  gift_id
function getConfigureGraspResultApi(data) {
  return HttpReq.formPost({
    url: "Smart_grip/completeDeploy",
    data
  });
}
export {
  getGraspGiftListApi, // 获取抓感配置礼品列表
  startConfigureGraspApi, // 开始配置只能抓感
  getConfigureGraspResultApi // 获取配置抓感结果
};
