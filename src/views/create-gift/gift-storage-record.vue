<!-- 礼品入库记录 -->
<template>
  <div class="gift-storage-record">
    <div class="gift-storage-record-header">
      <div class="fixed-max-width top-0">
        <HeaderSearch
          v-model="giftId"
          placeholder="请输入礼品名称或编号"
          @trigger-search="handleSearch"
        />
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
          <div
            class="flex-row flex-between-center size-28 bgcolor-f padding-20-30"
          >
            <span>{{ getDateTime(items.create_time) }}</span>
            <span>{{ items.store_name }}</span>
          </div>
          <div class="border"></div>
          <GiftList :result="items">
            <div class="flex-column flex-center">
              <span class="padding-bottom-20"
                >￥{{ getDecimal(items.money_cost) }}</span
              >
              <span>×{{ items.num }}</span>
            </div>
          </GiftList>
          <div class="border"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 按钮 -->
    <div class="height-100">
      <div class="fixed-max-width bottom-0 size-0 zindex-2">
        <HhfButton
          type="info"
          size="large"
          @trigger-click="$router.push({ name: 'add_gift_storage' })"
          >新增礼品入库</HhfButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import HeaderSearch from "@yun/header-search";
import HhfButton from "@hhf/hhf-button";
import GiftList from "@yun/gift-list";
import moment from "moment";
import { getGiftStorageRecordApi } from "@/api";
export default {
  name: "GiftStorageRecord",

  components: {
    HeaderSearch,
    HhfButton,
    GiftList
  },

  data() {
    return {
      isLoading: false,
      loading: false,
      finished: true,
      page: 1,
      giftId: "",
      list: []
    };
  },

  computed: {},
  created() {
    const { handleLoading } = this;
    handleLoading();
  },
  mounted() {},

  methods: {
    getDateTime(time) {
      return moment(time * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    getDecimal(num, fix = 2) {
      num = num || 0;
      return (num - 0).toFixed(fix);
    },
    handleSearch() {
      this.page = 1;
      this.getGiftStorageRecord(dt => {
        this.list = dt;
      });
    },
    getGiftStorageRecord(callback = () => {}) {
      let { page } = this;
      const { giftId } = this;
      getGiftStorageRecordApi({
        gift_id: giftId,
        page
      }).then(res => {
        let arr = [];
        if (res.return_code === "0") {
          this.page = ++page;
          arr = res.data;
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          });
        }
        this.finished = arr.length === 0;
        callback(arr);
      });
    },
    // 下拉刷新
    handleRefresh() {
      this.page = 1;
      this.getGiftStorageRecord(dt => {
        this.list = dt;
        this.isLoading = false;
      });
    },
    // 上拉加载
    handleLoading() {
      this.getGiftStorageRecord(dt => {
        this.list = this.list.concat(dt);
        this.loading = false;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.gift-storage-record-header
  position relative
  z-index 1
  height rems(108)
</style>
