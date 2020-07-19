<!-- 新建盘点 -->
<template>
  <div class="create-inventory">
    <van-radio-group v-model="radio">
      <div v-for="(items, index) in list" :key="index">
        <div
          class="flex-row flex-between-center size-28 color-393d49 create-inventory-store bgcolor-f"
          @click="handleCheck(items)"
        >
          <van-radio :name="items.store_id" :disabled="items.disabled"
            ><span class="weight-bold">{{ items.store_name }}</span></van-radio
          >
          <span class="color-error size-24">{{ items.statusName }}</span>
        </div>
        <div class="border"></div>
      </div>
    </van-radio-group>
    <div class="create-inventory-btn">
      <div class="create-inventory-btn-container">
        <HhfButton
          type="info"
          size="large"
          :loading="loading"
          @trigger-click="handleCreate"
          >开始盘点</HhfButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import HhfButton from "@hhf/hhf-button";
import { STOCK_TAKING_STATUS } from "@l/judge";
import { getStoreApi, createInventoryOrderApi } from "@/api";
export default {
  name: "CreateInventory",

  components: {
    HhfButton
  },

  data() {
    return {
      radio: null,
      list: [],
      loading: false
    };
  },

  computed: {},
  created() {
    this.getInventoryStore();
  },
  mounted() {},

  methods: {
    // 获取盘点门店
    getInventoryStore() {
      this.$toast.loading({
        message: "加载中...",
        duration: 0
      });
      getStoreApi({
        type: 1
      }).then(res => {
        this.$toast.clear();
        if (res.return_code === "0") {
          this.list = res.data.map(v => {
            const obj = {
              ...v,
              statusName: "",
              disabled: false
            };
            if (v.audit_status === "2" || v.audit_status === "3") {
              obj.statusName = STOCK_TAKING_STATUS[v.audit_status];
              obj.disabled = true;
            }
            return obj;
          });
        }
      });
    },
    // 选中
    handleCheck(items) {
      if (!items.disabled) {
        this.radio = items.store_id;
      }
    },
    // 创建盘点单
    handleCreate() {
      const { radio } = this;
      const $this = this;
      if (!radio) {
        this.$Tip.warning("请选择门店");
        return;
      }
      $this.loading = true;
      $this.$Confirm.warning({
        message: "提示",
        descrition:
          "开始盘点后系统将会禁止出入库操作，同时请确保机器停止营业无礼品掉落",
        mask: true,
        confirm(keyName) {
          createInventoryOrderApi({
            store_id: radio
          }).then(res => {
            $this.$Confirm.close(keyName);
            $this.loading = false;
            if (res.return_code === "0") {
              $this.$router.push({
                name: "inventorying",
                query: { id: res.data, sid: radio }
              });
            } else if (res.return_code) {
              $this.$Tip.warning({
                mask: true,
                message: res.msg
              });
            }
          });
        },
        cancel() {
          $this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.create-inventory
  .create-inventory-store
    padding rems(30) rems(20)
  .create-inventory-btn
    height rems(100)
    .create-inventory-btn-container
      position fixed
      left 0
      bottom 0
      width 100%
</style>
