<!-- 消费套餐编辑添加 -->
<template>
  <van-popup v-model="show" :close-on-click-overlay="false">
    <div class="consumption-package-popup">
      <dl class="list-first">
        <dt class="title size-28 weight-bold">套餐名称</dt>
        <dd class="content">
          <HhfInput
            v-model="packageData.title"
            placeholder="请输入套餐名称"
            position="left"
          />
        </dd>
        <dd class="content border"></dd>
      </dl>
      <dl class="list-second">
        <dt class="title size-28 weight-bold">规则</dt>
        <dd class="margin-0 content">
          <HhfInput
            v-model="packageData.limit"
            title="每满"
            type="tel"
            placeholder="1~20"
            position="center"
            :error-text="limitError"
            width="2rem"
            border
            suffix="局"
            @trigger-blur="handleBlur('limitError', packageData.limit)"
          />
        </dd>
        <dd class="margin-0 content">
          <!-- eslint-disable-next-line no-irregular-whitespace -->
          <HhfInput
            v-model="packageData.discount"
            title="送　"
            type="tel"
            placeholder="1~20"
            position="center"
            :error-text="discountError"
            width="2rem"
            border
            suffix="局"
            @trigger-blur="handleBlur('discountError', packageData.discount)"
          />
        </dd>
      </dl>
      <div class="cross" @click="handleClose">
        <van-icon
          name="cross"
          color="#ee0a24"
          size="20px"
          class="weight-bold"
        />
      </div>
      <div class="text-center">
        <HhfButton
          type="info"
          size="normal"
          radius="0.1rem"
          @trigger-click="handleSave"
          >保存</HhfButton
        >
      </div>
    </div>
  </van-popup>
</template>

<script>
import HhfInput from "@hhf/hhf-input";
import HhfButton from "@hhf/hhf-button";
export default {
  name: "ConsumptionPackagePopup",
  components: {
    HhfInput,
    HhfButton
  },
  model: {
    prop: "show",
    event: "trigger-change"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    itemData: {
      type: Object
    }
  },
  data() {
    return {
      limitError: "",
      discountError: "",
      packageData: {}
    };
  },

  computed: {},
  watch: {
    itemData(currVal) {
      this.limitError = "";
      this.discountError = "";
      if (!currVal) {
        return;
      }
      this.packageData = {
        title: currVal.title,
        id: currVal.id,
        store_id: currVal.store_id,
        limit: currVal.limit,
        discount: currVal.discount
      };
    }
  },

  mounted() {},
  methods: {
    handleBlur(key, val) {
      if (!/^[0-9]*$/.test(val)) {
        this[key] = "格式不正确";
        return;
      }
      if (val - 0 >= 0 && val - 0 <= 20) {
        this[key] = "";
        return;
      }
      this[key] = "0~20局数";
    },
    handleClose() {
      this.$emit("trigger-change", false);
    },
    handleSave() {
      const { title, discount, limit } = this.packageData;
      if (!title) {
        this.$Tip.warning("名称不能为空");
        return;
      }
      if (!/^[0-9]*$/.test(discount) || discount - 0 < 0 || discount - 0 > 20) {
        this.discountError = "0~20局数";
        this.$Tip.warning("请填入正确的格式");
        return;
      }
      if (!/^[0-9]*$/.test(limit) || limit - 0 < 0 || limit - 0 > 20) {
        this.limitError = "0~20局数";
        this.$Tip.warning("请填入正确的格式");
        return;
      }
      this.$emit("trigger-save", this.packageData);
    }
  }
};
</script>
<style lang="stylus" scoped>
.consumption-package-popup
  position relative
  padding rems(30) rems(40)
  min-width 90vw
  box-sizing border-box
  .list-first
    margin 0
    .title
      margin-bottom rems(20)
    .content
      margin 0
  .list-second
    margin-bottom 0
    margin-top rems(30)
    .content
      padding-top rems(20)
  .cross
    font-size 0
    position absolute
    top rems(10)
    right rems(10)
</style>
