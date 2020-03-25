<!-- 充值套餐配置 -->
<template>
  <div class="recharge-package-configuration">
    <div class="title flex-row flex-left-center">
      <span class="size-26">请选择充值折扣</span>
    </div>
    <dl class="container bgcolor-f" v-for="value of 10" :key="value">
      <dt class="size-30 price border flex-row flex-between-center">
        <span>10元</span
        ><van-checkbox v-model="checked" shape="square">推荐</van-checkbox>
      </dt>
      <dd class="content">
        <van-grid :gutter="10">
          <van-grid-item v-for="(items, index) of packageData" :key="index">
            <RechargePackageItem v-model="items.checked" text="牛皮">
              <template #left-top>
                <span class="size-24 weight-bold color-ff5722">7折</span>
              </template>
            </RechargePackageItem>
          </van-grid-item>
        </van-grid>
      </dd>
    </dl>
    <div class="height-100">
      <div class="fixed-max-width bottom-0 zindex-2">
        <HhfButton type="info" size="large">保存配置</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import RechargePackageItem from './recharge-package-item'
export default {
  name: 'RechargePackageConfiguration',

  data () {
    return {
      checked: false
    }
  },
  inject: ['packageData'],
  components: {
    RechargePackageItem,
    HhfButton
  },

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus">
.recharge-package-configuration
  .title
    padding 15px 10px
  .container
    margin 0
    margin-bottom rems(30)
    padding-bottom rems(30)
    .price
      padding rems(20) 0
      margin 0 10px
    .content
      margin-left 0
      padding-top rems(30)
</style>
