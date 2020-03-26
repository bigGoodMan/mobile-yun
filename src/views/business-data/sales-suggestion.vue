<!-- 销售提升建议 -->
<template>
  <div class="sales-suggestion">
    <div class="header bgcolor-f">
      <div class="fixed top-0 left-0 width-2half bgcolor-f" style="z-index: 10">
      <MyStore
        @trigger-click="handleConfirm"
        :store-id="store_id"
        :default-index="0"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
        <div class="border"></div>
        <SortList :sort-data="sortData" @trigger-click="handleSort"/>
        <div class="border"></div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <van-pull-refresh
          v-model="freshLoading"
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
            <div class="bgcolor-f" v-for="(items, index) of list" :key="index">
              <ul class="flex-row flex-between-center padding-0-20">
                <li class="relative flex-column flex-center content-first">
                  <span class="size-24 tag" :style="{color: isOnSaleStatus[items.is_on_sale].color}">{{isOnSaleStatus[items.is_on_sale].text}}</span>
                  <div class="img"><LoadingImg magnify fit="cover" :img="items.gift_img.img" :thumb="items.gift_img.thumb" class="max-width-2half max-height-2half"/></div>
                  <span class="text-ellipsis width-2half size-24">{{items.gift_name}}</span>
                </li>
                <li class="size-24 content-second">{{items.area_name}}-{{items.no}}</li>
                <li class="size-24 content-third">{{items.profit_rate}}%</li>
                <li class="size-24">{{saleSuggestion[items.suggestion]}}</li>
              </ul>
              <div class="border"></div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import SortList from '@yun/sort-list/sort-list.vue'
import MyStore from '@yun/my-store'
import { IS_ON_SALE_STATUS, SALE_SUGGESTION } from '@l/judge'
import LoadingImg from '@yun/loading-img/loading-img'
import { getSalesSuggestionList } from '@/api'
export default {
  name: 'SalesSuggestion',

  data () {
    return {
      sortData: [{
        key: 'is_on_sale',
        sort: '',
        name: '销售状态'
      },
      {
        key: 'mid',
        sort: '',
        name: '机台'
      },
      {
        key: 'profit_rate',
        sort: '',
        name: '近七天毛利率'
      },
      {
        key: 'suggestion',
        name: '运营建议'
      }
      ],
      saleSuggestion: { ...SALE_SUGGESTION },
      isOnSaleStatus: { ...IS_ON_SALE_STATUS },
      checkedSort: null,
      store_id: null,
      freshLoading: false, // 下拉刷新loading状态
      loading: false,
      finished: true, // 是否加载完成
      list: [],
      page: 1
    }
  },

  components: {
    SortList,
    MyStore,
    LoadingImg
  },

  computed: {},

  methods: {
    // 选择门店回调
    handleConfirm (data) {
      this.store_id = data.value.store_id
      this.handleSort({})
      this.handleRefresh()
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    },
    getDataList (callback = () => {}) {
      this.$Loading({
        message: '加载中...'
      })
      let jsons = {}
      if (this.checkedSort) {
        jsons = {
          sort: this.checkedSort.key,
          sort_by: this.checkedSort.sort
        }
      }
      let storeId = this.store_id
      let page = this.page
      jsons.store_id = storeId
      jsons.page = page
      getSalesSuggestionList(jsons).then(res => {
        this.$Loading.clear()
        let arr = []
        if (res.return_code === '0') {
          arr = res.data.list
          ++this.page
        } else {
          this.$Tip.warning(res.msg)
        }
        callback(arr)
      })
    },
    // 下拉刷新
    handleRefresh () {
      this.page = 1
      this.getDataList(dt => {
        this.list = dt
        this.freshLoading = false
      })
    },
    // 上拉加载
    handleLoading () {
      this.getDataList((dt) => {
        this.list = this.list.concat(dt)
        this.finished = dt.length === 0
        this.loading = false
      })
    },
    // 排序
    handleSort (item) {
      if (item.key !== 'suggestion') {
        this.checkedSort = null
        this.sortData = this.sortData.map(v => {
          let obj = { ...v }
          if (item.key === obj.key) {
            obj.sort = obj.sort === 'asc' ? 'desc' : 'asc'
            this.checkedSort = { ...obj }
          } else if (obj.key !== 'suggestion') {
            obj.sort = ''
          }
          return obj
        })
        this.handleRefresh()
      }
    }
  },
  created () {
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.sales-suggestion
  .header
    height 92px
  .main
    .container
      .content-first
        width rems(150)
        margin rems(20) 0
        padding rems(5) 0 rems(10)
        background-color #dddddd
        flex-shrink 0
      .content-second
        width rems(200)
        flex-shrink 0
        text-align center
      .content-third
        width rems(190)
        flex-shrink 0
        text-align center
      .tag
        width 100%
        text-align right
        padding-right rems(10)
      .img
        width rems(100)
        height @width
</style>
