<!-- 消费套餐项目 -->
<template>
  <div class="consumption-package-item flex-row flex-between-center bgcolor-f">
    <div class="info flex-column flex-start">
      <span class="color-ff5722 size-24 padding-bottom-30">{{
        rulesTitle
      }}</span>
      <span class="size-26">{{ packageItem.title }}</span>
    </div>
    <template v-if="typeof packageItem.checked === 'boolean'">
      <van-checkbox :value="packageItem.checked" @click="handleChecked"></van-checkbox>
    </template>
    <template v-else>
      <HhfButton
        type="info"
        size="small"
        class="size-26"
        @trigger-click="handleEdit"
        >编辑</HhfButton
      >
      <div class="cross" @click="handleDelete">
        <van-icon
          name="cross"
          color="#ee0a24"
          size="16px"
          class="weight-bold"
        />
      </div>
    </template>
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

  computed: {
    rulesTitle () {
      const { limit, discount } = this.packageItem
      return `满${limit}局送${discount}局`
    }
  },

  methods: {
    handleDelete (items) {
      this.$emit('trigger-delete', this.packageItem)
    },
    handleEdit () {
      this.$emit('trigger-edit', this.packageItem)
    },
    handleChecked () {
      this.$emit('trigger-checked', this.packageItem)
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
