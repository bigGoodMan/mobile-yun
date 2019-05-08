<!-- 库存盘点 -->
<template>
  <div class="stock-taking">
    <!-- 头部搜索 -->
    <div>
      <HeaderSearch
        v-model="value"
        @trigger-click="handleShowPopup(true)"
        @trigger-search="handleSearch"
        filter
      />
    </div>
    <!-- 盘点列表 -->
    <div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="handleRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoading"
        >
          <StockTakingList />
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 盘点按钮 -->
    <div class="stock-taking-create-btn">
      <div class="stock-taking-create-btn-container">
        <HhfButton type="info" size="large">盘点</HhfButton>
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
export default {
  name: 'stock_taking',

  data () {
    return {
      value: '',
      show: false,
      isLoading: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false // 完成
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
    handleSearch (val) {},
    // 展示筛选窗
    handleShowPopup (boo) {
      this.show = boo
    },
    // 确定筛选内容
    handleFilterConfirm (dt) {
      console.log(dt)
    },
    // 下拉刷新
    handleRefresh () {
      setTimeout(() => {
        this.$Tip.success({
          content: '刷新成功！',
          position: 'center',
          transitionName: 'fade'
        })
        this.isLoading = false
      }, 500)
    },
    // 上拉加载
    handleLoading (e) {
      this.loading = false
      this.finished = true
      console.log(e)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.stock-taking
  .stock-taking-create-btn
    height rems(100)
    .stock-taking-create-btn-container
      position fixed
      bottom 0
      left 0
      width 100%
      font-size 0
</style>
