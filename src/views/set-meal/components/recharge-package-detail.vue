<!-- 充值套餐详情 -->
<template>
  <div class="recharge-package-detail">
    <div class="title flex-row flex-between-center">
      <span class="size-26">当前套餐折扣</span>
        <van-button type="info" size="small" @click="handleConfigure">重新配置</van-button>
    </div>
    <dl class="container bgcolor-f" v-for="value of 10" :key="value">
      <dt class="size-30 price border">10元</dt>
      <dd class="content">
        <van-grid :gutter="10">
          <van-grid-item v-for="(items, index) of packageData" :key="index">
            <RechargePackageItem :checked="items.checked" text="牛皮">
              <template #left-top>
                <span class="size-24 weight-bold color-ff5722">7折</span>
              </template>
            </RechargePackageItem>
          </van-grid-item>
        </van-grid>
      </dd>
    </dl>
  </div>
</template>

<script>
import RechargePackageItem from './recharge-package-item'
export default {
  name: 'RechargePackageDetail',

  data () {
    return {}
  },
  inject: ['packageData', 'tab'],
  components: {
    RechargePackageItem
  },

  computed: {},

  methods: {
    handleConfigure () {
      this.tab.type = 2
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.recharge-package-detail
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
