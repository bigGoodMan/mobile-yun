<!-- 底部弹窗 -->
<template>
  <div class="bottom-popup">
    <van-popup
      v-model="show"
      position="bottom"
      :close-on-click-overlay="maskClose"
      :overlay="overlay"
      @click-overlay="handleClose"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @change="handleChange"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "BottomPopup",
  components: {},
  props: {
    maskClose: {
      type: Boolean,
      default: false
    },
    columns: {
      default: () => [],
      type: Array
    },
    overlay: {
      // 是否展示蒙层 默认有
      default: true,
      type: Boolean
    },
    show: {
      //  是否展示popup
      default: false,
      type: Boolean
    },
    defaultIndex: Number
  },
  data() {
    return {
      loading: true // picker动画
    };
  },

  computed: {},
  watch: {
    columns: {
      handler() {
        this.loading = false;
      }
    }
  },

  mounted() {},

  methods: {
    // 取消
    handleCancel() {
      this.$emit("trigger-cancel");
      this.handleClose();
    },
    // 选中
    handleConfirm(value, index) {
      this.$emit("trigger-confirm", { value, index });
      this.handleClose();
    },
    handleClose() {
      this.$emit("trigger-close");
    },
    // 改变
    handleChange() {}
  }
};
</script>
<style lang="stylus" scoped></style>
