// 娃娃机开关机
const Switchgear = {
  path: "/switchgear",
  name: "Switchgear",
  component: () =>
    import(/* webpackChunkName: "Switchgear" */ "@v/switchgear/switchgear.vue"),
  meta: {}
};
const TimeSwitch = {
  path: "/switchgear/time-switch",
  name: "TimeSwitch",
  component: () =>
    import(
      /* webpackChunkName: "TimeSwitch" */ "@v/switchgear/time-switch.vue"
    ),
  meta: {}
};
export default [Switchgear, TimeSwitch];
