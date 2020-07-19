<!-- 开关机设置 -->
<template>
  <div class="switchgear">
    <div class="header bgcolor-f">
      <MyStore
        :default-index="0"
        :store-id="store_id"
        @trigger-click="handleConfirm"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon name="question-o" size="0.4rem" @click="handleRouter" />
        </div>
      </MyStore>
    </div>
    <div class="main-container">
      <div class="switchgear-container bgcolor-f2">
        <div class="border"></div>
        <van-pull-refresh
          v-model="isLoading"
          class="switchgear-fresh"
          @refresh="handleRefresh"
        >
          <div
            class="size-28 color-3 padding-20 bgcolor-f"
            style="line-height: 1.5;"
          >
            我的机台
          </div>
          <van-collapse
            v-model="activeNames"
            class="switchgear-content bgcolor-f2"
            accordion
          >
            <van-collapse-item
              v-for="(items, index) of switchgearList"
              :key="items.area_id"
              :title="items.area_name || ''"
              :name="index"
            >
              <div
                v-for="item of items.items"
                :key="item.machine_id"
                class="bgcolor-f"
              >
                <MachineSwitchCell
                  :info="item"
                  @trigger-click="type => handleOperate(type, item)"
                />
                <div class="border"></div>
              </div>

              <!-- <MachineList :columns="columns" /> -->
            </van-collapse-item>
          </van-collapse>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import MachineSwitchCell from "@yun/switchgear/machine-switch-cell";
import { setSwitchgearOnOffApi } from "@/api";
import MyStore from "@yun/my-store";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "Switchgear",

  components: {
    MyStore,
    MachineSwitchCell
  },

  data() {
    return {
      activeNames: 0,
      columns: [],
      isLoading: false,
      store_id: null
    };
  },

  computed: {
    ...mapState({
      switchgearList: state => state.switchgear.switchgearList
    })
  },

  created() {
    const { sid } = this.$route.query;
    if (sid) {
      this.store_id = sid;
    }
  },
  methods: {
    ...mapActions(["SWITCHGEAR_GETSWITCHGEARLIST_ACTION"]),
    ...mapMutations([
      "SWITCHGEAR_SETSTOREID_MUTATE",
      "SWITCHGEAR_AREAID_MUTATE",
      "SWITCHGEAR_MACHINEID_MUTATE"
    ]),
    // 根据门店获得信息
    getSwitchgearList() {
      this.$Loading("加载中……");
      return this.SWITCHGEAR_GETSWITCHGEARLIST_ACTION(this.store_id).then(
        res => {
          this.$Loading.clear();
          if (res.return_code !== "0") {
            this.$Tip.warning(res.msg);
          }
        }
      );
    },
    // 选择门店回调
    handleConfirm(data) {
      this.store_id = data.value.store_id;
      this.getSwitchgearList();
    },
    handleRouter() {
      this.$router.push({
        name: "Article"
      });
    },
    setSwitchgearOnOff(action, mid) {
      const $this = this;
      $this.$Loading("加载中……");
      setSwitchgearOnOffApi({
        mid,
        action
      }).then(res => {
        $this.$Loading.clear();
        if (res.return_code === "0") {
          $this.$Tip.success(res.msg);
          return;
        }
        $this.$Tip.warning(res.msg);
      });
    },
    handleOperate(type, item) {
      const $this = this;
      switch (type) {
        case "close":
          this.$Confirm.warning({
            message: "关机",
            descrition: "关机指令即将发送",
            confirmName: "关机",
            mask: true,
            confirm() {
              // console.log(options)
              $this.setSwitchgearOnOff(2, item.machine_id);
              return true;
            },
            cancel() {}
          });
          break;
        case "open":
          this.$Confirm.warning({
            message: "开机",
            descrition: "开机指令即将发送",
            confirmName: "开机",
            mask: true,
            confirm() {
              $this.setSwitchgearOnOff(1, item.machine_id);
              return true;
            },
            cancel() {}
          });
          break;
        case "restart":
          this.$Confirm.warning({
            message: "重启",
            descrition: "重启指令即将发送",
            confirmName: "重启",
            mask: true,
            confirm() {
              $this.setSwitchgearOnOff(3, item.machine_id);
              return true;
            },
            cancel() {}
          });
          break;
        case "timing":
          this.SWITCHGEAR_SETSTOREID_MUTATE(this.store_id);
          this.SWITCHGEAR_AREAID_MUTATE(item.area_id);
          this.SWITCHGEAR_MACHINEID_MUTATE(item.machine_id);
          this.$router.push({ name: "TimeSwitch" });
          break;
      }
    },
    handleRefresh() {
      this.getSwitchgearList().then(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>
<style lang="stylus">
.switchgear
  .header
    position absolute
    top 0
    left 0
    width 100%
    z-index 10
  .main-container
    height 100%
    -webkit-overflow-scrolling touch
    .switchgear-container
      padding-top rems(106)
      height: 100%;
      box-sizing: border-box;
    .switchgear-fresh
      padding-top rems(30)
      overflow: initial;
    .switchgear-content
      .van-collapse-item__content
        padding 0
</style>
