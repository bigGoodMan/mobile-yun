<!-- 智能抓感机器扫一扫 -->
<template>
  <div class="grasp-equipment-choice">
    <div class="header bgcolor-f">
      <MyStore
        :store-id="storeId"
        :default-index="0"
        @trigger-click="handleConfirm"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon name="question-o" size="0.4rem" @click="handleRouter" />
        </div>
      </MyStore>
    </div>
    <div class="container flex-column flex-start-stretch">
      <div class="bgcolor-f content">
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <MyArea v-model="area" :store-id="storeId" />
        <div class="border"></div>
        <MyMachine v-model="machine" :store-id="storeId" :area-id="area.id" />
        <!-- <LinkageSelection
          right-icon
          title="请选择区域"
          :value="areaValue.text"
          :columns="areaColumns"
          @trigger-confirm="handleChoseArea"
        />
        <div class="border"></div>
        <LinkageSelection
          right-icon
          title="请选择机台编号"
          :value="machineValue.text"
          :columns="machineColumns"
          @trigger-confirm="handleChoseMachine"
        />-->
        <div class="border"></div>
      </div>
      <div v-if="machine.id" class="bgcolor-f content">
        <CellList
          right-icon="arrow"
          placeholder="请选择礼品"
          @trigger-click="handleRouterGift"
        >
          <template v-slot:title>
            <h5 class="margin-0 size-30">我的礼品</h5>
          </template>
        </CellList>
        <div class="border"></div>
        <div>
          <van-cell title="礼品名称" :value="giftInfoSelected.name" />
        </div>
        <div class="border"></div>
        <div>
          <van-cell title="礼品编号" :value="giftInfoSelected.id" />
        </div>
      </div>
    </div>
    <div v-if="finishShow" class="finish-btn-content">
      <HhfButton
        type="info"
        :loading="finishLoading"
        radius="0.05rem"
        @trigger-click="handleFinished"
        >完成</HhfButton
      >
    </div>
    <div
      v-if="giftInfoSelected.id"
      class="fixed-max-width bottom-0 size-0 zindex-2"
    >
      <HhfButton
        size="large"
        type="info"
        :loading="loading"
        radius="0.05rem"
        @trigger-click="handleStart"
        >开始配置</HhfButton
      >
    </div>
  </div>
</template>

<script>
import MyStore from "@yun/my-store";
import MyArea from "@yun/my-area";
import MyMachine from "@yun/my-machine";
import HhfButton from "@hhf/hhf-button";
import CellList from "@yun/cell-list";
// import LinkageSelection from '@yun/linkage-selection'
import { mapMutations, mapState } from "vuex";
import { startConfigureGraspApi, getConfigureGraspResultApi } from "@/api";
export default {
  name: "GraspEquipmentChoice",

  components: {
    MyStore,
    // LinkageSelection,
    CellList,
    HhfButton,
    MyArea,
    MyMachine
  },

  data() {
    return {
      finishShow: false,
      finishLoading: false,
      loading: false,
      storeId: null,
      area: {},
      machine: {},

      areaColumns: [], // 区域列表
      areaValue: {}, // 选中的区域
      machineColumns: [], // 机台列表
      machineValue: {} // 选中的机台
    };
  },

  computed: {
    ...mapState({
      giftInfoSelected: state => state.intelligentGrasp.giftInfoSelected
    })
  },
  activated() {
    // keep-alive 组件激活调用
    this.finishShow = false;
    this.finishLoading = false;
  },
  created() {
    const { sid, mid, aid } = this.$route.query;
    if (sid) {
      this.storeId = sid;
    }
    if (sid && aid) {
      this.area.id = aid;
    }
    if (sid && aid && mid) {
      this.machine.id = mid;
    }
    this.APP_ADDCACHEPAGELIST_MUTATE("GraspEquipmentChoice");
  },
  methods: {
    ...mapMutations([
      "APP_ADDCACHEPAGELIST_MUTATE",
      "INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE"
    ]),
    // 完成
    handleFinished() {
      this.finishLoading = true;
      getConfigureGraspResultApi({
        store_id: this.storeId,
        gift_id: this.giftInfoSelected.id,
        mid: this.machine.id
      }).then(res => {
        this.finishLoading = false;
        if (res.return_code === "0") {
          this.$Loading.clear();
          this.finishShow = false;
          this.$Tip.success(res.msg);
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            maskColor: "rgba(0, 0, 0,.8)",
            mask: true
          });
        }
      });
    },
    // 开始配置
    handleStart() {
      this.loading = true;
      startConfigureGraspApi({
        store_id: this.storeId,
        gift_id: this.giftInfoSelected.id,
        mid: this.machine.id
      }).then(res => {
        this.loading = false;
        if (res.return_code === "0") {
          this.$Loading({
            message: "请在机台上按【下抓键】开始配置",
            mask: true,
            maskColor: "rgba(0, 0, 0,.8)",
            zIndex: 11
          });
          this.finishShow = true;
        } else if (res.msg) {
          this.$Tip.warning(res.msg);
        }
      });
    },
    // 选择门店
    handleConfirm(obj) {
      this.storeId = obj.value.store_id;
      // this.getAreaListByStore()
      this.INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE({}); // 清空store抓感礼品
    },
    // 获取区域列表
    // getAreaListByStore () {
    //   getAreaListByStoreApi({ store_id: this.storeId }).then(res => {
    //     this.areaColumns = []
    //     this.areaValue = {}
    //     this.machineColumns = []
    //     this.machineValue = {}
    //     if (res.return_code === '0') {
    //       const { data } = res
    //       let values = []
    //       data.forEach(v => {
    //         values.push({
    //           text: v.name,
    //           id: v.id
    //         })
    //       })
    //       this.areaColumns = [{
    //         values
    //       }]
    //     } else if (res.msg) {
    //       this.$Tip.warning(res.msg)
    //     }
    //   })
    // },
    // // 选择区域
    // handleChoseArea (obj) {
    //   this.areaValue = obj.value[0]
    //   this.getMachineListByStoreAndArea()
    //   this.INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE({}) // 清空store抓感礼品
    // },
    // 获取机台
    // getMachineListByStoreAndArea () {
    //   getMachineListByStoreAndAreaApi({ store_id: this.storeId, area_id: this.areaValue.id }).then(res => {
    //     this.machineColumns = []
    //     this.machineValue = {}
    //     if (res.return_code === '0') {
    //       const { data } = res
    //       let values = []
    //       data.forEach(v => {
    //         values.push({
    //           text: `${v.name}-${v.no}`,
    //           id: v.id
    //         })
    //       })
    //       this.machineColumns = [{
    //         values
    //       }]
    //     } else if (res.msg) {
    //       this.$Tip.warning(res.msg)
    //     }
    //   })
    // },
    // // 选择机台
    // handleChoseMachine (obj) {
    //   this.machineValue = obj.value[0]
    //   this.INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE({}) // 清空store抓感礼品
    // },
    handleRouter() {
      this.$router.push({
        name: "Article"
      });
    },
    handleRouterGift() {
      this.$router.push({
        name: "GraspGiftChoice",
        query: {
          sid: this.storeId
        }
      });
    },
    handleSave() {}
  }
};
</script>
<style lang="stylus" scoped>
.grasp-equipment-choice {
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .container {
    padding-top: rems(106);
    height: 100vh;
    box-sizing: border-box;

    .content {
      margin-top: rems(100);
    }
  }

  .finish-btn-content {
    position: fixed;
    bottom: rems(200);
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 12;
  }
}
</style>
