<!-- 礼品信息 -->
<template>
  <div>
    <div class="padding-20-30">
    <HhfInput title="礼品名称（必填）" :maxlength="20" type="text" v-model="giftName" placeholder="请输入礼品名称，二十字以内"/>
    </div>
    <div class="border border-ebedf0"></div>
    <div class="gift-info-img-column flex-row flex-start-center">
      <span class="gift-info-name size-28">图片（必填）</span>
      <UploadImg class="flex-1" :maxlength="1" :column="result.column" @trigger-change="handleChange" />
    </div>
  </div>
</template>

<script>
import UploadImg from '@yun/upload-img'
import HhfInput from '@hhf/hhf-input'
export default {
  name: 'gift_info',
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
    UploadImg,
    HhfInput
  },

  computed: {
    column () {
      return this.result.img ? [{
        src: this.result.img
      }] : null
    },
    giftName: {
      get () {
        return this.result.gift_name
      },
      set (val) {
        this.$emit('trigger-change', {
          ...this.result,
          gift_name: val
        })
      }
    }
  },

  methods: {
    handleChange (obj) {
      this.$emit('trigger-change', {
        ...this.result,
        img: obj.src
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.gift-info-img-column
  padding 0 rems(30)
.gift-info-name
  padding-right rems(10)
</style>
