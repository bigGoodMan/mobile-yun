const MachineOperation = {
  path: '/machine-operation',
  name: 'machine_operation',
  component: () => import(/* webpackChunkName: "MachineOperation" */ '@v/machine-operation/machine-operation.vue'),
  meta: {
    title: '机台操作'
  }
}
export {
  MachineOperation
}
