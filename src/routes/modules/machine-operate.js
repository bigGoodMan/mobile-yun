// 娃娃机开关机
const CommandStrongGrasp = {
  path: '/machine-operate/command-strong-grasp',
  name: 'CommandStrongGrasp',
  component: () => import(/* webpackChunkName: "CommandStrongGrasp" */ '@v/machine-operate/command-strong-grasp.vue'),
  meta: {
  }
}
const ResetNumber = {
  path: '/machine-operate/reset-number',
  name: 'ResetNumber',
  component: () => import(/* webpackChunkName: "ResetNumber" */ '@v/machine-operate/reset-number.vue'),
  meta: {
  }
}
export default [CommandStrongGrasp, ResetNumber]
