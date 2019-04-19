<!-- 我的机台 -->
<template>
  <div>
    <BottomPopup :columns="columns" @trigger-confirm="handleConfirm">
  </div>
</template>

<script>
import BottomPopup from '@yun/bottom-popup'
export default {
  name: 'my_machine',

  data () {
    return {
      columns: []
    }
  },

  components: {
    BottomPopup
  },

  computed: {},

  methods: {
    handleConfirm (data) {

    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
