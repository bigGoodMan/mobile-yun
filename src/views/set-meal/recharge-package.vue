<!-- 充值套餐 -->
<template>
  <div class="recharge-package">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :store-id="store_id"
        :default-index="0"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
    </div>
    <div class="main">
      <RechargePackageDetail v-if="tab.type === 1" />
      <RechargePackageConfiguration v-else/>
    </div>
  </div>
</template>

<script>
import RechargePackageDetail from './components/recharge-package-detail'
import Vue from 'vue'
import RechargePackageConfiguration from './components/recharge-package-configuration'
import MyStore from '@yun/my-store'
export default {
  name: 'ConsumptionPackage',

  data () {
    const packageData = Array(4)
      .fill({ checked: false, text: '10' })
      .map(v => ({ ...v }))
    return {
      store_id: null,
      packageData
    }
  },
  provide () {
    this.tab = Vue.observable({
      type: 1
    })
    return {
      tab: this.tab,
      packageData: this.packageData
    }
  },
  components: {
    MyStore,
    RechargePackageDetail,
    RechargePackageConfiguration
  },

  computed: {},

  methods: {
    // 选择门店回调
    handleConfirm (data) {
      this.store_id = data.value.store_id
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    }
  },
  mounted () {}
}
</script>
<style lang="stylus">
.recharge-package
  .container
    .van-grid-item__content
      padding 0
</style>
