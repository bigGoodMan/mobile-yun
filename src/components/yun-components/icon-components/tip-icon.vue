<!-- 提示图标 -->
<template>
  <van-icon name="question-o" size="0.4rem" @click="handleRouter" />
</template>

<script>
export default {
  name: "TipIcon",

  components: {},

  data() {
    return {
      tip: null
    };
  },

  computed: {},
  created() {
    const { meta } = this.$route;
    if (meta && meta.tip) {
      this.tip = meta.tip;
    }
  },
  mounted() {},

  methods: {
    handleRouter() {
      const { tip } = this;
      if (tip) {
        location.href = tip;
      }
    }
  }
};
</script>
<style lang="stylus" scoped></style>
