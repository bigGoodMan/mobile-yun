<!-- 库存盘点列表过滤 -->
<template>
  <div class="stock-taking-list-filter">
    <van-popup
      v-model="show"
      position="right"
      class="stock-taking-list-filter-container"
      @click-overlay="handleClose"
    >
      <FilterList title="状态">
        <div class="size-0">
          <div
            v-for="items in statusList"
            :key="items.id"
            class="stock-taking-list-filter-status"
          >
            <HhfButton
              classes="stock-taking-list-filter-status-btn"
              :styles="items.checked ? statusStyles : null"
              @trigger-click="handleClick(items)"
              >{{ items.value }}</HhfButton
            >
          </div>
        </div>
      </FilterList>
      <FilterList title="盘点时间">
        <div class="flex-row flex-between-center">
          <span
            class="stock-taking-list-filter-date flex-row flex-center"
            @click="handleDateClick('startShow', true)"
            >{{ startStr }}</span
          ><span class="stock-taking-list-filter-rod size-32">-</span
          ><span
            class="stock-taking-list-filter-date flex-row flex-center"
            @click="handleDateClick('endShow', true)"
            >{{ endStr }}</span
          >
        </div>
      </FilterList>
      <FilterList title="门店">
        <div
          class="stock-taking-list-filter-store flex-row flex-center"
          @click="handleStoreClick"
        >
          {{ store.store_name }}
        </div>
      </FilterList>
      <div class="stock-taking-list-filter-btn flex-row flex-center">
        <div class="flex-1">
          <HhfButton size="large" @trigger-click="handleReset">重置</HhfButton>
        </div>
        <div class="flex-1">
          <HhfButton type="info" size="large" @trigger-click="handleConfirm"
            >确定</HhfButton
          >
        </div>
      </div>
    </van-popup>
    <!-- 开始时间 -->
    <van-popup v-model="startShow" position="bottom">
      <van-datetime-picker
        v-model="startDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="handleDateClick('startShow', false)"
        @confirm="
          val => handleDateConfirm('startStr', 'startDate', val, 'startShow')
        "
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup v-model="endShow" position="bottom">
      <van-datetime-picker
        v-model="endDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="handleDateClick('endShow', false)"
        @confirm="val => handleDateConfirm('endStr', 'endDate', val, 'endShow')"
      />
    </van-popup>
    <BottomPopup
      :columns="storeColumns"
      :default-index="defaultIndex"
      :show="storeShow"
      @trigger-confirm="handleStoreConfirm"
      @trigger-close="handleStoreClose"
    />
  </div>
</template>

