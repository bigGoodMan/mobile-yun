/** 消费套餐 */
const ConsumptionPackage = {
  path: '/consumption-package',
  name: 'ConsumptionPackage',
  component: () => import(/* webpackChunkName: "ConsumptionPackage" */ '@v/set-meal/consumption-package.vue'),
  meta: {
    title: '消费套餐',
    tip: 'https://mp.weixin.qq.com/s/FdEUDB0vNZ2drrr4B-I4lQ'
  }
}
const MachineConsumptionMeal = {
  path: '/consumption-package/machine-consumption-meal',
  name: 'MachineConsumptionMeal',
  component: () => import(/* webpackChunkName: "MachineConsumptionMeal" */ '@v/set-meal/machine-consumption-meal.vue'),
  meta: {
    title: '机台套餐配置'
  }
}
/** 充值套餐 */
const RechargePackage = {
  path: '/recharge-package',
  name: 'RechargePackage',
  component: () => import(/* webpackChunkName: "RechargePackage" */ '@v/set-meal/recharge-package.vue'),
  meta: {
    title: '充值套餐',
    tip: 'https://mp.weixin.qq.com/s/Skd694exFcxDRNgI1pRxFQ'
  }
}
/** 门店体验券 */
const ExperienceTicket = {
  path: '/experience-ticket',
  name: 'ExperienceTicket',
  component: () => import(/* webpackChunkName: "ExperienceTicket" */ '@v/set-meal/experience-ticket.vue'),
  meta: {
    title: '门店体验券',
    tip: 'https://mp.weixin.qq.com/s/sHgh6Bsz3oLCO-ih7aoPYA'
  }
}
export default [ConsumptionPackage, RechargePackage, ExperienceTicket, MachineConsumptionMeal]
