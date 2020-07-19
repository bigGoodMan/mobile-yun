<!-- 单元格弹窗 -->
<template>
  <div>
    <div>
      <van-cell :title="title" :value="value" is-link @click="show = true" />
    </div>
    <van-popup v-model="show" @click-overlay="handleClose">
      <div class="cell-popup-container">
        <h5 class="size-30 color-3 padding-20-30 margin-0">{{ popupTitle }}</h5>
        <div class="padding-20-30">
          <div class="flex-row flex-start-stretch">
            <input
              v-model="val"
              class="cell-popup-input padding-0 margin-0 size-28"
              type="number"
              :placeholder="popupPlaceholder"
            />
          </div>
          <div class="border"></div>
          <div class="color-error size-20 text-right height-err margin-top-20">
            <span v-show="errShow">{{ validatorMessage }}</span>
          </div>
        </div>
        <CancelConfirmBtn
          @trigger-confirm="handleConfirm"
          @trigger-cancel="handleCancel"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import CancelConfirmBtn from "@yun/cancel-confirm-btn";
export default {
  name: "CellPopup",
  components: {
    CancelConfirmBtn
  },
  props: {
    title: String,
    value: [String, Number],
    popupTitle: String,
    popupPlaceholder: String,
    validator: {
      type: Function,
      default: () => true
    },
    validatorMessage: {
      type: String,
      default: "格式错误"
    }
  },
  data() {
    return {
      val: "",
      show: false
    };
  },

  computed: {
    errShow() {
      return !this.validator(this.val);
    }
  },
  watch: {
    value: {
      handler(currVal) {
        this.val = currVal;
      },
      immediate: true
    }
  },

  mounted() {},

  methods: {
    handleConfirm() {
      if (!this.errShow) {
        this.$emit("trigger-confirm", this.val);
        this.handleClose();
      }
    },
    handleReset() {
      this.val = this.value;
    },
    handleCancel() {
      this.handleClose();
    },
    handleClose() {
      this.handleReset();
      this.show = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
.cell-popup-container
  width rems(700)
  .cell-popup-input
    flex 1
    margin-right rems(20)
    border none
    height rems(60)
    line-height rems(60)
</style>
