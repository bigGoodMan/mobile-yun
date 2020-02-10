<!-- 无限抓列表 -->
<template>
  <div class="padding-20-30 flex-row flex-between-center free-grasp-cell bgcolor-f">
    <div class="flex-column flex-start-stretch free-grasp-cell-left">
      <LoadingImg :img="info.img" class="free-grasp-cell-img"/>
    </div>
    <div class="flex-column flex-between-start">
      <h5 class="size-26">{{info.area_id}}区-{{info.no}}</h5>
      <div class="flex-row flex-between-center">
          <van-switch v-model="checked" @change="handleChange"
          :loading="loading" />
          <span class="padding-left-30 size-26">{{switchName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingImg from '@yun/loading-img/loading-img'
import { setFreeInfiniteGraspApi } from '@/api'
export default {
  name: 'FreeGraspCell',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      loading: false,
      switchName: '关',
      checked: false
    }
  },

  components: {
    LoadingImg
  },
  watch: {
    info: {
      handler (currVal) {
        this.checked = currVal.checked
        this.switchName = currVal.checked ? '开' : '关'
      },
      immediate: true
    }
  },
  computed: {},

  methods: {
    handleChange (checked) {
      this.loading = true
      this.$emit('trigger-change', checked)
      setFreeInfiniteGraspApi({
        machine_id: this.info.machine_id,
        action: checked - 0
      }).then(res => {
        if (res.return_code !== '0') {
          this.$Tip.warning(res.msg)
          return
        }
        this.switchName = checked ? '开' : '关'
        this.loading = false
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.free-grasp-cell
  .free-grasp-cell-left
    width rems(200)
    height rems(200)
    background-color: #e3e3e3
  .free-grasp-cell-img
    height 100%
</style>
