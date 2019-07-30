const MyMachine = {
  path: '/my-machine',
  name: 'my_machine',
  component: () => import(/* webpackChunkName: "MyMachine" */ '@v/my-machine/my-machine.vue'),
  meta: {
    title: '我的机台'
  }
}
const MachineDetail = {
  path: '/my-machine/machine-detail',
  name: 'machine_detail',
  component: () => import(/* webpackChunkName: "MachineDetail" */ '@v/my-machine/machine-detail.vue'),
  meta: {
    title: '机台详情',
    goHome: 'my_machine'
  }
}
const PlayPrice = {
  path: '/my-machine/machine-detail/play-price',
  name: 'play_price',
  component: () => import(/* webpackChunkName: "PlayPrice" */ '@v/my-machine/play-price.vue'),
  meta: {
    title: '游玩单价设置',
    goHome: 'my_machine'
  }
}
const EarlyWarningParameters = {
  path: '/my-machine/machine-detail/early-warning-parameters',
  name: 'early_warning_parameters',
  component: () => import(/* webpackChunkName: "EarlyWarningParameters" */ '@v/my-machine/early-warning-parameters.vue'),
  meta: {
    title: '预警参数设置',
    goHome: 'my_machine'
  }
}
const OperationalParameters = {
  path: '/my-machine/machine-detail/operational-parameters',
  name: 'operational_parameters',
  component: () => import(/* webpackChunkName: "OperationalParameters" */ '@v/my-machine/operational-parameters.vue'),
  meta: {
    title: '运营参数设置',
    goHome: 'my_machine'
  }
}
const FirmwareUpdate = {
  path: '/my-machine/firmware-update',
  name: 'FirmwareUpdate',
  component: () => import(/* webpackChunkName: "FirmwareUpdate" */ '@v/my-machine/firmware-update.vue'),
  meta: {
    title: '固件更新'
  }
}
export default [MyMachine, MachineDetail, PlayPrice, EarlyWarningParameters, OperationalParameters, FirmwareUpdate]
