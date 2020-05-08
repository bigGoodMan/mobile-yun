<!-- 充值套餐 -->
<template>
  <div class="recharge-package">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :store-id="storeId"
        :default-index="0"
      >
        <div class="flex-row flex-end-center flex-1">
          <TipIcon/>
        </div>
      </MyStore>
    </div>
    <div class="main">
      <RechargePackageDetail v-if="tab === 1" />
      <RechargePackageConfiguration v-else/>
    </div>
  </div>
</template>

<script>
import MyStore from '@yun/my-store'
import RechargePackageDetail from './components/recharge-package-detail'
import RechargePackageConfiguration from './components/recharge-package-configuration'
import TipIcon from '@yun/icon-components/tip-icon'
import { mapActions } from 'vuex'
export default {
  name: 'ConsumptionPackage',

  data () {
    return {
      storeId: null,
      tab: 1
    }
  },
  provide () {
    // let tab = Vue.observable({
    //   type: 1
    // })
    return {
      params: this.$data
    }
  },
  components: {
    MyStore,
    RechargePackageDetail,
    RechargePackageConfiguration,
    TipIcon
  },

  computed: {},

  methods: {
    ...mapActions(['SET_MEAL_GETRECHARGEPACKAGELIST_ACTION']),
    // 选择门店回调
    handleConfirm (data) {
      this.storeId = data.value.store_id
      this.SET_MEAL_GETRECHARGEPACKAGELIST_ACTION(this.storeId)
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    }
  },
  created () {
    const {
      sid
    } = this.$route.query
    if (sid) {
      this.storeId = sid
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
