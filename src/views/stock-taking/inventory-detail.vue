<!-- 盘点单详情 -->
<template>
  <div class="inventory-detail">
    <ul class="flex-row flex-between-center bgcolor-f padding-20-30">
      <li class="color-393d49 size-28">订单号：{{result.order_id}}</li>
      <li :class="['size-24', getColor(result.status)]">{{status[result.status]}}</li>
    </ul>
    <!-- 礼品列表 -->
    <div class="margin-top-20 bgcolor-f">
      <template>
        <van-cell
          title="盘点列表"
          is-link
          value="查看全部"
          @click="$router.push({name: 'inventory_gift_list', query: { id: result.inventory_id, sid: result.store_id }})"
        />
        <div class="border"></div>
      </template>
      <div v-for="items of result.gift_list" :key="items.gift_id">
        <div class="flex-row flex-between-center padding-20-30">
          <div class="flex-column flex-center-start color-393d49">
            <span class="size-30 padding-bottom-20">{{items.gift_name}}</span>
            <span class="size-24">编号{{items.gift_id}}</span>
          </div>
          <div class="size-24">
            <span v-if="items.num - items.sys_num > 0" class="color-success">+{{items.num - items.sys_num}}</span>
            <span v-else class="color-error">{{items.num - items.sys_num}}</span>
          </div>
        </div>
        <div class="border"></div>
      </div>
      <div class="text-right size-28 color-393d49 padding-20-30">
        盘盈<i class="color-success">{{result.profit_num}}</i>个，盘亏<i class="color-error">{{result.deficit_num}}</i>个
      </div>
    </div>
    <!-- 申请人 -->
    <div class="margin-top-20 bgcolor-f">
      <h5 class="size-28 color-393d49 padding-20-30 margin-0">申请信息</h5>
      <div class="border"></div>
      <div class="flex-row flex-between-center size-28 color-393d49 padding-20-30">
        <span>申请人：{{result.c_name}}（{{result.c_phone}}）</span>
        <span>{{getTime(result.create_time)}}</span>
      </div>
    </div>
    <!-- 审核说明 -->
    <div class="margin-top-20 bgcolor-f" v-if="result.audit_time > 0">
      <h5 class="size-28 color-393d49 padding-20-30 margin-0">审核说明</h5>
      <div class="border"></div>
      <div class="size-28 color-393d49 padding-20-30">商家承担￥{{result.money}}</div>
      <div class="border"></div>
      <p class="size-28 color-393d49 padding-20-30 margin-0">{{result.remark}}</p>
      <div class="border"></div>
      <div class="flex-row flex-between-center size-28 color-393d49 padding-20-30">
        <span>审核人：{{result.user_name}}（{{result.phone}}）</span>
        <span>{{getTime(result.audit_time)}}</span>
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
import { getInventoryDetailApi } from '@/api'
import { STOCK_TAKING_STATUS } from '@l/judge'
import moment from 'moment'
export default {
  name: 'inventory_detail',

  data () {
    return {
      result: {},
      status: STOCK_TAKING_STATUS
    }
  },

  components: {
    HhfButton
  },

  computed: {},

  methods: {
    getTime (time) {
      return moment(time * 1000).format('YYYY-MM-DD hh:mm:ss')
    },
    getColor (status) {
      switch (status) {
        case '4':
          return 'color-success'
        case '6':
          return 'color-c'
        default:
          return 'color-error'
      }
    },
    getInventoryDetail () {
      const {
        id,
        sid
      } = this.$route.query
      getInventoryDetailApi({
        store_id: sid,
        inventory_id: id
      }).then(res => {
        if (res.return_code === '0') {
          this.result = res.data
        } else if (res.msg) {
          this.$Tip.warning({
            content: res.msg
          })
        }
      })
    }
  },
  created () {
    this.getInventoryDetail()
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
