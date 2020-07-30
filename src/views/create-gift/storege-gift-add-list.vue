<!-- 自建礼品列表 -->
<template>
  <div class="storege-gift-add-list">
    <div class="storege-gift-add-list-header">
      <div class="fixed-max-width top-0">
        <HeaderSearch
          v-model="giftSearch"
          placeholder="请输入礼品名称或编号"
          @trigger-search="handleSearch"
        />
        <h5
          class="size-28 flex-row flex-between-center margin-0 padding-20-30 bgcolor-f"
        >
          <span>礼品列表</span>
          <HhfButton
            type="info"
            size="small"
            radius="0.4rem"
            @trigger-click="handleGo"
            >新增礼品</HhfButton
          >
        </h5>
        <div class="border"></div>
      </div>
    </div>
    <!-- 礼品列表内容 -->
    <van-pull-refresh
      v-model="isLoading"
      style="overflow:initial"
      @refresh="handleRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="10"
        @load="handleLoading"
      >
        <div v-for="(items, index) of list" :key="index">
          <GiftList :result="items" @trigger-click="handleChecked" />
          <div class="border"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 按钮 -->
    <div class="height-100">
      <div class="fixed-max-width bottom-0 size-0 zindex-2">
        <HhfButton type="info" size="large" @trigger-click="handleAdd"
          >添加</HhfButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from "@yun/header-search";
import HhfButton from "@hhf/hhf-button";
import GiftList from "@yun/gift-list";
import { getGiftCreateListApi } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "StoregeGiftAddList",

  components: {
    HeaderSearch,
    HhfButton,
    GiftList
  },

  data() {
    return {
      list: [],
      isLoading: false, // 下拉刷新loading状态
      loading: false, // 上拉加载loading状态
      finished: true, // 是否加载完成

      giftSearch: "", // 搜索内容
      page: 1
    };
  },

  computed: {},

  mounted() {
    this.handleLoading();
  },

  methods: {
    ...mapMutations(["GIFT_GIFTSTORAGELIST_MUTATE"]),
    // 搜索
    handleSearch() {
      this.page = 1;
      this.getGiftCreateList(dt => {
        this.list = dt;
      });
    },
    getGiftCreateList(callback = () => {}) {
      this.$Loading({
        message: "加载中..."
      });
      let { page } = this;
      const { giftSearch } = this;
      const { bid } = this.$route.query;
      getGiftCreateListApi({
        gift_id: giftSearch,
        brand_id: bid,
        page: page
      }).then(res => {
        let arr = [];
        this.$Loading.clear();
        if (res.return_code === "0") {
          this.page = ++page;
          arr = res.data.map(v => ({ ...v, checked: false }));
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          });
        }
        callback(arr);
      });
    },
    // 下拉刷新
    handleRefresh() {
      this.page = 1;
      this.getGiftCreateList(dt => {
        this.list = dt;
        this.isLoading = false;
      });
    },
    // 上拉加载
    handleLoading() {
      this.getGiftCreateList(dt => {
        this.list = this.list.concat(dt);
        this.finished = dt.length === 0;
        this.loading = false;
      });
    },
    // 选中
    handleChecked(items) {
      this.list = this.list.map(v => {
        const obj = {
          ...v
        };
        if (items.gift_id === v.gift_id) {
          obj.checked = items.checked;
        }
        return obj;
      });
    },
    handleAdd() {
      this.GIFT_GIFTSTORAGELIST_MUTATE(
        this.list
          .filter(v => v.checked)
          .map(v => ({ ...v, checked: void 0, num: "", money_cost: "" }))
      );
      // this.$router.go(-1);
      const { sid, bid, brandname } = this.$route.query;
      this.$router.push({
        name: "add_gift_storage",
        query: {
          sid,
          bid,
          brandname
        }
      });
    },
    handleGo() {
      const { sid, bid, brandname } = this.$route.query;
      this.$router.push({
        name: "add_edit_gift",
        query: {
          sid,
          bid,
          brandname
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.storege-gift-add-list-header
  position relative
  z-index 1
  height rems(208)
</style>
