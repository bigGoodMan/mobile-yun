<!-- 盘点中 -->
<template>
  <div class="inventorying">
    <!-- 头部搜索 -->
    <div>
      <HeaderSearch
        v-model="filterValue"
        placeholder="请输入礼品名称或编号"
        @trigger-search="handleSearch"
      />
    </div>
    <!-- 统计&添加礼品 -->
    <div class="flex-row flex-between-center bgcolor-f inventorying-header-data">
      <div class="flex-column flex-between-start">
        <span class="size-28 color-393d49 inventorying-store">西溪印象城</span>
        <span class="size-24 color-393d49">共<i class="color-success">x</i>款，实盘数<i class="color-success">y</i></span>
      </div>
      <HhfButton type="info" size="small" radius="0.4rem" @trigger-click="$router.push({name: 'more_gift'})">添加更多礼品</HhfButton>
    </div>
    <!-- 盘点中列表 -->
    <div class="inventorying-container">
      <InventoryingList />
    </div>
    <div class="inventorying-btn">
      <ul class="inventorying-btn-container flex-row flex-center">
        <li style="width: 30%">
          <HhfButton type="default" size="large">关闭</HhfButton>
        </li>
        <li style="width: 70%">
          <HhfButton type="info" size="large">提交</HhfButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import HeaderSearch from '@yun/header-search'
import InventoryingList from '@yun/stock-taking/inventorying-list'
export default {
  name: 'inventorying',

  data () {
    return {
      filterValue: '',
      filterShow: false,
      giftShow: false
    }
  },

  components: {
    HeaderSearch,
    HhfButton,
    InventoryingList
  },

  computed: {},

  methods: {
    handleShowPopup (key, boo) {
      this[key] = boo
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.inventorying
  .inventorying-header-data
    padding rems(20)
    .inventorying-store
      margin-bottom rems(20)
  .inventorying-container
    margin-top rems(20)
  .inventorying-btn
    height rems(100)
    .inventorying-btn-container
      position fixed
      bottom 0
      left 0
      width 100%
</style>
