<!-- 库存盘点 -->
<template>
  <div class="stock-taking bgcolor-f2">
    <!-- 头部搜索 -->
    <div class="stock-taking-header">
      <HeaderSearch
        v-model="value"
        @trigger-click="handleShowPopup(true)"
        @trigger-search="handleSearch"
        placeholder="请输入盘点单号"
        filter
      />
    </div>
    <!-- 盘点列表 -->
    <div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="handleRefresh"
        style="overflow:initial"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoading"
          :offset="10"
        >
        <!-- <div v-for="(items, index) in inventoryList" :key="index">{{index}}</div> -->
          <StockTakingList :list="inventoryList" />
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 盘点按钮 -->
    <div class="stock-taking-create-btn">
      <div class="stock-taking-create-btn-container">
        <HhfButton type="info" size="large" @trigger-click="$router.push({ name: 'create_inventory' })">盘点</HhfButton>
      </div>
    </div>
    <!-- 筛选类目 -->
    <StockTakingListFilter
      :show="show"
      @trigger-close="handleShowPopup(false)"
      @trigger-confirm="handleFilterConfirm"
    />
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import StockTakingListFilter from '@yun/stock-taking/stock-taking-list-filter'
import StockTakingList from '@yun/stock-taking/stock-taking-list'
import HeaderSearch from '@yun/header-search'
import { getInventoryListApi } from '@/api'
// import moment from 'moment'
export default {
  name: 'stock_taking',

  data () {
    return {
      value: '',
      show: false,
      isLoading: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 完成

      storeId: '0', // 门店id
      page: 1, // 页码
      orderId: '', // 盘点单号
      status: '0', // 全部
      startDate: 0, // 盘点创建时间（区间开始）
      endDate: 0, // 盘点创建时间（区间结束）

      inventoryList: [] // 盘点列表数据
    }
  },

  components: {
    HeaderSearch,
    StockTakingListFilter,
    HhfButton,
    StockTakingList
  },
  computed: {},

  methods: {
    handleSearch (val) {
      this.page = 1
      this.orderId = val
      this.getInventoryList((dt) => {
        this.inventoryList = dt
      })
    },
    // 展示筛选窗
    handleShowPopup (boo) {
      this.show = boo
    },
    // 确定筛选内容
    handleFilterConfirm (dt) {
      const {
        startDate,
        endDate,
        statusList,
        store
      } = dt
      this.startDate = startDate || 0
      this.endDate = endDate || 0
      this.storeId = store.store_id
      this.status = statusList.filter(v => v.checked).map(v => v.id)
      this.page = 1
      this.getInventoryList((dt) => {
        this.inventoryList = dt
      })
    },
    getInventoryList (callback = () => {}) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      let {
        page,
        storeId,
        startDate,
        endDate,
        orderId,
        status
      } = this
      getInventoryListApi({
        page: page,
        store_id: storeId,
        start_time: startDate,
        end_time: endDate,
        order_id: orderId,
        status
      }).then(res => {
        this.$toast.clear()
        let arr = []
        if (res.return_code === '0') {
          this.page = ++page
          arr = res.data
          callback(arr)
        } else if (res.msg) {
          callback(arr)
          this.$Tip.warning({
            message: res.msg
          })
        }
      })
    },
    // 下拉刷新
    handleRefresh () {
      this.page = 1
      this.getInventoryList((dt) => {
        this.inventoryList = dt
        this.isLoading = false
      })
    },
    // 上拉加载
    handleLoading (e) {
      this.getInventoryList((dt) => {
        this.inventoryList = this.inventoryList.concat(dt)
        this.finished = dt.length === 0
        this.loading = false
      })
    }
  },
  created () {
  },
  mounted () {
    // this.$Loading('111')
  }
}
</script>
<style lang="stylus" scoped>
.stock-taking
  min-height 100%
  .stock-taking-header
    position relative
    z-index 1
  .stock-taking-create-btn
    height rems(100)
    .stock-taking-create-btn-container
      position fixed
      bottom 0
      left 0
      width 100%
      font-size 0
</style>
