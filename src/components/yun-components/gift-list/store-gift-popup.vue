<!-- 自建礼品列表 -->
<template>
  <van-popup
    v-model="show"
    position="bottom"
    class="store-gift-popup bgcolor-f2"
  >
    <div class="store-gift-popup-header">
      <div class="fixed-max-width top-0">
        <HeaderSearch
          v-model="giftSearch"
          placeholder="请输入礼品名称或编号"
          @trigger-search="handleSearch"
        />
        <div class="border"></div>
      </div>
    </div>
    <!-- 礼品列表内容 -->
    <van-pull-refresh
      v-model="isLoading"
      style="overflow: initial;"
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
  </van-popup>
</template>

<script>
import HeaderSearch from "@yun/header-search";
import HhfButton from "@hhf/hhf-button";
import GiftList from "@yun/gift-list";
import { getStoreGiftList } from "@/api";
export default {
  name: "StoregeGiftAddList",

  components: {
    HeaderSearch,
    HhfButton,
    GiftList
  },
  model: {
    event: "close",
    prop: "show"
  },
  props: {
    type: {
      type: String,
      default: "radio",
      validator(val) {
        return ["checkbox", "radio"].includes(val);
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    storeId: {
      type: String
    }
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
      const { giftSearch, storeId } = this;
      getStoreGiftList({
        gift_name: giftSearch,
        store_id: storeId,
        page: page,
        limit: 20
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
      const { type } = this;
      this.list = this.list.map(v => {
        const obj = {
          ...v
        };
        if (items.gift_id === v.gift_id) {
          obj.checked = items.checked;
        } else if (type === "radio") {
          obj.checked = false;
        }
        return obj;
      });
    },
    handleClose() {
      this.$emit("close", false);
    },
    handleAdd() {
      this.$emit(
        "trigger-confirm",
        this.list.filter(v => v.checked)
      );
      this.handleClose();
    }
  }
};
</script>
<style lang="stylus" scoped>
.store-gift-popup
  width 100%
  height 100%
  // overflow hidden
  .store-gift-popup-header
    position relative
    z-index 1
    height rems(108)
</style>
