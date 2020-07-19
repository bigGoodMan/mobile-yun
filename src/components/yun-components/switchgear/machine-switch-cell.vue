<!-- 机台开关机设置单元格 -->
<template>
  <div
    class="padding-20-30 flex-row flex-between-center machine-switch-cell bgcolor-f"
  >
    <div class="flex-column flex-start-stretch">
      <div
        class="img-container"
        @click.stop="
          APP_IMAGEPREVIEW_MUTATE({
            previewImage: [info.img || ''],
            imagePreviewShow: true
          })
        "
      >
        <img v-lazy="info.img || ''" class="img" />
      </div>
      <p class="flex-column flex-start margin-0">
        <span>{{ info.name || "" }}-{{ info.no }}</span>
        <span>{{ info.machine_type_name }}</span>
      </p>
    </div>
    <div>
      <div class="flex-row flex-between-center padding-bottom-20">
        <van-button size="small" type="danger" @click="handleClick('close')"
          >关机</van-button
        >
        <van-button
          size="small"
          type="primary"
          style="margin-left: 10px;"
          @click="handleClick('open')"
          >开机</van-button
        >
        <van-button
          size="small"
          type="warning"
          style="margin-left: 10px;"
          @click="handleClick('restart')"
          >重启</van-button
        >
      </div>
      <div class="flex-row flex-between-center">
        <ul class="no-ul">
          <li>
            开机：<span :class="info.turn_on_time ? 'color-info' : ''">{{
              info.turn_on_time || "未设置"
            }}</span>
          </li>
          <li>
            关机：<span :class="info.turn_off_time ? 'color-info' : ''">{{
              info.turn_off_time || "未设置"
            }}</span>
          </li>
        </ul>
        <van-button size="small" type="info" @click="handleClick('timing')"
          >定时</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MachineSwitchCell",

  components: {},
  props: {
    info: Object
  },
  data() {
    return {};
  },

  computed: {},

  methods: {
    ...mapMutations(["APP_IMAGEPREVIEW_MUTATE"]),
    handleClick(type) {
      this.$emit("trigger-click", type);
    }
  }
};
</script>
<style lang="stylus" scoped>
.machine-switch-cell
  .img-container
    display flex
    flex-flow row nowrap
    justify-content center
    align-items center
    width rems(150)
    height rems(150)
    .img
      max-width 100%
      max-height 100%
</style>
