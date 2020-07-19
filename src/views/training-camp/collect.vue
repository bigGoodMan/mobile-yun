<!-- 嗨皮商家训练营收藏页 -->
<template>
  <div class="training-camp-collect">
    <div class="training-camp-collect-head">
      <TrainingUserInfo :info="userInfo" />
    </div>
    <div class="training-camp-collect-container">
      <template v-if="list.length > 0">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :offset="10"
          @load="handleLoading"
        >
          <ul class="no-ul">
            <li
              v-for="(items, index) in list"
              :key="index"
              class="padding-bottom-10"
            >
              <TrainingList :info="items" />
            </li>
          </ul>
        </van-list>
      </template>
      <template v-else>
        <div class="size-24 text-center padding-top-20 color-9">
          暂时没有数据<van-icon name="smile-o" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getTrainFavouriteListApi } from "@/api";
import TrainingUserInfo from "./components/user-info";
import TrainingList from "./components/list";
import mixin from "./mixin";
export default {
  name: "TrainingCampCollect",

  components: {
    TrainingUserInfo,
    TrainingList
  },
  mixins: [mixin],

  data() {
    return {
      list: [],
      loading: false, // 上拉加载
      finished: false, // 完成
      page: 1,
      limit: 20
    };
  },

  computed: {},
  created() {
    this.getTrainFavouriteList();
  },
  mounted() {},

  methods: {
    getTrainFavouriteList() {
      this.$Loading();
      const { page, limit } = this;
      getTrainFavouriteListApi({
        page,
        limit
      }).then(res => {
        this.$Loading.clear();
        this.loading = false;
        if (res.return_code === "0") {
          const list = res.data.map(v => ({
            ...v,
            create_time: v.create_time.split(" ")[0],
            is_collect: !!(v.is_collect - 0)
          }));
          ++this.page;
          this.list = [...this.list, ...list];
          if (list.length < limit) {
            this.finished = true;
          }
          return;
        }
        this.$Tip.warning(res.msg);
      });
    },
    handleLoading() {
      this.getTrainFavouriteList();
    }
  }
};
</script>
<style lang="stylus" scoped>
.training-camp-collect
  .training-camp-collect-head
    position fixed
    top 0
    left 0
    width 100%
    z-index 10
  .training-camp-collect-container
    padding-top rems(190)
</style>
