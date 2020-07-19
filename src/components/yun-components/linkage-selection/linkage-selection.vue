<!-- 联动选择 -->
<template>
  <div>
    <CellList
      :title="title"
      :value="value"
      :right-icon="rightIcon"
      :placeholder="placeholder"
      @trigger-click="show = true"
    >
      <template v-if="$slots.title" #title>
        <slot name="title"></slot>
      </template>
      <template v-if="$slots['right-icon']" #right-icon>
        <slot name="right-icon"></slot>
      </template>
    </CellList>

    <BottomPopup
      :columns="columns"
      :default-index="defaultIndex"
      :show="show"
      @trigger-confirm="handleConfirm"
      @trigger-close="show = false"
    />
  </div>
</template>

<script>
import CellList from "@yun/cell-list";
import BottomPopup from "@yun/bottom-popup";
export default {
  name: "LinkageSelection",

  components: {
    CellList,
    BottomPopup
  },
  model: {
    prop: "value",
    event: "trigger-confirm"
  },
  props: {
    value: {
      default: ""
    },
    defaultIndex: Number,
    disabled: {
      type: Boolean,
      default: false
    },
    title: String,
    placeholder: String,
    columns: Array,
    rightIcon: {
      type: String
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
      if (!this.disabled) {
        this.$emit("trigger-confirm", obj);
      }
    }
  }
};
</script>
<style lang="stylus" scoped></style>
