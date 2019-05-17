<!-- 自建礼品列表 -->
<template>
  <div class="create-gift-list">
    <div class="create-gift-list-header">
      <HeaderSearch
        v-model="giftSearch"
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
          <GiftList :result="items" @trigger-click="$router.push({ name: 'create_gift_detail', query: { id: items.gift_id } })" />
          <div class="border"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 按钮 -->
    <div class="height-100">
    <div class="fixed-max-width bottom-0 size-0">
        <HhfButton type="info" size="large" @trigger-click="$router.push({ name: 'add_edit_gift' })">新增礼品</HhfButton>
    </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from '@yun/header-search'
import HhfButton from '@hhf/hhf-button'
import GiftList from '@yun/gift-list'
import { getGiftCreateListApi } from '@/api'
export default {
  name: 'create_gift_list',

  data () {
    return {
      list: [],
      isLoading: false, // 下拉刷新loading状态
      loading: false, // 上拉加载loading状态
      finished: true, // 是否加载完成

      giftSearch: '', // 搜索内容
      page: 1
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
      this.page = 1
      this.getGiftCreateList(dt => {
        this.list = dt
      })
    },
    getGiftCreateList (callback = () => {}) {
      this.$Loading({
        message: '加载中...'
      })
      let {
        giftSearch,
        page
      } = this
      getGiftCreateListApi({
        gift_id: giftSearch,
        page: page
      }).then(res => {
        let arr = []
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.page = ++page
          arr = res.data
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          })
        }
        callback(arr)
      })
    },
    // 下拉刷新
    handleRefresh () {
      this.page = 1
      this.getGiftCreateList(dt => {
        this.list = dt
        this.isLoading = false
      })
    },
    // 上拉加载
    handleLoading () {
      this.getGiftCreateList((dt) => {
        this.list = this.list.concat(dt)
        this.finished = dt.length === 0
        this.loading = false
      })
    }
  },
  mounted () {
    this.handleLoading()
  }
}
</script>
<style lang="stylus" scoped>
.create-gift-list-header
  position relative
  z-index 1
</style>
