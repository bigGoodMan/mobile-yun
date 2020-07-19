<!-- 设备更新进度 -->
<template>
  <div class="equipment-update-progress">
    <div class="mask"></div>
    <div class="flex-row flex-center equipment-update-container">
      <transition name="scale">
        <div
          v-if="status === 'updating' && show"
          class="updating popup bgcolor-f"
        >
          <h5 class="color-3 size-32 text-center title">更新中……</h5>
          <p class="color-7 size-28 text-center describe">
            预计需要5-10分钟，请耐心等待
          </p>
          <div class="progress-container">
            <van-progress
              :percentage="percentage"
              :pivot-text="pivotText"
              :color="progressColor"
              :pivot-color="progressTextBgcolor"
              :text-color="progressTextColor"
              :show-pivot="showPivot"
            />
            <span
              v-if="!showPivot"
              class="progress-content size-28"
              :style="progressStyles"
              >{{ pivotText }}</span
            >
          </div>
        </div>
        <div v-else-if="status === 'fail' && show" class="fail popup bgcolor-f">
          <h5 class="color-3 size-32 text-center title">
            抱歉，部分设备更新未成功
          </h5>
          <p class="color-7 size-28 text-center describe">
            请检查网络，重新尝试更新
          </p>
          <div class="text-center size-0">
            <HhfButton
              radius="0.4rem"
              type="default"
              size="small"
              @trigger-click="handleFailCancel"
              >暂不更新</HhfButton
            >
            <HhfButton
              :styles="{ marginLeft: '0.5rem' }"
              radius="0.4rem"
              type="danger"
              size="small"
              @trigger-click="handleFailRetry"
              >重试</HhfButton
            >
          </div>
        </div>
        <div
          v-else-if="status === 'success' && show"
          class="fail popup bgcolor-f"
        >
          <h5 class="color-3 size-32 text-center title">更新完毕</h5>
          <p class="color-7 size-28 text-center describe">
            您的设备已更新到最新版本!
          </p>
          <div class="text-center size-0">
            <HhfButton
              radius="0.4rem"
              type="info"
              size="small"
              @trigger-click="handleSuccessConfirm"
              >确认</HhfButton
            >
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import HhfButton from "@hhf/hhf-button";
export default {
  name: "EquipmentUpdateProgress",

  components: {
    HhfButton
  },
  props: {
    status: {
      type: String,
      validator: v => {
        return ["success", "updating", "fail"].includes(v);
      }
    },
    percentage: {
      type: Number,
      default: 0
    },
    pivotText: String,
    showPivot: {
      type: Boolean,
      default: false
    },
    progressColor: {
      type: String,
      default: "#1989fa"
    },
    progressTextColor: {
      type: String,
      default: "#ffffff"
    },
    progressTextBgcolor: {
      type: String,
      default: "#1989fa"
    }
  },
  data() {
    return {
      show: false
    };
  },

  computed: {
    progressStyles() {
      return {
        backgroundColor: this.progressTextBgcolor,
        color: this.progressTextColor
      };
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.show = true;
    });
  },

  methods: {
    handleFailCancel() {
      this.$emit("fail-canel");
    },
    handleFailRetry() {
      this.$emit("fail-retry");
    },
    handleSuccessConfirm() {
      this.$emit("success-confirm");
    }
  }
};
</script>
<style lang="stylus" scoped>
.equipment-update-progress
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  z-index 11
  .mask
    position absolute
    top 0
    left 0
    height 100vh
    width 100vw
    background-color rgba(0, 0, 0, .3)
  .equipment-update-container
    position absolute
    width 95%
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .popup
      position absolute
      width 95%
      z-index 1
      padding rems(40) 0
      border-radius rems(5)
      .title
        margin 0
        padding-bottom rems(30)
      .describe
        margin 0
        padding-bottom rems(30)
      .progress-container
        position relative
        .progress-content
          position absolute
          top 50%
          left 50%
          padding rems(5) rems(10)
          border-radius rems(20)
          white-space nowrap
          transform translate(-50%, -50%)
  .scale-enter-active, .slide-enter-active, .fade-enter-active
    transition all 0.5s ease
  .scale-leave-active, .slide-leave-active, .fade-leave-active
    transition all 0.3s cubic-bezier(1, 0.5, 0.8, 1)
  .scale-enter, .scale-leave-to
    transform translate(0, 100vh) scale(0) !important
    opacity 0
</style>
