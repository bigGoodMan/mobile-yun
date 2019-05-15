<!-- 自建礼品列表 -->
<template>
  <div class="create-gift-list">
    <div class="create-gift-list-header">
      <HeaderSearch
        v-model="value"
        @trigger-search="handleSearch"
        placeholder="请输入礼品名称或编号"
      />
    </div>
    <!-- 礼品列表内容 -->
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
        <div
          v-for="(items, index) of list"
          :key="index"
        >
          <GiftList :result="items" />
          <div class="border"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 按钮 -->
    <div class="height-100">
    <div class="fixed-max-width bottom-0 size-0">
        <HhfButton type="info" size="large" @trigger-click="$router.push({ name: 'create_inventory' })">新增礼品</HhfButton>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@yun/header-search'
import HhfButton from '@hhf/hhf-button'
import GiftList from '@yun/gift-list'
export default {
  name: 'create_gift_list',

  data () {
    return {
      list: [
        {
          gift_id: 1,
          gift_name: '13cm大肥肥',
          thumb: 'http://img.hahaipi.com/gift/14/14751496243321.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,Q_80',
          img: 'http://img.hahaipi.com/gift/14/14751496243321.jpg'
        },
        {
          gift_id: 2,
          gift_name: '13cm大肥肥',
          thumb: 'http://img.hahaipi.com/gift/14/14751496243321.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,Q_80',
          img: 'http://img.hahaipi.com/gift/14/14751496243321.jpg'
        },
        {
          gift_id: 3,
          gift_name: '13cm大肥肥',
          thumb: 'http://img.hahaipi.com/gift/14/14751496243321.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,Q_80',
          img: 'http://img.hahaipi.com/gift/14/14751496243321.jpg'
        }
      ],
      isLoading: false, // 下拉刷新loading状态
      loading: false, // 上拉加载loading状态
      finished: true // 是否加载完成
    }
  },

  components: {
    HeaderSearch,
    GiftList,
    HhfButton
  },

  computed: {},

  methods: {
    // 搜索
    handleSearch (val) {

    },
    // 下拉刷新
    handleRefresh () {
      console.log(this.isLoading)
      setTimeout(() => {
        this.isLoading = false
      }, 1)
    },
    // 上拉加载
    handleLoading () {

    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.create-gift-list-header
  position relative
  z-index 1
</style>
