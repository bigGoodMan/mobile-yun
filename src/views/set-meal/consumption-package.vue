<!-- 消费套餐 -->
<template>
  <div class="consumption-package">
    <div class="header bgcolor-f">
      <MyStore @trigger-click="handleConfirm" :store-id="store_id" :default-index="0">
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
    </div>
    <div class="main">
      <dl class="container margin-0">
        <dt class="size-26 title">当前消费套餐</dt>
        <dd class="content" v-for="value of 10" :key="value"><ConsumptionPackageItem/></dd>
      </dl>
    </div>
    <div class="height-100">
      <div class="fixed-max-width bottom-0 zindex-2">
        <HhfButton type="info" size="large">新增消费套餐</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import MyStore from '@yun/my-store'
import ConsumptionPackageItem from './components/consumption-package-item'
export default {
  name: 'ConsumptionPackage',

  data () {
    return {
      store_id: null
    }
  },

  components: {
    MyStore,
    HhfButton,
    ConsumptionPackageItem
  },

  computed: {

  },

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
  mounted () {
  }
}
</script>
<style lang="stylus">
.consumption-package
  .main
    .container
      .title
        padding rems(30) rems(20)
      .content
        margin 0
        padding 0 rems(30) rems(30)
</style>
