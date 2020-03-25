/** 消费套餐 */
const ConsumptionPackage = {
  path: '/consumption-package',
  name: 'ConsumptionPackage',
  component: () => import(/* webpackChunkName: "ConsumptionPackage" */ '@v/set-meal/consumption-package.vue'),
  meta: {
    title: '消费套餐'
  }
}
/** 充值套餐 */
const RechargePackage = {
  path: '/recharge-package',
  name: 'RechargePackage',
  component: () => import(/* webpackChunkName: "RechargePackage" */ '@v/set-meal/recharge-package.vue'),
  meta: {
    title: '充值套餐'
  }
}
/** 体验券 */
const ExperienceTicket = {
  path: '/experience-ticket',
  name: 'ExperienceTicket',
  component: () => import(/* webpackChunkName: "ExperienceTicket" */ '@v/set-meal/experience-ticket.vue'),
  meta: {
    title: '充值套餐'
  }
}
export default [ConsumptionPackage, RechargePackage, ExperienceTicket]
