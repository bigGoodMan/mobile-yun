const FirmwareUpdate = {
  path: "/firmware-update",
  name: "FirmwareUpdate",
  component: () =>
    import(
      /* webpackChunkName: "FirmwareUpdate" */ "@v/firmware-update/firmware-update.vue"
    ),
  meta: {
    title: "固件更新"
  }
};
export default [FirmwareUpdate];
