<!--  -->
<template>
  <div class="exchange-cabinet-list bgcolor-f2 main-body flex-column">
    <div class="header bgcolor-f">
      <MyStore
        :store-id="storeId"
        :default-index="0"
        @trigger-click="handleConfirm"
      >
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
    </div>
    <div class="main-container size-28">
      <MachineCard>
        <li
          v-for="its of columns"
          :key="its.gift_id"
          @click="() => handleClick(its.mid, its.hole_id)"
        >
          <TabulatingCard :img="its.gift_img">
            <template v-slot:title>{{ its.gift_id }}</template>
            <template v-slot:content>{{ its.status }}</template>
          </TabulatingCard>
        </li>
      </MachineCard>
    </div>
  </div>
</template>

<script>
import MyStore from "@yun/my-store";
import MyArea from "@yun/my-area";
import MyMachine from "@yun/my-machine";
import TabulatingCard from "@yun/tabulating-card";
import MachineCard from "@yun/machine/machine-card";
import { getExchangeCabinetList } from "@/api";
export default {
  name: "ExchangeCabinetList",

  components: { MyStore, MachineCard, MyArea, MyMachine, TabulatingCard },

  data() {
    return {
      storeId: null,
      area: {},
      machine: {},
      columns: []
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
    handleClick(mid, hid) {
      this.$router.push({
        name: "ExchangeCabinetDetail",
        query: { mid, hid, sid: this.storeId }
      });
    },
    handleConfirm(obj) {
      this.storeId = obj.value.store_id;
      this.storeName = obj.value.store_name;
      console.log(this.storeId);
      this.getList({
        store_id: this.storeId
      });
    },
    handleChangeArea(area) {
      this.area = area;
    },
    handleChangeMachine(value) {
      this.machine = value;
      if (value.id) {
        this.getList({
          store_id: this.storeId,
          mid: value.id
        });
      }
    },
    getList(data) {
      this.$Loading("正在加载中……");
      getExchangeCabinetList(data).then(res => {
        this.$Loading.clear();
        if (res.return_code === "0" && res.data) {
          this.columns = res.data;
        }
      });
    }
  }
};
</script>
<style lang="stylus">
.exchange-cabinet-list
  min-height 100vh
  .exchange-cabinet-list-header
    position absolute
    top 0
    left 0
    width 100%
    z-index 10
</style>
