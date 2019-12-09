<!-- 步骤条 -->
<template>
  <div class="step-bar flex-column flex-center">
    <span class="step-bar-line" :style="upStyl"></span>
    <span class="step-bar-num" :style="radiusStyl">{{num}}</span>
    <span class="step-bar-line" :style="downStyl"></span>
  </div>
</template>

<script>
export default {
  name: 'StepBar',
  props: {
    num: Number,
    radiusColor: String,
    upColor: String,
    downColor: String
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {
    downStyl () {
      return {
        'background-color': this.downColor
      }
    },
    upStyl () {
      return {
        'background-color': this.upColor
      }
    },
    radiusStyl () {
      return {
        'background-color': this.radiusColor
      }
    }
  },

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
$width = rems(45)
.step-bar
  .step-bar-num
    border-radius 50%
    font-size rems(24)
    text-align center
    line-height $width
    background-color #1890fc
    width $width
    height $width
    color #ffffff
  .step-bar-line
    width 2px
    height "calc((100% - %s) / 2)" % $width
    background-color #1890fc
</style>
