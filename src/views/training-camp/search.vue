<!-- 嗨皮商家搜索页 -->
<template>
  <div class="search">
    <form action="/" class="search-form">
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
      <template v-if="list.length > 0">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="10"
          @load="handleLoading"
        >
          <ul class="no-ul">
            <li v-for="(items, index) of list" :key="index">
              <TrainingList :info="items" />
              <div class="border"></div>
            </li>
          </ul>
          <div v-for="(items, index) in inventoryList" :key="index">
            {{ index }}
          </div>
        </van-list>
      </template>
      <template v-else>
        <div
          v-show="nothing"
          class="size-24 color-9 padding-top-20 text-center"
        >
          哎呀，未搜索到相关内容
        </div>
        <div class="search-keywords">
          <TrainingCampKeywords @trigger-click="handleClick" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getTrainSearchListApi } from "@/api";
import TrainingList from "./components/list";
import TrainingCampKeywords from "./components/keywords";
import mixin from "./mixin";
export default {
  name: "TrainingCampSearch",
  components: {
    TrainingCampKeywords,
    TrainingList
  },
  mixins: [mixin],

  data() {
    return {
      nothing: false, // 搜索有无内容
      value: "", // 输入关键字
      loading: false, // 上拉加载
      list: [],
      page: 1,
      limit: 20,
      finished: true // 完成
    };
  },

  computed: {},

  mounted() {},

  methods: {
    onSearch() {
      this.finished = true;
      this.page = 1;
      this.list = [];
      this.getTrainSearchList();
    },
    handleClick(val) {
      this.value = val;
      this.onSearch();
    },
    onCancel() {
      this.$router.back();
    },
    getTrainSearchList() {
      this.$Loading();
      const { page, limit, value } = this;
      getTrainSearchListApi({
        page,
        limit,
        word: value
      }).then(res => {
        this.loading = false;
        this.$Loading.clear();
        if (res.return_code === "0") {
          const list = res.data;
          if (list.length < limit) {
            this.finished = true;
          }
          this.list = [...this.list, ...list];
          if (!this.list.length) {
            this.nothing = true;
            return;
          }
          this.nothing = false;
        }
      });
    },
    handleLoading() {
      this.getTrainSearchList();
    },
    onInput() {}
  }
};
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
