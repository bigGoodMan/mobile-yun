<!-- 抓力参数 -->
<template>
  <div class="grasping-power-parameters">
    <div class="padding-20-30">
      <HhfInput title="C1抓力" type="tel" v-model="grabVoltage" placeholder="可填0~48，不填则默认48" />
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.grabVoltage">不在C1抓力范围0~48</span>
      </div>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput title="C2抓力" type="tel" v-model="fallVoltage" placeholder="可填0~48，不填则默认10" />
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.fallVoltage">不在C2抓力范围0~48</span>
      </div>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput title="C3抓力" type="tel" v-model="afterFallVoltage" placeholder="可填0~48，不填则默认8" />
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.afterFallVoltage">不在C3抓力范围0~48</span>
      </div>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput title="C4抓力" type="tel" v-model="vigorouslyVoltage" placeholder="可填0~48，不填则默认48" />
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.vigorouslyVoltage">不在C4抓力范围0~48</span>
      </div>
    </div>
  </div>
</template>

<script>
import HhfInput from '@hhf/hhf-input'
import errRangeMixin from '@yun/mixins/errRangeMixin'
export default {
  name: 'grasping_power_parameters',
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
    grabVoltage: { // 和抓电压C1
      get () {
        return this.result.grab_voltage
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'grabVoltage'
        })
        this.$emit('trigger-change', {
          ...this.result,
          grab_voltage: val
        })
      }
    },
    fallVoltage: { // 落物电压C2
      get () {
        return this.result.fall_voltage
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'fallVoltage'
        })
        this.$emit('trigger-change', {
          ...this.result,
          fall_voltage: val
        })
      }
    },
    afterFallVoltage: { // 落物后电压C3
      get () {
        return this.result.after_fall_voltage
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'afterFallVoltage'
        })
        this.$emit('trigger-change', {
          ...this.result,
          after_fall_voltage: val
        })
      }
    },
    vigorouslyVoltage: { // 大力电压C4
      get () {
        return this.result.vigorously_voltage
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [1, 100],
          key: 'vigorouslyVoltage'
        })
        this.$emit('trigger-change', {
          ...this.result,
          vigorously_voltage: val
        })
      }
    }
  },

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
