<!-- 礼品天车参数 -->
<template>
<div class="gift-crown-block-parameters">
  <div>
    <CellList
      title="天车前后速度F"
      :value="craneSpeed[result.car_speed_front_back]"
      right-icon
      @trigger-click="frontBackShow = true"
    />
  </div>
    <div class="border border-ebedf0"></div>
  <div>
    <CellList
      title="天车左右速度L"
      :value="craneSpeed[result.car_speed_left_right]"
      right-icon
      @trigger-click="leftRightShow = true"
    />
  </div>
    <div class="border border-ebedf0"></div>
  <div>
    <CellList
      title="天车上下速度U"
      :value="craneSpeed[result.car_speed_up_down]"
      right-icon
      @trigger-click="upDownShow = true"
    />
  </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30">
      <HhfInput title="绳长"  type="tel" v-model="lineLength" placeholder="可填10~50，不填则默认18"/>
      <div class="color-error size-20 text-right height-err">
        <span v-show="errObj.lineLength">不在绳长范围10~50</span>
      </div>
    </div>
       <BottomPopup :columns="frontBackColumns" :show="frontBackShow" @trigger-confirm="(obj) => handleConfirm('car_speed_front_back', obj)" @trigger-close="frontBackShow = false" />
       <BottomPopup :columns="leftRightColumns" :show="leftRightShow" @trigger-confirm="(obj) => handleConfirm('car_speed_left_right', obj)" @trigger-close="leftRightShow = false" />
       <BottomPopup :columns="upDownColumns" :show="upDownShow" @trigger-confirm="(obj) => handleConfirm('car_speed_up_down', obj)" @trigger-close="upDownShow = false" />
</div>
</template>

<script>
import HhfInput from '@hhf/hhf-input'
import CellList from '@yun/cell-list'
import BottomPopup from '@yun/bottom-popup'
import { CRANE_SPEED } from '@l/judge'
import errRangeMixin from '@yun/mixins/errRangeMixin'
export default {
  name: 'gift_crown_block_parameters',
  mixins: [errRangeMixin],
  props: {
    result: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      frontBackShow: false,
      leftRightShow: false,
      upDownShow: false,
      craneSpeed: CRANE_SPEED
    }
  },

  components: {
    HhfInput,
    BottomPopup,
    CellList
  },

  computed: {
    frontBackColumns () {
      return this.commonColumn('car_speed_front_back')
    },
    leftRightColumns () {
      return this.commonColumn('car_speed_left_right')
    },
    upDownColumns () {
      return this.commonColumn('car_speed_up_down')
    },
    lineLength: {
      get () {
        return this.result.line_length
      },
      set (val) {
        this.judgeFunc({
          value: val,
          range: [10, 50],
          key: 'lineLength'
        })
        this.$emit('trigger-change', {
          ...this.result,
          line_length: val
        })
      }
    }
  },
  watch: {
  },
  methods: {
    commonColumn (key) {
      const id = this.result[key]
      let defaultIndex = 0
      let values = []
      const keyArr = Object.keys(CRANE_SPEED)
      keyArr.forEach((v, i) => {
        if (v === id) {
          defaultIndex = i
        }
        values.push({
          text: CRANE_SPEED[v],
          id: v
        })
      })
      return [{
        values,
        defaultIndex
      }]
    },
    handleConfirm (key, obj) {
      this.$emit('trigger-change', {
        ...this.result,
        [key]: obj.value[0].id
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
