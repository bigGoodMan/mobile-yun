import HttpReq from "@/lib/https";
// 获取礼品创建列表
function getDefinitions(data) {
  return HttpReq.formPost({
    url: "Web_login/getGlossary",
    data
  });
}
export { getDefinitions };
