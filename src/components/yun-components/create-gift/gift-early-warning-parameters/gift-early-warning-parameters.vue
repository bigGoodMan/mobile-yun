<!-- 预警参数 -->
<template>
  <div class="gift-early-warning-parameters">
    <div class="padding-20-30">
      <HhfInput title="最大可抓取量" type="tel" v-model="canClawNum" placeholder="可填1~99，不填则默认6"/>
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.canClawNum">不在最大可抓取量范围1~99</span>
      </div>
      <div class="size-22 color-7 gift-early-warning-parameters-tip">该礼品可抓取区允许摆放的最大数</div>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput title="可抓取安全量" type="tel" v-model="canClawSafeNum" placeholder="可填1~99，不填则默认3"/>
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.canClawSafeNum">不在可抓取安全量范围1~99</span>
      </div>
      <div class="size-22 color-7 gift-early-warning-parameters-tip">抓取区预警值，低于此值触发报警</div>
    </div>
  </div>
</template>

<script>
import HhfInput from '@hhf/hhf-input'
import errRangeMixin from '@yun/mixins/errRangeMixin'
export default {
  name: 'gift_early_warning_parameters',
  mixins: [errRangeMixin],
  props: {
    result: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
    }
  },

  components: {
    HhfInput
  },

  computed: {
    // 最大可抓取量
    canClawNum: {
      get () {
        return this.result.can_claw_num
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'canClawNum'
        })
        this.$emit('trigger-change', {
          ...this.result,
          can_claw_num: val
        })
      }
    },
    // 可抓取安全量
    canClawSafeNum: {
      get () {
        return this.result.can_claw_safe_num
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'canClawSafeNum'
        })
        this.$emit('trigger-change', {
          ...this.result,
          can_claw_safe_num: val
        })
      }
    }
  },

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.gift-early-warning-parameters-tip
  padding rems(10) 0
</style>
