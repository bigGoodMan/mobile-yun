<!-- 嗨皮商家搜索页 -->
<template>
  <div class="search">
    <form
      action="/"
      class="search-form"
    >
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
      <div class="border"></div>
    </form>
    <div class="search-container">
      <template v-if="list.length > 0 && value">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoading"
          :offset="10"
        >
        <ul class="no-ul">
          <li v-for="(items, index) of list" :key="index">
            <TrainingList :info="items" />
            <div class="border"></div>
          </li>
        </ul>
          <!-- <div v-for="(items, index) in inventoryList" :key="index">{{index}}</div> -->
        </van-list>
      </template>
      <template v-else>
        <div class="search-keywords">
        <TrainingCampKeywords @trigger-click="handleClick"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getTrainSearchListApi } from '@/api'
import TrainingList from './components/list'
import TrainingCampKeywords from './components/keywords'
import mixin from './mixin'
export default {
  name: 'TrainingCampSearch',

  data () {
    return {
      value: '', // 输入关键字
      loading: false, // 上拉加载
      list: [],
      page: 1,
      limit: 20,
      finished: true // 完成
    }
  },
  mixins: [mixin],
  components: {
    TrainingCampKeywords,
    TrainingList
  },

  computed: {},

  methods: {
    onSearch () {
      this.finished = true
      this.page = 1
      this.getTrainSearchList()
    },
    handleClick (val) {
      this.value = val
      this.onSearch()
    },
    onCancel () {
      this.$router.back()
    },
    getTrainSearchList () {
      this.$Loading()
      const {
        page,
        limit,
        value
      } = this
      getTrainSearchListApi({
        page,
        limit,
        word: value
      }).then(res => {
        this.loading = false
        this.$Loading.clear()
        if (res.return_code === '0') {
          let list = res.data
          if (list.length < limit) {
            this.finished = true
          }
          this.list = [...this.list, ...list]
        }
      })
    },
    handleLoading () {
      this.getTrainSearchList()
    },
    onInput () {

    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.search
  .search-form
    position fixed
    top 0
    left 0
    width 100%
    z-index 10
  .search-container
    padding-top 54px
  .search-keywords
    padding rems(50) rems(30) 0 rems(30)
</style>
