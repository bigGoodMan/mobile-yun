<!-- 盘点中列表 -->
<template>
  <div class="bgcolor-f inventorying-list">
    <div class="inventorying-list-cell">
      <div class="size-0 flex-row flex-start">
        <div class="inventorying-list-cell-img bgcolor-f2 flex-row flex-center">
          <img
            class="inventorying-list-cell-img-content"
            v-lazy="obj.thumb"
          >
        </div>
        <div class="inventorying-list-describe flex-column flex-start size-393d49">
          <span class="weight-bold size-32 inventorying-list-describe-name">{{obj.name}}</span>
          <span class="size-28">编号{{obj.gift_id}}</span>
        </div>
      </div>
      <div class="flex-row flex-between-center">
        <div class="size-28 size-393d49 width-50">所在库位：<span>{{obj.location_info ? obj.location_info : '未标记库位'}}</span></div>
        <div class="flex-row flex-center">
          <span class="size-28 size-393d49 inventorying-list-text">实盘数</span>
          <HhfStepper v-model="obj.num" :max="99999" :min="0" @trigger-blur="handleStepperWatch" @trigger-add="handleStepperWatch" @trigger-reduce="handleStepperWatch"/>
        </div>
      </div>
      <div class="text-right size-24 color-error inventorying-list-warn">
        <span v-show="emptyShow">实盘数不能为空</span>
        <span v-show="errShow">实盘数小于可抓取数，请在商家app调整{{obj.location_info}}可抓取数</span>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
import HhfStepper from '@hhf/hhf-stepper'
import { addInventoryDataApi } from '@/api'
export default {
  name: 'inventorying_list',
  props: {
    obj: Object
  },
  data () {
    return {
      max: 99999,
      emptyShow: false,
      errShow: false
    }
  },

  components: {
    HhfStepper
  },

  computed: {},

  methods: {
    handleClearTime () {
      clearTimeout(this.timer)
      this.timer = null
    },
    handleChange (val) {
      if (val > this.max) {
        return
      }
      const {
        id,
        sid
      } = this.$route.query
      const {
        obj
      } = this
      this.handleClearTime()
      this.timer = setTimeout(() => {
        addInventoryDataApi({
          store_id: sid,
          inventory_id: id,
          gift_id: obj.gift_id,
          num: val
        }).then(res => {
          if (res.return_code !== '0' && res.msg) {
            this.$Tip.warning({
              message: res.msg,
              mask: true
            })
          }
        })
      }, 500)
    },
    handleStepperWatch (val) {
      const {
        obj
      } = this
      this.emptyShow = false
      this.errShow = false
      if (val === '') {
        this.emptyShow = true
        return
      } else if (obj.num < obj.conf_num - 0) {
        this.errShow = true
        return
      }
      this.handleChange(val)
    }
  },

  mounted () {
    // console.log(this.$refs['img'].getBoundingClientRect())
  },
  beforeDestroy () {
    this.handleClearTime()
  }
}
</script>
<style lang="stylus" scoped>
.inventorying-list
  .inventorying-list-cell
    padding rems(20)
    .inventorying-list-cell-img
      width rems(150)
      height rems(150)
      .inventorying-list-cell-img-content
        max-width 100%
        max-height 100%
    .inventorying-list-describe
      padding-left rems(20)
      .inventorying-list-describe-name
        padding-bottom rems(20)
    .inventorying-list-text
      margin-right rems(10)
    .inventorying-list-warn
      min-height rems(32)
</style>
