<!-- 商品建档 -->
<template>
  <div>
    <div class="bgcolor-f">
      <GiftInfo :result="giftInfo" @trigger-change="obj => (giftInfo = obj)" />
    </div>
    <div class="fixed-max-width bottom-0">
      <HhfButton type="info" size="large" @trigger-click="handleConfirm"
        >确定</HhfButton
      >
    </div>
  </div>
</template>

<script>
import GiftInfo from "@yun/create-gift/gift-info";
import HhfButton from "@hhf/hhf-button";
import { catSystemAddGood } from "@/api";
import { mapState } from "vuex";
export default {
  name: "CatCreateGood",

  components: {
    GiftInfo,
    HhfButton
  },

  data() {
    return {
      giftInfo: {
        gift_name: "",
        img: "",
        base64Src: ""
      }
    };
  },

  computed: {
    ...mapState({
      cSid: state => state.catSystem.cSid
    })
  },

  mounted() {},

  methods: {
    handleConfirm() {
      const { giftInfo, cSid } = this;
      if (giftInfo.gift_name && giftInfo.img) {
        this.$Loading("正在保存……");
        catSystemAddGood({
          mall_store_id: cSid,
          name: giftInfo.gift_name,
          img: giftInfo.img
        }).then(res => {
          this.$Loading.clear();
          if (res.return_code === "0") {
            this.$Tip.success(res.msg);
            return;
          }
          this.$Tip.warning(res.msg);
        });
        return;
      }
      this.$Tip.warning("商品名称和图片不能为空");
    }
  }
};
</script>
