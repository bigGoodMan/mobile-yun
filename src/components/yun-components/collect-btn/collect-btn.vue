<!-- 收藏按钮 -->
<template>
  <span> </span>
</template>

<script>
export default {
  name: "CollectBtn",

  components: {},
  model: {
    prop: "checked",
    event: "trigger-change"
  },
  props: {
    checked: {
      default: false,
      type: Boolean
    },
    color: {
      type: String,
      default: "#e91e63"
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang="stylus" scoped></style>
