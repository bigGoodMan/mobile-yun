<!-- 机台消费套餐 -->
<template>
  <div class="machine-consumption-meal">
    <div class="header bgcolor-f">
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
      <div>
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <MyArea v-model="area" :store-id="storeId" />
        <div class="border"></div>
        <MyMachine
          :store-id="storeId"
          :area-id="area.id"
          :value="machine"
          @trigger-change="handleChangeMachine"
        />
      </div>
      <div class="border"></div>
    </div>
    <div v-if="machine.id" class="main flex-column flex-start-stretch">
      <div class="container">
        <div class="bgcolor-f size-28">
          <div class="flex-row flex-between-center">
            <h4 class="padding-20-10 margin-0">活动时效</h4>
            <van-button type="info" size="small" @click="handleGoRouter"
              >去配置新套餐</van-button
            >
          </div>
          <div class="padding-20-10">
            <van-checkbox name="1" :value="radio === '1'" @click="radio = '1'"
              >立即生效，换货后失效</van-checkbox
            >
          </div>
          <div class="border"></div>
          <div class="padding-20-10">
            <van-checkbox name="2" :value="radio === '2'" @click="radio = '2'"
              >活动期</van-checkbox
            >
            <ul class="no-ul">
              <li>
                <CellList
                  title="开启"
                  :value="getDate(startDate)"
                  right-icon="arrow"
                  @trigger-click="handleOpenCouponDate('startDate')"
                />
              </li>
              <li class="border"></li>
              <li>
                <CellList
                  title="结束"
                  :value="getDate(endDate)"
                  right-icon="arrow"
                  @trigger-click="handleOpenCouponDate('endDate')"
                />
              </li>
            </ul>
          </div>
        </div>
        <ul class="no-ul">
          <li v-for="(items, index) of list" :key="index" class="padding-20-10">
            <ConsumptionPackageItem
              :packageItem="items"
              @trigger-checked="handleChecked"
            />
          </li>
        </ul>
      </div>
      <div>
        <HhfButton
          size="large"
          :bottomZIndex="9"
          type="info"
          @trigger-click="handleSave"
          >保存</HhfButton
        >
      </div>
    </div>
    <van-popup
      v-model="dateShow"
      position="bottom"
      get-container="body"
      overlay
      @click-overlay="handleDateClose"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleDateConfirm"
        @cancel="handleDateCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import HhfButton from "@hhf/hhf-button";
