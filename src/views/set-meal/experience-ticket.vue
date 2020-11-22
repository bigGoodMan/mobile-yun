<!-- 体验券 -->
<template>
  <div class="experience-ticket">
    <div class="header bgcolor-f">
      <div
        class="fixed top-0 left-0 width-2half bgcolor-f"
        style="z-index: 99;"
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
      </div>
    </div>
    <div ckass="main">
      <div class="contaienr padding-20-30">
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
            <ul class="no-ul">
              <li
                v-for="items of list"
                :key="items.id"
                class="padding-bottom-30"
              >
                <ExperienceTicketItem
                  :itemData="items"
                  @trigger-edit="handleEdit(items)"
                  @trigger-take-effect="handleTakeEffect"
                  @trigger-discontinue="handleDiscontinue"
                />
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </div>
      <HhfButton
        type="info"
        size="large"
        :bottom-z-index="10"
        radius="0.1rem"
        @trigger-click="handleAdd"
        >新增券包</HhfButton
      >
      <ExperienceTicketPopup
        v-model="show"
        :ticketData="ticketData"
        @trigger-save="handleSave"
      />
    </div>
  </div>
</template>

<script>
import ExperienceTicketPopup from "./components/experience-ticket-popup";
import MyStore from "@yun/my-store";
import HhfButton from "@hhf/hhf-button";
import ExperienceTicketItem from "./components/experience-ticket-item.vue";
import TipIcon from "@yun/icon-components/tip-icon";
import { getExperienceTicketList, saveExperienceTicket } from "@/api";
export default {
  name: "ExperienceTicket",

  components: {
    MyStore,
    HhfButton,
    ExperienceTicketItem,
    ExperienceTicketPopup,
    TipIcon
  },

  data() {
    return {
      storeId: null,
      show: false,
      page: 1,
      limit: 20,
      freshLoading: false, // 下拉刷新loading状态
      loading: false,
      finished: true, // 是否加载完成
      list: [],
      ticketData: null
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
    getDataList(callback = () => {}) {
      this.$Loading({
        message: "加载中..."
      });
      const { page, limit, storeId } = this;
      getExperienceTicketList({ store_id: storeId, limit, page }).then(res => {
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
    // 选择门店回调
    handleConfirm(data) {
      this.storeId = data.value.store_id;
      this.handleRefresh();
    },
    // 查看版本更新说明
    handleRouter() {
      this.$router.push({
        name: "Article"
      });
    },
    handleEdit(item) {
      this.ticketData = item;
      this.show = true;
    },
    handleOperation(item) {
      console.log(item);
      this.list = this.list.map(v => {
        if (item.id === v.id) {
          return { ...item };
        }
        return v;
      });
    },
    handleTakeEffect(item) {
      this.handleOperation(item);
    },
    handleDiscontinue(item) {
      this.handleOperation(item);
    },
    handleAdd() {
      this.ticketData = null;
      this.show = true;
    },
    handleSave(items) {
      const {
        id,
        name,
        start_time: startTime,
        end_time: endTime,
        num,
        card_info: card
      } = items;
      const { storeId } = this;
      if (!name) {
        this.$Tip.warning("券包名字不能为空");
        return;
      }
      if (!startTime) {
        this.$Tip.warning("请选择券包开始时间");
        return;
      }
      if (!endTime) {
        this.$Tip.warning("请选择券包结束时间");
        return;
      }
      if (!/^[1-9]+[0-9]*$/.test(num)) {
        this.$Tip.warning("请输入正确的券包发放人数");
        return;
      }
      let totalCoin = 0;
      for (let i = 0; i < card.length; ++i) {
        const item = card[i];
        const { start, end, coin, num: couponNum } = item;
        if (!start) {
          this.$Tip.warning(`请选择卡券${i + 1}开始时间`);
          return;
        }
        if (!end) {
          this.$Tip.warning(`请选择卡券${i + 1}结束时间`);
          return;
        }
        if (!/^[1-9]+[0-9]*$/.test(coin)) {
          this.$Tip.warning(`请输入正确的卡券${i + 1}面值`);
          return;
        }
        if (!/^[1-9]+[0-9]*$/.test(couponNum)) {
          this.$Tip.warning(`请输入正确的卡券${i + 1}发放人数`);
          return;
        }
        totalCoin += couponNum * coin;
      }
      const jsons = {
        store_id: storeId,
        name,
        start_time: startTime,
        end_time: endTime,
        num,
        total_coin: totalCoin,
        card_info: card
      };
      if (id) {
        jsons.id = id;
      }
      this.$Loading("正在保存……");
      saveExperienceTicket(jsons).then(res => {
        this.$Loading.clear();
        if (res.return_code === "0") {
          if (id) {
            this.list = this.list.map(v => {
              if (v.id === id) {
                return { ...items, total_coin: totalCoin };
              }
              return v;
            });
          } else {
            this.list.push({
              ...items,
              id: res.data,
              total_coin: totalCoin,
              status: "0"
            });
          }
          this.$Tip.success(res.msg);
          this.show = false;
          return;
        }
        this.$Tip.warning(res.msg);
      });
    }
  }
};
</script>
<style lang="stylus">
.experience-ticket
  .header
    height rems(106)
//   .main
//     .container
//       padding
</style>
