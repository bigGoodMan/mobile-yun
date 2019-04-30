/**
 * 判断传入内容是否为数字
 * @param {String|Number} num 数字或字符串内容
 * @returns {Boolean}
 */
function positiveNumberRegularTool (num) {
  return /^[0-9]+(\.[0-9]+)?$/.test(num)
}
/**
 * 判断传入内容是否为正整数
 * @param {String|Number} num 数字或字符串内容
 * @returns {Boolean}
 */
function positiveIntegerRegularTool (num) {
  return /^[0-9]+$/.test(num)
}
/**
 * 判断对象是什么类型
 * @param {*} thing 类型判断对象
 * @param {String|Array} type 判断类型可以一个也可以多个（多个用数组）
 * @returns {String|Boolean} // 返回该类型或者返回布尔
 */
function dataTypeJudgmentTool (thing, type) {
  const objName = Object.prototype.toString.call(thing).match(/^\[object (.*)\]$/)[1]
  if (type === void 0) {
    return objName
  }
  if (Object.prototype.toString.call(type) === '[object String]') {
    return objName === type
  }
  if (Object.prototype.toString.call(type) === '[object Array]') {
    return type.includes(objName)
  }
}
export {
  positiveNumberRegularTool, // 正数正则判断
  positiveIntegerRegularTool, // 正整数正则判断
  dataTypeJudgmentTool // 判断数据类型
}
