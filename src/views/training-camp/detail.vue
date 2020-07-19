<!-- 文章详情页 -->
<template>
  <div class="training-camp-detail">
    <iframe :src="url" class="detail-iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: "TrainingCampDetail",

  components: {},

  data() {
    return {};
  },

  computed: {},
  created() {
    const { url } = this.$route.query;
    this.url = url;
  },
  mounted() {},

  methods: {}
};
</script>
<style lang="stylus" scoped>
.training-camp-detail
  width 100vw
  height 100vh
  .detail-iframe
    width 100%
    height 100%
    border none
</style>
