<!-- 消费套餐项目 -->
<template>
  <div class="consumption-package-item flex-row flex-between-center bgcolor-f">
    <div class="info flex-column flex-start">
      <span class="color-ff5722 size-24 padding-bottom-30">满2局送1局</span>
      <span class="size-26">测试套餐</span>
    </div>
    <HhfButton type="info" size="small" class="size-26" @trigger-click="handleEdit">编辑</HhfButton>
    <div class="cross" @click="handleDelete">
      <van-icon name="cross" color="#ee0a24" size="16px" class="weight-bold" />
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'ConsumptionPackageItem',

  data () {
    return {}
  },
  props: {
    packageItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    HhfButton
  },

  computed: {},

  methods: {
    handleDelete (items) {
      this.$emit('trigger-delete', this.packageItem)
    },
    handleEdit () {
      this.$emit('trigger-edit', this.packageItem)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.consumption-package-item
  position relative
  border 1px solid #dddddd
  padding rems(20) rems(70) rems(20) rems(30)
  border-radius rems(10)
  .cross
    position absolute
    font-size 0
    top rems(5)
    right rems(5)
</style>
