<!-- 图标 -->
<template>
  <span :class="wrapClasses" :style="styles" @click="handleClick"></span>
</template>

<script>
export default {
  name: "HhfIcon",

  components: {},
  props: {
    classes: [Array, String],
    styles: Object,
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },

  computed: {
    wrapClasses() {
      let cls = ["hhf-icon", "hhf-iconfont", `hhf-icon-${this.name}`];
      if (Object.prototype.toString.call(this.classes) === "[object Array]") {
        cls = [...cls, ...this.classes];
      } else if (typeof this.classes === "string") {
        const arrCls = this.classes.split(" ");
        cls = [...cls, ...arrCls];
      }
      return cls;
    }
  },

  mounted() {},

  methods: {
    handleClick() {
      this.$emit("trigger-click");
    }
  }
};
</script>
<style lang="stylus" scoped></style>
