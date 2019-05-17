<!-- 新增编辑礼品 -->
<template>
  <div class="add-edit-gift bgcolor-f2">
    <!-- 所属商家 -->
    <div class="add-edit-gift-margin">
        <van-cell
          title="所属商家"
          :value="storeName"
          is-link
        />
    </div>
    <!-- 礼品信息 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <GiftInfo />
    </div>
    <!-- 基础参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">基础参数</h5>
      <div class="border border-ebedf0"></div>
      <GiftBasicParameters :result="basicData" @trigger-change="handleChangeBasic" />
    </div>
    <!-- 天车参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">天车参数</h5>
      <div class="border border-ebedf0"></div>
      <GiftCrownBlockParameters />
    </div>
    <!-- 抓力参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">抓力参数</h5>
    <div class="border border-ebedf0"></div>
      <GraspingPowerParameters />
    </div>
    <!-- 预警参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">预警参数</h5>
    <div class="border border-ebedf0"></div>
      <GiftEarlyWarningParameters />
    </div>
    <div class="padding-20-30 size-0">
        <HhfButton
          size="large"
          type="info"
          :loading="loading"
          radius="0.05rem"
        >保存</HhfButton>
    </div>
  </div>
</template>

<script>
import GiftInfo from '@yun/create-gift/gift-info'
import GiftBasicParameters from '@yun/create-gift/gift-basic-parameters'
import GraspingPowerParameters from '@yun/create-gift/grasping-power-parameters'
import GiftCrownBlockParameters from '@yun/create-gift/gift-crown-block-parameters'
import GiftEarlyWarningParameters from '@yun/create-gift/gift-early-warning-parameters'
import HhfButton from '@hhf/hhf-button'
import { setTitle } from '@l/utils'
export default {
  name: '',

  data () {
    return {
      storeName: '木马王国',
      loading: false,
      // 基础参数
      basicData: { type_name: '乐淘机', type_id: '53', claw_type: '5-5', profit: 1 }
    }
  },

  components: {
    GiftInfo,
    GiftBasicParameters,
    GiftCrownBlockParameters,
    GraspingPowerParameters,
    GiftEarlyWarningParameters,
    HhfButton
  },

  computed: {},

  methods: {
    handleChangeBasic (dt) {
      this.basicData = dt
    }
  },
  created () {
    const { id } = this.$route.query
    if (id) {
      setTitle('编辑礼品')
    } else {
      setTitle('新增礼品')
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.add-edit-gift
  .add-edit-gift-margin
    margin-top rems(20)
  .add-edit-gift-title
    margin 0
</style>
