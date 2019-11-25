// 智能抓感
// 选择设备
const GraspEquipmentChoice = {
  path: '/intelligent-grasp',
  name: 'GraspEquipmentChoice',
  component: () => import(/* webpackChunkName: "GraspEquipmentChoice" */ '@v/intelligent-grasp/grasp-equipment-choice.vue'),
  meta: {
    title: '选择设备'
  }
}
// 选择礼品
const GraspGiftChoice = {
  path: '/intelligent-grasp/grasp-gift-choice',
  name: 'GraspGiftChoice',
  component: () => import(/* webpackChunkName: "GraspGiftChoice" */ '@v/intelligent-grasp/grasp-gift-choice.vue'),
  meta: {
    title: '选择礼品'
  }
}
export default [GraspEquipmentChoice, GraspGiftChoice]
