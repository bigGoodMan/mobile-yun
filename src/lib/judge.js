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
const STOCK_TAKING_STATUS = {
  '1': '全部',
  '2': '盘点中',
  '3': '待审核',
  '4': '通过',
  '5': '不通过',
  '6': '取消'
}
const GIFT_MACHINE_TYPE = {
  '3': '小爪机',
  '51': '大爪机',
  '52': '剪刀机',
  '53': '乐淘机'
}
const CLAW_TYPE = {
  '1': '3-7',
  '2': '5-5',
  '3': '15-3',
  '4': '9-3'
}
const EQUIPMENT_UPDATE_STATUS = {
  '0': '无需更新',
  '1': '正在更新'
}
const IS_ON_SALE_STATUS = {
  '1': { text: '待定', color: '#666666' },
  '2': { text: '爆款', color: '#e53333' },
  '3': { text: '热销', color: '#ff9900' },
  '4': { text: '平销', color: '#337fe5' },
  '5': { text: '预滞销', color: '#b8d100' },
  '6': { text: '滞销', color: '#009900' }
}
const SALE_SUGGESTION = {
  '1': '1、及时补充库存，建议新增20个；<br>2、可适当调高预设毛利率；',
  '2': '1、及时补充库存，建议新增18个；<br>2、可略微调高预设毛利率；',
  '3': '及时补充库存，建议新增16个;',
  '4': '加快出货，建议小幅下调预设毛利率；',
  '5': '立即下架，建议先换未上架的新礼品；',
  '6': '最快出货，建议下调预设毛利率至成本价',
  '7': '建议待定中；',
  '8': '维持正常节奏出货',
  '9': '尽快出货，建议大幅下调预设毛利率',
  '10': '建议较大幅下调预设毛利率，加快出货'
}
export {
  MACHINE_STATUS, // 缺货类型
  MACHINE_STATUS_TYPE, // 礼品机状态
  MACHINE_TYPE, // 机器类型
  GAME_MODE, // 游戏模式
  MAINBOARD, // 主板
  CRANE_SPEED, // 天车速度
  CRANE_DELAY, // 天车碰上停止时间
  PAW_POSITION_C2, // 变c2点
  STOCK_TAKING_STATUS, // 库存盘点状态
  GIFT_MACHINE_TYPE, // 礼品机类型
  CLAW_TYPE, // 爪型
  EQUIPMENT_UPDATE_STATUS, // 机台更新状态
  IS_ON_SALE_STATUS, // 礼品销售状态
  SALE_SUGGESTION // 运营建议
}
