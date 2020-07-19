<!-- 单元格选择器 -->
<template>
  <div>
    <div>
      <van-cell :title="title" :value="value" is-link @click="show = true" />
    </div>
    <BottomPopup
      :columns="columns"
      :show="show"
      @trigger-confirm="handleConfirm"
      @trigger-close="show = false"
    />
  </div>
</template>

<script>
import BottomPopup from "@yun/bottom-popup";
export default {
  name: "CellPicker",

  components: {
    BottomPopup
  },
  props: {
    title: String,
    value: [String, Number],
    columns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handleConfirm(obj) {
      this.$emit("trigger-confirm", obj.value[0]);
    }
  }
};
</script>
<style lang="stylus" scoped></style>
