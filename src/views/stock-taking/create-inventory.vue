<!-- 新建盘点 -->
<template>
  <div class="create-inventory">
    <van-radio-group v-model="radio">
      <template>
        <div
          class="flex-row flex-between-center size-28 color-393d49 create-inventory-store bgcolor-f"
          @click="radio = '1'"
        >
          <van-radio name="1"><span class="weight-bold">西溪印象城</span></van-radio>
          <span class="color-error size-24">盘点中</span>
        </div>
        <div class="border"></div>
      </template>
      <template>
        <div
          class="flex-row flex-between-center size-28 color-393d49 create-inventory-store bgcolor-f"
          @click="radio = '2'"
        >
          <van-radio name="2"><span class="weight-bold">西溪印象城</span></van-radio>
          <span class="color-error size-24">盘点中</span>
        </div>
        <div class="border"></div>
      </template>
    </van-radio-group>
    <div class="create-inventory-btn">
      <div class="create-inventory-btn-container">
        <HhfButton type="info" size="large">开始盘点</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'create_inventory',

  data () {
    return {
      radio: null
    }
  },

  components: {
    HhfButton
  },

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.create-inventory
  .create-inventory-store
    padding rems(30) rems(20)
  .create-inventory-btn
    height rems(100)
    .create-inventory-btn-container
      position fixed
      left 0
      bottom 0
      width 100%
</style>
