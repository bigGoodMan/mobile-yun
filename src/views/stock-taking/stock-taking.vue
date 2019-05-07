<!-- 库存盘点 -->
<template>
  <div class="stock-taking">
    <!-- 头部搜索 -->
    <div>
      <HeaderSearch v-model="value" @trigger-click="handleShowPopup(true)" @trigger-search="handleSearch"/>
    </div>
    <!-- 筛选类目 -->
    <StockTakingListFilter :show="show" @trigger-close="handleShowPopup(false)"/>
  </div>
</template>

<script>
import StockTakingListFilter from '@yun/stock-taking/stock-taking-list-filter'
import HeaderSearch from '@yun/header-search'
export default {
  name: 'stock_taking',

  data () {
    return {
      value: '',
      show: true
    }
  },

  components: {
    HeaderSearch,
    StockTakingListFilter
  },
  computed: {},

  methods: {
    handleShowPopup (boo) {
      this.show = boo
    },
    handleSearch (val) {}
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
