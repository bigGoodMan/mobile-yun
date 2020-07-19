// 娃娃机开关机
const CommandStrongGrasp = {
  path: "/machine-operate/command-strong-grasp",
  name: "CommandStrongGrasp",
  component: () =>
    import(
      /* webpackChunkName: "CommandStrongGrasp" */ "@v/machine-operate/command-strong-grasp.vue"
    ),
  meta: {}
};
// 重置局数
const ResetNumber = {
  path: "/machine-operate/reset-number",
  name: "ResetNumber",
  component: () =>
    import(
      /* webpackChunkName: "ResetNumber" */ "@v/machine-operate/reset-number.vue"
    ),
  meta: {}
};
// 免费无限抓
const FreeInfiniteGrasp = {
  path: "/machine-operate/free-infinite-grasp",
  name: "FreeInfiniteGrasp",
  component: () =>
    import(
      /* webpackChunkName: "FreeInfiniteGrasp" */ "@v/machine-operate/free-infinite-grasp.vue"
    ),
  meta: {
    title: "免费无限抓",
    tip: "https://mp.weixin.qq.com/s/J2fX6i8P8do_sR7EAUoBZA"
  }
};
export default [CommandStrongGrasp, ResetNumber, FreeInfiniteGrasp];
