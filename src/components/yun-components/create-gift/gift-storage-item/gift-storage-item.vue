<!-- 新增礼品入库模块 -->
<template>
  <div class="bgcolor-f">
    <GiftList :result="result">
      <div class="flex-column flex-start-center">
        <div @click="handleDelete(result)">
          <van-icon class="size-40" name="delete" />
        </div>
      </div>
    </GiftList>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30-0">
      <HhfInput title="成本单价（元）" placeholder="请输入成本单价" type="number" v-model="result.money_cost" @trigger-blur="handleBlur('money_cost')"/>
      <div class="color-error size-24 text-right height-err margin-top-10">
        <span v-show="errObj.money_cost">请填写0.01~999范围的数字</span>
      </div>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="padding-20-30-0">
      <HhfInput title="入库数量" placeholder="请输入数量" type="tel" v-model="result.num" @trigger-blur="handleBlur('num')"/>
      <div class="color-error size-24 text-right height-err margin-top-10">
        <span v-show="errObj.num">请填写1~99999范围的整数</span>
      </div>
    </div>
  </div>
</template>

<script>
import HhfInput from '@hhf/hhf-input'
import GiftList from '@yun/gift-list'
import errRangeMixin from '@yun/mixins/errRangeMixin'
export default {
  name: 'gift_storage_item',
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
    HhfInput,
    GiftList
  },

  computed: {},

  methods: {
    // 删除
    handleDelete (obj) {
      this.$emit('trigger-delete', obj)
    },
    handleBlur (key) {
      const val = this.result[key]
      if (key === 'money_cost') {
        this.judgeNumberNotEmptyFunc({
          value: val,
          range: [0.01, 999],
          key: 'money_cost'
        })
      } else if (key === 'num') {
        this.judgeIntegerNotEmptyFunc({
          value: val,
          range: [1, 99999],
          key: 'num'
        })
      }
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
