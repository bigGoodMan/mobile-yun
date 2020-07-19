<!-- 礼品基础参数设置 -->
<template>
  <div class="gift-basic-parameters">
    <div>
      <CellList
        title="适用机型"
        :value="giftMachineType[result.machine_type]"
        placeholder="请选择"
        right-icon="arrow"
        @trigger-click="typeShow = true"
      />
    </div>
    <div class="border border-ebedf0"></div>
    <div>
      <CellList
        title="适用爪子"
        :value="clawType[result.claw_type]"
        placeholder="请选择"
        right-icon
        @trigger-click="clawShow = true"
      />
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput
        v-model="defaultEarnRate"
        title="预设毛利率（%）"
        type="tel"
        class="color-input"
        placeholder="可填1~100，不填则默认75%"
      />
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.defaultEarnRate">不在毛利率范围1~100</span>
      </div>
      <div class="size-22 color-7 gift-basic-parameters-tip">
        该礼品配置到机台上时，系统会根据此值计算出合理的获奖局数
      </div>
    </div>
    <BottomPopup
      :columns="typeColumns"
      :show="typeShow"
      @trigger-confirm="val => handleConfirm('machine_type', val)"
      @trigger-close="typeShow = false"
    />
    <BottomPopup
      :columns="clawColumns"
      :show="clawShow"
      @trigger-confirm="val => handleConfirm('claw_type', val)"
      @trigger-close="clawShow = false"
    />
  </div>
</template>

<script>
import HhfInput from "@hhf/hhf-input";
import BottomPopup from "@yun/bottom-popup";
import CellList from "@yun/cell-list";
import { GIFT_MACHINE_TYPE, CLAW_TYPE } from "@l/judge";
import errRangeMixin from "@yun/mixins/errRangeMixin";
export default {
  name: "GiftBasicParameters",

  components: {
    HhfInput,
    BottomPopup,
    CellList
  },
  mixins: [errRangeMixin],
  props: {
    result: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 机型
      giftMachineType: GIFT_MACHINE_TYPE,
      typeShow: false,
      // 爪型
      clawType: CLAW_TYPE,
      clawShow: false
    };
  },

  computed: {
    // 机型
    typeColumns() {
      return this.commonColumn("machine_type", GIFT_MACHINE_TYPE);
    },
    clawColumns() {
      return this.commonColumn("claw_type", CLAW_TYPE);
    },
    defaultEarnRate: {
      get() {
        return this.result.default_earn_rate;
      },
      set(val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: "defaultEarnRate"
        });
        this.$emit("trigger-change", {
          ...this.result,
          default_earn_rate: val
        });
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    commonColumn(key, obj) {
      const id = this.result[key];
      let defaultIndex = 0;
      const values = [];
      const keyArr = Object.keys(obj);
      keyArr.forEach((v, i) => {
        if (v === id) {
          defaultIndex = i;
        }
        values.push({
          text: obj[v],
          id: v
        });
      });
      return [
        {
          values,
          defaultIndex
        }
      ];
    },
    handleConfirm(key, obj) {
      this.$emit("trigger-change", {
        ...this.result,
        [key]: obj.value[0].id
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.gift-basic-parameters-tip
  padding rems(10) 0
</style>