<script>
import BottomPopup from "@yun/bottom-popup";
import HhfButton from "@hhf/hhf-button";
import FilterList from "../filter-list";
import { STOCK_TAKING_STATUS } from "@l/judge";
import moment from "moment";
import { mapState, mapActions } from "vuex";
export default {
  name: "StockTakingListFilter",

  components: {
    FilterList,
    HhfButton,
    BottomPopup
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      statusList: [],
      statusStyles: {
        color: "#1890fc",
        borderColor: "#1890fc",
        backgroundColor: "rgba(24, 144, 252, 0.1)"
      },
      startShow: false,
      endShow: false,
      startDate: "",
      endDate: "",
      startStr: "开始时间",
      endStr: "结束时间",
      minDate: moment()
        .add(-2, "year")
        .toDate(),
      maxDate: new Date(),
      // 门店
      defaultIndex: 0,
      storeShow: false,
      store: {
        store_id: "0",
        store_name: "全部门店"
      }
    };
  },

  computed: {
    ...mapState({
      storeList: state => state.common.storeList
    }),
    storeColumns() {
      const storeList = [
        {
          store_id: "0",
          store_name: "全部门店"
        },
        ...this.storeList
      ];
      return storeList.map(v => {
        const items = {
          text: v.store_name,
          ...v
        };
        return items;
      });
    }
  },

  created() {
    this.statusArrange();
    this.getStore();
  },
  methods: {
    ...mapActions(["COMMON_GETSTORE_ACTION"]),
    // 关闭筛选弹窗
    handleClose() {
      this.$emit("trigger-close");
    },
    // 点击状态
    handleClick(items) {
      if (items.id === "1") {
        const checked = !items.checked;
        this.statusList = this.statusList.map(v => ({
          ...v,
          checked
        }));
        return;
      }
      const len = this.statusList.length - 1;
      let i = 0; // 是否为全选
      const statusList = this.statusList.map(v => {
        const obj = {
          ...v
        };
        if (items.id === v.id) {
          obj.checked = !v.checked;
        }
        v.id !== "1" && obj.checked && i++;
        return obj;
      });
      statusList.some(v => {
        if (v.id === "1") {
          v.checked = i === len;
        }
        return v.id === "1";
      });
      this.statusList = statusList;
    },
    // 整理状态数据
    statusArrange() {
      const keyArr = Object.keys(STOCK_TAKING_STATUS);
      keyArr.forEach(v => {
        this.statusList.push({
          checked: false,
          id: v,
          value: STOCK_TAKING_STATUS[v]
        });
      });
    },
    // 展示选择时间弹窗
    handleDateClick(key, bool) {
      this[key] = bool;
    },
    handleDateConfirm(key, key2, val, show) {
      this[key2] = val;
      this[key] = moment(val).format("YYYY-MM-DD");
      this.handleDateClick(show, false);
    },
    // 获取门店
    getStore() {
      this.COMMON_GETSTORE_ACTION().then(res => {
        if (res.return_code !== "0") {
          this.$Tip.warning(res.msg);
        }
      });
    },
    // 打开
    handleStoreClick() {
      this.storeShow = true;
    },
    handleStoreConfirm({ value, index }) {
      this.store = {
        ...value
      };
      this.$emit("trigger-click", { value, index });
    },
    // 关闭
    handleStoreClose() {
      this.storeShow = false;
    },
    // 重置
    handleReset() {
      // 状态重置
      this.statusList = this.statusList.map(v => {
        const obj = {
          ...v
        };
        obj.checked = false;
        return obj;
      });
      // 时间重置
      this.startDate = "";
      this.endDate = "";
      this.startStr = "开始时间";
      this.endStr = "结束时间";
      // 门店重置
      this.store = {
        store_id: "0",
        store_name: "全部门店"
      };
    },
    handleConfirm() {
      const { startDate, endDate, startStr, endStr, store, statusList } = this;
      if (startDate - 0 > endDate) {
        this.startDate = endDate;
        this.endDate = startDate;
        this.startStr = endStr;
        this.endStr = startStr;
      }
      this.$emit("trigger-confirm", {
        startDate: this.startDate
          ? moment(`${this.startStr} 00:00:00`).unix()
          : "",
        endDate: this.endDate ? moment(`${this.endStr} 23:59:59`).unix() : "",
        store,
        statusList
      });
      this.handleClose();
    }
  }
};
</script>
<style lang="stylus" scoped>
initStyle()
  border-radius rems(40)
  background-color #eaeaea
  font-size rems(28)
  color #292929
  height rems(60)
.stock-taking-list-filter
  .stock-taking-list-filter-container
    width 90%
    height 100%
    .stock-taking-list-filter-status
      width 30%
      display inline-block
      margin-bottom rems(20)
      &:not(:nth-child(3n))
        margin-right 5%
      .stock-taking-list-filter-status-btn
        initStyle()
        width 100%
    .stock-taking-list-filter-date
      initStyle()
      text-align center
      flex 1 1 auto
      flex-basis 0%
      overflow hidden
    .stock-taking-list-filter-rod
      padding 0 rems(10)
    .stock-taking-list-filter-store
      initStyle()
    .stock-taking-list-filter-btn
      position absolute
      bottom 0
      left 0
      width 100%
</style>
