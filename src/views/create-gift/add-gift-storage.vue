<!--  -->
<template>
  <div>
    <div class="bgcolor-f">
      <MyStore @trigger-click="handleConfirm" />
    </div>
    <div class="margin-top-20">
      <h5
        class="margin-0 padding-20-30 bgcolor-f size-0 flex-row flex-between-center"
      >
        <div>
          <span class="size-28">礼品列表</span>
          <span class="size-24 color-7 padding-left-10"
            >共{{ typeNum }}款，{{ total.num }}个，{{
              total.money_cost
            }}元</span
          >
        </div>
        <div class="padding-left-10">
          <HhfButton
            type="info"
            size="small"
            radius="0.4rem"
            @trigger-click="handleGo"
            >添加礼品</HhfButton
          >
        </div>
      </h5>
      <div
        v-for="items of giftStorageList"
        :key="items.gift_id"
        class="margin-bottom-20"
      >
        <GiftStorageItem
          :result="items"
          @trigger-delete="GIFT_DELETEGIFTSTORAGELIST_MUTATE(items)"
        />
      </div>
    </div>
    <!-- 按钮 -->
    <div class="height-100">
      <div class="fixed-max-width bottom-0 size-0 zindex-2">
        <HhfButton
          type="info"
          size="large"
          :loading="btnLoading"
          @trigger-click="handleSubmit"
          >提交</HhfButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import MyStore from "@yun/my-store";
import HhfButton from "@hhf/hhf-button";
import GiftStorageItem from "@yun/create-gift/gift-storage-item";
import { addGiftStorageOrderApi } from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AddGiftStorage",

  components: {
    HhfButton,
    MyStore,
    GiftStorageItem
  },

  data() {
    return {
      storeId: null,
      brandId: null,
      brandName: null,
      btnLoading: false
    };
  },

  computed: {
    ...mapState({
      giftStorageList: state => state.gift.giftStorageList
    }),
    typeNum() {
      return this.giftStorageList.length;
    },
    total() {
      let num = 0;
      let price = 0;
      this.giftStorageList.forEach(v => {
        num += v.num - 0;
        price += v.money_cost * v.num;
      });
      return {
        num,
        money_cost: price.toFixed(2)
      };
    }
  },

  methods: {
    ...mapMutations([
      "GIFT_DELETEGIFTSTORAGELIST_MUTATE",
      "GIFT_CLEARGIFTSTORAGELIST_MUTATE"
    ]),
    // 去添加礼品
    handleGo() {
      if (!this.storeId) {
        this.$Tip.warning("请选择门店");
        return;
      }
      this.$router.push({
        name: "storege_gift_add_list",
        query: {
          sid: this.storeId,
          bid: this.brandId,
          brandname: this.brandName
        }
      });
    },
    handleConfirm(obj) {
      if (this.storeId === obj.value.store_id) {
        return;
      }
      this.GIFT_CLEARGIFTSTORAGELIST_MUTATE();
      this.brandId = obj.value.brand_id;
      this.storeId = obj.value.store_id;
      this.brandName = obj.value.brand_name;
    },
    // 提交入库
    handleSubmit() {
      const data = [];
      if (!this.storeId) {
        this.$Tip.warning("请选择门店");
        return;
      }
      if (!this.giftStorageList.length === 0) {
        this.$Tip.warning("请添加礼品");
        return;
      }
      for (let i = 0; i < this.giftStorageList.length; ++i) {
        const items = this.giftStorageList[i];
        if (
          !(
            /^[0-9]+(\.[0-9]{1,2})?$/.test(items.money_cost) &&
            items.money_cost >= 0.01 &&
            items.money_cost <= 999
          )
        ) {
          this.$Tip.warning("成本单价数据不正确");
          return;
        }
        if (
          !(/^[0-9]+$/.test(items.num) && items.num >= 1 && items.num <= 99999)
        ) {
          this.$Tip.warning("有礼品入库数量数据不正确");
          return;
        }
        data.push({
          gift_id: items.gift_id,
          num: items.num,
          money_cost: items.money_cost
        });
      }
      this.btnLoading = true;
      addGiftStorageOrderApi({
        data,
        store_id: this.storeId,
        totle_order_num: this.total.num
      }).then(res => {
        this.btnLoading = false;
        if (res.return_code === "0") {
          const $this = this;
          this.GIFT_CLEARGIFTSTORAGELIST_MUTATE();
          $this.$Tip.success({
            message: "提交成功",
            mask: true,
            close() {
              $this.$router.push({
                name: "gift_storage_record"
              });
            }
          });
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
