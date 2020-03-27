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
import Vue from 'vue'
import MyStore from '@yun/my-store'
import RechargePackageDetail from './components/recharge-package-detail'
import RechargePackageConfiguration from './components/recharge-package-configuration'
import { mapActions } from 'vuex'
export default {
  name: 'ConsumptionPackage',

  data () {
    return {
      store_id: null
    }
  },
  provide () {
    this.tab = Vue.observable({
      type: 1
    })
    return {
      tab: this.tab
    }
  },
  components: {
    MyStore,
    RechargePackageDetail,
    RechargePackageConfiguration
  },

  computed: {},

  methods: {
    ...mapActions(['SET_MEAL_GETRECHARGEPACKAGELIST_ACTION']),
    // 选择门店回调
    handleConfirm (data) {
      this.store_id = data.value.store_id
      this.SET_MEAL_GETRECHARGEPACKAGELIST_ACTION(this.store_id)
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
