<!-- 礼品信息 -->
<template>
  <div>
    <div class="padding-20-30">
      <HhfInput
        v-model="giftName"
        title="礼品名称（必填）"
        :maxlength="20"
        type="text"
        placeholder="请输入礼品名称，二十字以内"
      />
    </div>
    <div class="border border-ebedf0"></div>
    <div class="gift-info-img-column flex-row flex-start-center padding-20-30">
      <span class="gift-info-name size-28">图片（必填）</span>
      <UploadImg
        class="flex-1"
        :max-size="0.2"
        :max-length="1"
        :quality="0.1"
        :column="column"
        @trigger-change="handleChange"
        @trigger-delete="handleDelete"
      />
    </div>
  </div>
</template>

<script>
import UploadImg from "@yun/upload-img";
import HhfInput from "@hhf/hhf-input";
export default {
  name: "GiftInfo",

  components: {
    UploadImg,
    HhfInput
  },
  props: {
    result: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },

  computed: {
    column() {
      return this.result.base64Src
        ? [
            {
              src: this.result.base64Src
            }
          ]
        : [];
    },
    giftName: {
      get() {
        return this.result.gift_name;
      },
      set(val) {
        this.$emit("trigger-change", {
          ...this.result,
          gift_name: val
        });
      }
    }
  },

  mounted() {},

  methods: {
    handleChange(obj) {
      this.$emit("trigger-change", {
        ...this.result,
        img: obj.src,
        base64Src: obj.base64Src
      });
    },
    handleDelete() {
      this.$emit("trigger-change", {
        ...this.result,
        img: "",
        base64Src: ""
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.gift-info-name
  padding-right rems(10)
</style>
