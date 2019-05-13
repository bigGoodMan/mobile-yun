<!-- 盘点单元格 -->
<template>
  <ul class="stock-taking-list bgcolor-f2">
    <template v-for="items of list">
      <li class="stock-taking-list-cell bgcolor-f" :key="items.inventory_id" @click="handleRouter(items)">
        <div class="flex-row flex-between-center stock-taking-list-first">
          <span class="color-393d49 size-32">{{items.name}}</span>
          <span :class="['size-24', getColor(items.status)]">{{status[items.status]}}</span>
        </div>
        <div class="stock-taking-list-second size-28 color-393d49">
          <span>订单号：{{items.order_id}}</span>
        </div>
        <div class="stock-taking-list-third flex-row flex-between-center size-24 color-393d49">
          <span>
            盘盈<i class="color-success">{{items.profit_num}}</i>个，盘亏<i class="color-error">{{items.deficit_num}}</i>个
          </span>
          <span>{{getTime(items.create_time)}}</span>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { STOCK_TAKING_STATUS } from '@l/judge'
// import moment from 'moment'
export default {
  name: 'stock_taking_list',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      status: STOCK_TAKING_STATUS
    }
  },

  components: {},

  computed: {},

  methods: {
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
    getTime (time) {
      return moment(time * 1000).format('YYYY-MM-DD hh:mm:ss')
    },
    handleRouter (items) {
      const inventoryId = items.inventory_id
      const storeId = items.store_id
      if (items.status === '6') {
        this.$Tip.warning('该盘点单已取消')
        return
      }
      if (items.status === '2') {
        this.$router.push({
          name: 'inventorying',
          query: {
            id: inventoryId,
            sid: storeId
          }
        })
        return
      }
      this.$router.push({
        name: 'inventory_detail',
        query: {
          id: inventoryId,
          sid: storeId
        }
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.stock-taking-list
  margin 0
  list-style none
  .stock-taking-list-cell
    padding rems(20)
    margin-bottom rems(10)
    .stock-taking-list-first
      margin-bottom rems(20)
    .stock-taking-list-third
      margin-top rems(20)
</style>
