<!-- 消费套餐编辑添加 -->
<template>
  <van-popup v-model="show" :close-on-click-overlay="false">
    <div class="consumption-package-popup">
      <dl class="list-first">
        <dt class="title size-28 weight-bold">套餐名称</dt>
        <dd class="content"><HhfInput placeholder="请输入套餐名称" position="left"/></dd>
        <dd class="content border"></dd>
      </dl>
      <dl class="list-second">
        <dt class="title size-28 weight-bold">规则</dt>
        <dd class="margin-0 content">
          <HhfInput title="每满" type="tel" placeholder="1~20" position="center" width="2rem" border suffix="局"/>
        </dd>
        <dd class="margin-0 content">
          <!-- eslint-disable-next-line no-irregular-whitespace -->
          <HhfInput title="送　" type="tel" placeholder="1~20" position="center" width="2rem" border suffix="局"/>
        </dd>
      </dl>
       <div class="cross" @click="handleClose">
      <van-icon name="cross" color="#ee0a24" size="20px" class="weight-bold" />
    </div>
      <div class="text-center">
      <HhfButton type="info" size="normal" radius="0.1rem">保存</HhfButton>
      </div>
    </div>
  </van-popup>
</template>

<script>
import HhfInput from '@hhf/hhf-input'
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'ConsumptionPackagePopup',
  data () {
    return {
    }
  },
  model: {
    prop: 'show',
    event: 'trigger-change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    HhfInput,
    HhfButton
  },

  computed: {},

  methods: {
    handleClose () {
      this.$emit('trigger-change', false)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.consumption-package-popup
  position relative
  padding rems(30) rems(40)
  min-width 90vw
  box-sizing border-box
  .list-first
    margin 0
    .title
      margin-bottom rems(20)
    .content
      margin 0
  .list-second
    margin-bottom 0
    margin-top rems(30)
    .content
      padding-top rems(20)
  .cross
    font-size 0
    position absolute
    top rems(10)
    right rems(10)
</style>
