<!-- 重置局数 -->
<template>
  <div class="reset-number">
    <!-- <HhfCheckBox v-model="checked" @trigger-change="changeCheckBox">这是什么</HhfCheckBox> -->
    <div class="header bgcolor-f">
      <MyStore :store-id="storeId" @trigger-click="handleConfirm">
        <div class="flex-row flex-end-center flex-1">
          <van-icon name="question-o" size="0.4rem" @click="handleRouter" />
        </div>
      </MyStore>
    </div>
    <div class="bgcolor-f content">
      <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
      <div class="border"></div>
      <MyArea v-model="area" :store-id="storeId" />
      <div class="border"></div>
      <MyMachine v-model="machine" :store-id="storeId" :area-id="area.id" />
    </div>
    <!-- 操作内容 -->
    <div v-if="machine.id" class="fixed-max-width bottom-0">
      <p class="size-28 reset-number-tip">
        重置局数操作会清除之前累积的游玩统计，即从0开始重新计算中奖局数
      </p>
      <div class="text-center">
        <HhfButton
          :loading="loading"
          type="info"
          size="large"
          @trigger-click="handleReset"
          >重置</HhfButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import MyStore from "@yun/my-store";
import MyArea from "@yun/my-area";
import MyMachine from "@yun/my-machine";
import HhfButton from "@hhf/hhf-button";
// import HhfCheckBox from '@hhf/hhf-checkbox'
import { resetNumber } from "@/api";
// import { getSwitchgearDetailApi } from '@/api'
export default {
  name: "ResetNumber",

  components: {
    MyStore,
    MyArea,
    MyMachine,
    HhfButton
  },

  data() {
    return {
      loading: false,
      checked: true,
      areaColumns: [],
      storeId: null,
      area: {},
      machine: {},
      result: ["a"],
      machineColumns: []
    };
  },
  computed: {},
  created() {
    const { sid, mid, aid } = this.$route.query;
    if (sid) {
      this.storeId = sid;
    }
    if (sid && aid) {
      this.area = { id: aid };
    }
    if (sid && aid && mid) {
      this.machine = { id: mid };
    }
  },
  mounted() {},

  methods: {
    handleConfirm(data) {
      this.storeId = data.value.store_id;
    },
    handleRouter() {},
    // 重置局数
    handleReset() {
      this.loading = true;
      resetNumber({ machine_id: this.machine.id, type: 6 }).then(res => {
        this.loading = false;
        if (res.return_code === "0") {
          this.$Tip({
            type: "success",
            message: res.msg,
            mask: true,
            maskPacity: 0
          });
        } else if (res.return_code) {
          this.$Tip({
            type: "warning",
            message: res.msg,
            mask: true,
            maskPacity: 0
          });
        } else {
          this.$Tip({
            type: "error",
            message: res.msg,
            mask: true,
            maskPacity: 0
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.reset-number
  .content
    margin-top rems(50)
  .btn-container
    position fixed
    bottom 0
    left 0
    width 100%
    margin-bottom rems(50)
  .reset-number-tip
    width rems(600)
    margin-left auto
    margin-right auto
</style>
