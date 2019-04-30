const MACHINE_STATUS = {
  '0': '无',
  '1': '换货',
  '2': '补货'
}
const MACHINE_STATUS_TYPE = {
  '1': '正常',
  '2': '故障',
  '3': '离线',
  '4': '缺货',
  '5': '缺纸',
  '6': '维护中'
}
const MACHINE_TYPE = {
  '1': '礼品机',
  '2': '售票机'
}
const GAME_MODE = {
  '0': '固定',
  '1': '随机',
  '2': '固定随机'
}
const MAINBOARD = {
  '1': '武马行主板',
  '2': '花花世界主板'
}
const CRANE_SPEED = {
  '0': '最快',
  '1': '快',
  '2': '中',
  '3': '慢',
  '4': '最慢'
}
const CRANE_DELAY = {
  '0': '0秒',
  '1': '0.2秒',
  '2': '0.4秒',
  '3': '0.6秒'
}
const PAW_POSITION_C2 = {
  '0': '上停',
  '1': '6/10',
  '2': '7/10',
  '3': '8/10',
  '4': '9/10'
}
export {
  MACHINE_STATUS, // 缺货类型
  MACHINE_STATUS_TYPE, // 礼品机状态
  MACHINE_TYPE, // 机器类型
  GAME_MODE, // 游戏模式
  MAINBOARD, // 主板
  CRANE_SPEED, // 天车速度
  CRANE_DELAY, // 天车碰上停止时间
  PAW_POSITION_C2 // 变c2点
}
