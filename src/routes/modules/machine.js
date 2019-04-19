const MyMachine = {
  path: '/my-machine',
  name: 'my_machine',
  component: () => import(/* webpackChunkName: "MyMachine" */ '@v/my-machine/my-machine.vue'),
  meta: {
    title: '我的机台'
  }
}
export {
  MyMachine
}
