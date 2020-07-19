import HttpReq from "@/lib/https";
// 重置局数
function resetNumber(data) {
  return HttpReq.formPost({
    url: "resetnum/reset_number",
    data
  });
}
// 下发强抓
function commandStrongGrasp(data) {
  return HttpReq.formPost({
    url: "set_strong_grasp/setting_operation",
    data
  });
}
// 无限抓列表
function getFreeInfiniteGraspList(data) {
  // store_id
  return HttpReq.formPost({
    url: "free_graps/get_list",
    data
  });
}
// 设置无限抓
function setFreeInfiniteGraspApi(data) {
  // {machine_id action 0关 1开}
  return HttpReq.formPost({
    url: "free_graps/set_free_grasp",
    data
  });
}
export {
  resetNumber, // 重置局数
  commandStrongGrasp, // 下发强抓
  getFreeInfiniteGraspList, // 免费无限抓列表
  setFreeInfiniteGraspApi // 设置无限抓
};
