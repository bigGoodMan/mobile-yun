<!-- 取消确定按钮 -->
<template>
  <div class="cancel-confirm-btn">
    <div class="padding-20-30 size-0 flex-row flex-end-center">
      <van-button
        type="default"
        class="cancel-confirm-btn-first cancel-confirm-btn-content"
        @click="handleCancel"
        >{{ cancelName }}</van-button
      >
      <van-button
        type="info"
        class="cancel-confirm-btn-content"
        :loading="loading"
        @click="handleConfirm"
        >{{ confirmName }}</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelConfirmBtn",

  components: {},
  props: {
    loading: {
      default: false,
      type: Boolean
    },
    confirmName: {
      default: "确定",
      type: String
    },
    cancelName: {
      default: "取消",
      type: String
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {
    handleConfirm() {
      this.$emit("trigger-confirm");
    },
    handleCancel() {
      this.$emit("trigger-cancel");
    }
  }
};
</script>
<style lang="stylus" scoped>
.cancel-confirm-btn
  .cancel-confirm-btn-first
    margin-right rems(30)
  .cancel-confirm-btn-content
    height rems(60)
    line-height rems(60)
</style>
