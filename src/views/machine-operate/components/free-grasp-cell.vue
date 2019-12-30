<!-- 无限抓列表 -->
<template>
  <div class="padding-20-30 flex-row flex-between-center free-grasp-cell bgcolor-f">
    <div class="flex-column flex-start-stretch">
      <WatchImg/>
    </div>
    <div class="flex-column flex-between-start">
      <h5>xx区-99</h5>
      <div>
          <van-switch v-model="checked" @change="handleChange"
          :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import WatchImg from '@yun/watch-img/watch-img'
export default {
  name: 'FreeGraspCell',
  model: {
    prop: 'checked',
    event: 'trigger-change'
  },
  data () {
    return {
      loading: false
    }
  },

  components: {
    WatchImg
  },

  computed: {},

  methods: {
    handleChange (checked) {
      this.$emit('trigger-change', checked)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
