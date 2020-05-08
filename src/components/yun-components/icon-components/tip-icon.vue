<!-- 提示图标 -->
<template>
    <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
</template>

<script>
export default {
  name: 'TipIcon',

  data () {
    return {
      tip: null
    }
  },

  components: {},

  computed: {},

  methods: {
    handleRouter () {
      const {
        tip
      } = this
      if (tip) {
        location.href = tip
      }
    }
  },
  created () {
    const {
      meta
    } = this.$route
    if (meta && meta.tip) {
      this.tip = meta.tip
    }
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
