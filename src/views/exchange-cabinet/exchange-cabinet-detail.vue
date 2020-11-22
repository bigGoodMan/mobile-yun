<!-- 礼品柜详情 -->
<template>
  <div>
    <div class="flex-row flex-between-center bgcolor-f">
      <CellList title="柜门编号" class="flex-1" :value="hole_no" />
      <HhfButton
        type="info"
        size="small"
        :loading="loading"
        radius="0.05rem"
        @trigger-click="handleOpenDoor"
        >点击开门</HhfButton
      >
    </div>
    <div class="bgcolor-f margin-top-20">
      <div class="border"></div>
      <CellList
        title="在售礼品"
        class="bgcolor-f flex-1"
        right-icon="arrow"
        :value="giftValue"
        @trigger-click="giftShow = true"
      />
      <div class="border"></div>
      <div class="padding-20-30">
        <HhfInput
          v-model="gift_num"
          title="礼品可兑换数"
          type="tel"
          class="color-input"
          placeholder="请输入礼品兑换数"
        />
      </div>
    </div>
    <div
      class="flex-row flex-start-center margin-top-20 size-0"
      style="width:200px;"
    >
      <LoadingImg :img="gift_img" :thumb="gift_img" magnify />
    </div>
    <div class="fixed-max-width bottom-0">
      <HhfButton type="info" size="large" @trigger-click="handleConfirm"
        >确定</HhfButton
      >
    </div>
    <StoreGiftPopup
      v-model="giftShow"
      :storeId="storeId"
      @trigger-confirm="handleChooseGift"
    />
  </div>
</template>

<script>
import CellList from "@yun/cell-list";
import HhfInput from "@hhf/hhf-input";

import LoadingImg from "@yun/loading-img/loading-img";
import HhfButton from "@hhf/hhf-button";
import StoreGiftPopup from "@yun/gift-list/store-gift-popup";
import {
  getExchangeCabinetDetail,
  openGiftCabinetDoor,
  submitGiftCabinetExchangeGift
} from "@/api";
export default {
  name: "ExchangeCabinetDetail",

  components: {
    CellList,
    HhfButton,
    LoadingImg,
    HhfInput,
    StoreGiftPopup
  },

  data() {
    return {
      giftShow: false,
      storeId: "",
      hole_id: "",
      hole_no: "",
      gift_img: "",
      gift_id: "",
      gift_name: "",
      gift_num: "",
      mid: "",
      loading: false
    };
  },

  computed: {
    giftValue() {
      return `${this.gift_name}(${this.gift_id})`;
    }
  },
  created() {
    this.getExchangeCabinetDetail();
  },
  mounted() {},

  methods: {
    getExchangeCabinetDetail() {
      this.$Loading("正在加载中……");
      const { mid, hid, sid } = this.$route.query;
      this.mid = mid;
      this.storeId = sid;
      getExchangeCabinetDetail({
        mid,
        hole_id: hid
      }).then(res => {
        this.$Loading.clear();
        if (res && res.return_code === "0") {
          const { data } = res;
          this.hole_id = data.hole_id;
          this.hole_no = data.hole_no;
          this.gift_img = data.gift_img;
          this.gift_id = data.gift_id;
          this.gift_num = data.gift_num;
          this.gift_name = data.gift_name;
        }
      });
    },
    handleAddMore() {},
    handleOpenDoor() {
      this.$Loading("正在开门……");
      openGiftCabinetDoor({
        mid: this.mid,
        hole_no: this.hole_no
      }).then(res => {
        this.$Loading.clear();
        if (res.return_code === "0") {
          this.$Tip.success(res.msg);
          return;
        }
        this.$Tip.warning(res.msg);
      });
    },
    handleChooseGift(items) {
      if (items.length > 0) {
        const item = items[0];
        this.gift_id = item.gift_id;
        this.gift_name = item.gift_name;
        this.gift_img = item.gift_img;
      }
    },
    handleConfirm() {
      this.$Loading("正在提交中……");
      submitGiftCabinetExchangeGift({
        hole_id: this.hole_id,
        gift_id: this.gift_id,
        gift_num: this.gift_num
      }).then(res => {
        this.$Loading.clear();
        if (res.return_code === "0") {
          this.$Tip.success(res.msg);
          return;
        }
        this.$Tip.warning(res.msg);
      });
    }
  }
};
</script>
