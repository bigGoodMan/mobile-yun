const MyMachine = {
  path: '/my-machine',
  name: 'my_machine',
  component: () => import(/* webpackChunkName: "MyMachine" */ '@v/my-machine/my-machine.vue'),
  meta: {
    title: '我的机台'
  }
}
const MachineDetail = {
  path: '/machine-detail',
  name: 'machine_detail',
  component: () => import(/* webpackChunkName: "MachineDetail" */ '@v/machine-detail/machine-detail.vue'),
  meta: {
    title: '机台详情'
  }
}
const PlayPrice = {
  path: '/play-price',
  name: 'play_price',
  component: () => import(/* webpackChunkName: "PlayPrice" */ '@v/play-price/play-price.vue'),
  meta: {
    title: '游玩单价设置'
  }
}
const EarlyWarningParameters = {
  path: '/early-warning-parameters',
  name: 'early_warning_parameters',
  component: () => import(/* webpackChunkName: "EarlyWarningParameters" */ '@v/early-warning-parameters/early-warning-parameters.vue'),
  meta: {
    title: '预警参数设置'
  }
}
const OperationalParameters = {
  path: '/operational-parameters',
  name: 'operational_parameters',
  component: () => import(/* webpackChunkName: "OperationalParameters" */ '@v/operational-parameters/operational-parameters.vue'),
  meta: {
    title: '运营参数设置'
  }
}
export default [MyMachine, MachineDetail, PlayPrice, EarlyWarningParameters, OperationalParameters]
