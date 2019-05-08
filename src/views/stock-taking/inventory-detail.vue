<!-- 盘点单详情 -->
<template>
  <div class="inventory-detail">
    <ul class="flex-row flex-between-center bgcolor-f padding-20-30">
      <li class="color-393d49 size-28">订单号：pd1231231231</li>
      <li class="color-error size-24">待审核</li>
    </ul>
    <!-- 礼品列表 -->
    <div class="margin-top-20 bgcolor-f">
      <template>
        <van-cell
          title="盘点列表"
          is-link
          value="查看全部"
          @click="$router.push({name: 'inventory_gift_list'})"
        />
        <div class="border"></div>
      </template>
      <template>
        <div class="flex-row flex-between-center padding-20-30">
          <div class="flex-column flex-center-start color-393d49">
            <span class="size-30 padding-bottom-20">30cm大猩猩</span>
            <span class="size-24">编号1231231</span>
          </div>
          <div class="color-success size-24">+2</div>
        </div>
        <div class="border"></div>
      </template>
      <div class="text-right size-28 color-393d49 padding-20-30">
        盘盈<i class="color-success">m</i>个，盘亏<i class="color-error">n</i>个
      </div>
    </div>
    <!-- 申请人 -->
    <div class="margin-top-20 bgcolor-f">
      <h5 class="size-28 color-393d49 padding-20-30 margin-0">申请信息</h5>
      <div class="border"></div>
      <div class="flex-row flex-between-center size-28 color-393d49 padding-20-30">
        <span>申请人：胡哥（18888727875）</span>
        <span>2018-12-12 12:23</span>
      </div>
    </div>
    <!-- 审核说明 -->
    <div class="margin-top-20 bgcolor-f">
      <h5 class="size-28 color-393d49 padding-20-30 margin-0">审核说明</h5>
      <div class="border"></div>
      <div class="size-28 color-393d49 padding-20-30">商家承担￥64530</div>
      <div class="border"></div>
      <p class="size-28 color-393d49 padding-20-30 margin-0">大事发生的发生发的撒范德萨发的发生大事发生的发生发的撒范德萨发的发生</p>
      <div class="border"></div>
      <div class="flex-row flex-between-center size-28 color-393d49 padding-20-30">
        <span>审核人：胡哥（18888727875）</span>
        <span>2018-12-12 12:23</span>
      </div>
    </div>
    <div class="inventory-detail-btn">
      <div class="inventory-detail-btn-container">
        <HhfButton type="info" size="large">重新开始盘点</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'inventory_detail',

  data () {
    return {
    }
  },

  components: {
    HhfButton
  },

  computed: {},

  methods: {
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.inventory-detail
  .inventory-detail-btn
    height rems(100)
    .inventory-detail-btn-container
      position fixed
      left 0
      bottom 0
      width 100%
</style>
