<!-- 销售提升建议 -->
<template>
  <div class="sales-suggestion">
    <div class="header bgcolor-f">
      <div
        class="fixed top-0 left-0 width-2half bgcolor-f"
        style="z-index: 10;"
      >
        <MyStore
          :store-id="storeId"
          :default-index="0"
          @trigger-click="handleConfirm"
        >
          <div class="flex-row flex-end-center flex-1">
            <TipIcon />
          </div>
        </MyStore>
        <div class="border"></div>
        <div class="flex-row flex-start-center">
          <div class="width-half">
            <MyArea
              :store-id="storeId"
              :value="area"
              right-icon="arrow-down"
              @trigger-change="handleChangeArea"
            />
          </div>
          <div class="width-half">
            <!-- <div class="border"></div> -->
            <MyMachine
              :store-id="storeId"
              :area-id="area.id"
              :value="machine"
              right-icon="arrow-down"
              title="请选择机型"
              type="MACHINE_TYPE"
              @trigger-change="handleChangeMachine"
            />
          </div>
        </div>
        <div class="border"></div>
        <SortList :sort-data="sortData" @trigger-click="handleSort" />
        <div class="border"></div>
      </div>
    </div>
    <div class="main">
      <div class="container">
        <van-pull-refresh
          v-model="freshLoading"
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
            <div v-for="(items, index) of list" :key="index" class="bgcolor-f">
              <ul class="flex-row flex-start-center padding-0-20">
                <li class="relative flex-column flex-center content-first">
                  <span
                    class="size-24 tag"
                    :style="{ color: isOnSaleStatus[items.is_on_sale].color }"
                    >{{ isOnSaleStatus[items.is_on_sale].text }}</span
                  >
                  <div class="img">
                    <LoadingImg
                      magnify
                      fit="cover"
                      :img="items.gift_img.img"
                      :thumb="items.gift_img.thumb"
                      class="max-width-2half max-height-2half"
                    />
                  </div>
                  <span class="text-ellipsis width-2half size-24">{{
                    items.gift_name
                  }}</span>
                </li>
                <li class="size-24 content-second">
                  {{ items.area_name }}-{{ items.no }}
                </li>
                <li class="size-24 content-third">{{ items.profit_rate }}%</li>
                <li class="size-24 flex-1 text-center">
                  {{ items.suggestion_msg }}
                </li>
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
import SortList from "@yun/sort-list/sort-list.vue";
import MyStore from "@yun/my-store";
import MyArea from "@yun/my-area";
import MyMachine from "@yun/my-machine";
import TipIcon from "@yun/icon-components/tip-icon";
import { IS_ON_SALE_STATUS, SALE_SUGGESTION } from "@l/judge";
import LoadingImg from "@yun/loading-img/loading-img";
import { getSalesSuggestionList } from "@/api";
const sortData = [
  {
    key: "is_on_sale",
    sort: "",
    name: "销售状态"
  },
  {
    key: "mid",
    // sort: '',
    name: "机台"
  },
  {
    key: "profit_rate",
    sort: "",
    name: "近七天毛利率"
  },
  {
    key: "suggestion",
    name: "运营建议"
  }
];
export default {
  name: "SalesSuggestion",

  components: {
    SortList,
    MyStore,
    LoadingImg,
    MyArea,
    MyMachine,
    TipIcon
  },

  data() {
    return {
      sortData: sortData.map(v => ({ ...v })),
      saleSuggestion: { ...SALE_SUGGESTION },
      isOnSaleStatus: { ...IS_ON_SALE_STATUS },
      checkedSort: null,
      storeId: null,
      freshLoading: false, // 下拉刷新loading状态
      loading: false,
      finished: true, // 是否加载完成
      list: [],
      limit: 20,
      page: 1,
      area: {},
      machine: {}
    };
  },

  computed: {},
  created() {
    const { sid } = this.$route.query;
    if (sid) {
      this.storeId = sid;
    }
  },
  mounted() {},

  methods: {
    // 选择门店回调
    handleConfirm(data) {
      this.storeId = data.value.store_id;
    },
    handleChangeArea(value) {
      this.area = value;
    },
    handleChangeMachine(value) {
      this.machine = value;
      this.list = [];
      this.sortData = sortData.map(v => ({ ...v }));
      if (this.machine.id) {
        this.handleSort({});
      }
    },
    // 查看版本更新说明
    handleRouter() {
      this.$router.push({
        name: "Article"
      });
    },
    getDataList(callback = () => {}) {
      this.$Loading({
        message: "加载中..."
      });
      let jsons = {};
      if (this.checkedSort) {
        jsons = {
          sort: this.checkedSort.key,
          sort_by: this.checkedSort.sort
        };
      }
      const {
        page,
        storeId,
        machine: { id: typeId },
        area: { id: areaId }
      } = this;
      jsons.store_id = storeId;
      jsons.page = page;
      jsons.area_id = areaId;
      jsons.type_id = typeId;
      getSalesSuggestionList(jsons).then(res => {
        this.$Loading.clear();
        let arr = [];
        if (res.return_code === "0") {
          arr = res.data.list;
          ++this.page;
        } else {
          this.$Tip.warning(res.msg);
        }
        callback(arr);
      });
    },
    // 下拉刷新
    handleRefresh() {
      this.page = 1;
      this.getDataList(dt => {
        this.list = dt;
        this.finished = dt.length < this.limit || dt.length === 0;
        this.freshLoading = false;
      });
    },
    // 上拉加载
    handleLoading() {
      this.getDataList(dt => {
        this.list = this.list.concat(dt);
        this.finished = dt.length < this.limit || dt.length === 0;
        this.loading = false;
      });
    },
    // 排序
    handleSort(item) {
      if (item.sort !== void 0) {
        this.checkedSort = null;
        this.sortData = this.sortData.map(v => {
          const obj = { ...v };
          if (item.key === obj.key) {
            obj.sort = obj.sort === "asc" ? "desc" : "asc";
            this.checkedSort = { ...obj };
          } else if (obj.sort !== void 0) {
            obj.sort = "";
          }
          return obj;
        });
      }
      this.handleRefresh();
    }
  }
};
</script>
<style lang="stylus" scoped>
.sales-suggestion
  .header
    height rems(262)
  .main
    .container
      .content-first
        width rems(170.66)
        margin rems(20) 0
        padding rems(5) 0 rems(10)
        background-color #dddddd
        flex-shrink 0
      .content-second
        width rems(170.66)
        flex-shrink 0
        text-align center
      .content-third
        width rems(198)
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
