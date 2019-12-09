<!-- 收藏按钮 -->
<template>
  <span>

  </span>
</template>

<script>
export default {
  name: 'CollectBtn',
  model: {
    prop: 'checked',
    event: 'trigger-change'
  },
  props: {
    checked: {
      default: false,
      type: Boolean
    },
    color: {
      type: String,
      default: '#e91e63'
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