import MyStore from "@yun/my-store";
import MyArea from "@yun/my-area";
import MyMachine from "@yun/my-machine";
import moment from "moment";
import CellList from "@yun/cell-list";
import TipIcon from "@yun/icon-components/tip-icon";
import ConsumptionPackageItem from "./components/consumption-package-item";
import {
  getMachineConsumptionPackage,
  saveMachineConsumptionPackage
} from "@/api";
export default {
  name: "MachineConsumptionMeal",

  components: {
    MyStore,
    MyArea,
    MyMachine,
    CellList,
    ConsumptionPackageItem,
    HhfButton,
    TipIcon
  },

  data() {
    return {
      storeId: null,
      storeName: "",
      area: {},
      machine: {},
      list: [],
      radio: "",
      dateShow: false,
      minDate: new Date(),
      currentDateKey: "",
      currentDate: new Date(),
      startDate: 0,
      endDate: 0,
      checkedPackage: {},
      maxDate: new Date(2025, 10, 1)
    };
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
  },
  mounted() {},

  methods: {
    getDate(dt) {
      if (!dt || dt === "0") {
        return "";
      }
      return moment(dt * 1000).format("YYYY-MM-DD kk:mm:ss");
    },
    // 选择门店
    handleRouter() {
      this.$router.push({
        name: "Article"
      });
    },
    handleGoRouter() {
      this.$router.push({
        name: "ConsumptionPackage",
        query: {
          sid: this.storeId,
          mid: this.machine.id,
          aid: this.area.id
        }
      });
    },
    handleConfirm(obj) {
      this.storeId = obj.value.store_id;
      this.storeName = obj.value.store_name;
    },
    handleChangeMachine(value) {
      this.machine = value;
      this.getMachineConsumptionPackage();
    },
    getMachineConsumptionPackage() {
      const {
        machine: { id },
        storeId
      } = this;
      if (!id) {
        this.list = [];
        return;
      }
      getMachineConsumptionPackage({ store_id: storeId, mid: id }).then(res => {
        if (res.return_code === "0") {
          const {
            data: { list, start_time: startDate, end_time: endDate, exchange }
          } = res;
          this.list = list.map(v => ({
            ...v,
            limit: v.rules[0].limit,
            discount: v.rules[0].discount,
            checked: !!(v.is_check - 0)
          }));
          if (!!(startDate - 0) && !!(endDate - 0)) {
            this.radio = "2";
            this.startDate = startDate;
            this.endDate = endDate;
          } else if (exchange && exchange.toString() === "1") {
            this.radio = "1";
          } else {
            this.radio = "";
            this.startDate = 0;
            this.endDate = 0;
          }
        }
      });
    },
    handleDateConfirm(value) {
      const val = Date.parse(value) / 1000;
      this[this.currentDateKey] = val;
      this.dateShow = false;
    },
    handleDateCancel() {
      this.handleDateClose();
    },
    handleDateClose() {
      this.dateShow = false;
    },
    handleOpenCouponDate(key) {
      this.currentDateKey = key;
      const dt = this[key];
      if (dt) {
        this.currentDate = new Date(dt * 1000);
      } else {
        this.currentDate = new Date();
      }
      this.dateShow = true;
    },
    handleChecked(items) {
      const { id, checked } = items;
      this.list = this.list.map(v => {
        if (id === v.id) {
          const currChecked = !checked;
          // this.checkedPackage = currChecked ? items : {}
          return {
            ...v,
            checked: currChecked
          };
        }
        return {
          ...v,
          checked: false
        };
      });
    },
    handleSave() {
      const that = this;
      const {
        machine: { id, no, name },
        // checkedPackage: { id: checkedPackageId, discount, limit },
        startDate,
        endDate,
        radio,
        storeName,
        list
      } = that;
      let checkedPackage = {};
      const length = list.length;
      for (let i = 0; i < length; ++i) {
        if (list[i].checked) {
          checkedPackage = list[i];
          break;
        }
      }
      const { id: checkedPackageId, discount, limit } = checkedPackage;
      if (!radio) {
        that.$Tip.warning("请选择时效");
        return;
      }
      if (radio === "2" && (!(startDate - 0) || !(startDate - 0))) {
        that.$Tip.warning("请填写活动期的时间");
        return;
      }
      let mealJsx;
      if (checkedPackageId) {
        mealJsx = (
          <li class="color-error">
            每满<span class="color-error">{limit}</span>局；送
            <span class="color-error">{discount}</span>局
          </li>
        );
      }
      let jsons = {};
      if (radio === "2") {
        jsons = {
          mid: id,
          combo_id: checkedPackageId,
          start_time: startDate,
          end_time: endDate,
          exchange: "0"
        };
      } else {
        jsons = {
          mid: id,
          combo_id: checkedPackageId,
          start_time: 0,
          end_time: 0,
          exchange: "1"
        };
      }
      saveMachineConsumptionPackage(jsons).then(res => {
        if (res.return_code === "0") {
          that.$Confirm({
            message: "保存成功",
            descrition: (
              <ul class="no-ul">
                <li>{storeName}门店</li>
                <li>
                  {name}-{no}
                </li>
                {mealJsx}
              </ul>
            ),
            type: "success",
            confirmName: "我知道了",
            mask: true,
            confirm() {
              return true;
            }
          });
          return;
        }
        that.$Tip.warning(res.msg);
      });
    }
  }
};
</script>
<style lang="stylus">
.machine-consumption-meal {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .main {
    padding-top: rems(342);
    height: 100vh;
    box-sizing: border-box;

    .container {
      margin-top: rems(20);
    }
  }
}
</style>
