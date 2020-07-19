import HttpReq from "@/lib/https";
function getExchangeCabinetList(data) {
  return HttpReq.formPost({
    url: "exchange/exchange_list",
    data
  });
}
/**
 * 礼品柜详情
 * @param {{
 * mid: string,
 *  hole_id: string
 * }} data mid 机台id
 */
function getExchangeCabinetDetail(data) {
  return HttpReq.formPost({
    url: "exchange/exchange_info",
    data
  });
}

/**
 * 礼品柜开门
 * @param {{
 * mid: string,
 *  hole_no: string
 * }} data mid 机台id hole_no 开门操作
 */
function openGiftCabinetDoor(data) {
  return HttpReq.formPost({
    url: "exchange/exchange_door_on",
    data
  });
}
/**
 * 获取门店下所有礼品列表
 * @param {{
 * store_id: string;
 *  gift_name: string;
 * page: string;
 * limit; string;
 * }} data store_id, gift_name, page,limit
 */
function getStoreGiftList(data) {
  return HttpReq.formPost({
    url: "exchange/get_search_gift",
    data
  });
}
/**
 * 礼品柜换货
 * @param {{
 * hole_id: string;
 *  gift_id: string;
 * gift_num: string;
 * }} data hole_id, gift_id, gift_num
 */
function submitGiftCabinetExchangeGift(data) {
  return HttpReq.formPost({
    url: "exchange/exchange_gift",
    data
  });
}
export {
  getExchangeCabinetList,
  getExchangeCabinetDetail,
  openGiftCabinetDoor,
  getStoreGiftList,
  submitGiftCabinetExchangeGift
};
