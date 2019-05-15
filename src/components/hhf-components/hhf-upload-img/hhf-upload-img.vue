<!-- 可以压缩上传图片 -->
<template>
  <div class="hhf-upload-img">
    <input type="file" :accept="accept" v-show="false" @change="handleChange($event)" ref="imgRef" />
    <div class="hhf-upload-img-container">
      <div class="hhf-upload-img-add" @click="handleClick">
        <div class="hhf-upload-img-add-container">
          <HhfIcon name="add" class="size-32 hhf-upload-img-add-icon" />
          <span class="hhf-upload-img-add-img">添加图片</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HhfIcon from '../hhf-icon'
import pictureCompress from '@l/pictureCompress'
export default {
  name: '',
  props: {
    // 上传图片类型
    accept: {
      type: String,
      default: 'image/*'
    },
    // 是否禁添加图片
    disabled: {
      type: Boolean,
      default: false
    },
    // 压缩质量
    quality: {
      type: Number,
      default: 1
    },
    // 压缩之后的最大宽度
    maxWidth: {
      type: Number,
      default: 500
    },
    // 压缩之后的最大高度
    maxHeight: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
    }
  },

  components: {
    HhfIcon
  },

  computed: {},

  methods: {
    handleClick () {
      this.$refs['imgRef'].value = ''
      this.$refs['imgRef'].click()
    },
    handleChange (e) {
      let file = e.target.files[0]
      const _this = this
      const {
        quality,
        maxWidth,
        maxHeight
      } = _this
      pictureCompress.fileResizetoFile(file, function (b) {
        // if (Object.prototype.toString.call(b) === '[object Blob]') {
        //   var fileReader = new FileReader()
        //   fileReader.onload = function (ee) {
        //     _this.handleCallBack(ee.target.result)
        //   }
        //   fileReader.readAsDataURL(b)
        // } else {
        _this.handleCallBack(b)
        // }
      }, quality, maxWidth, maxHeight)
    },
    handleCallBack (blob) {
      this.$emit('trigger-change', blob)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.hhf-upload-img
  background-color #ffffff
  border-radius 0.1rem
  .hhf-upload-img-container
    display flex
    flex-flow row wrap
    justify-content flex-start
    align-items flex-start
    width 100%
    padding 0.23rem
    min-height 3.2rem
    box-sizing border-box
    .hhf-upload-img-add
      width 25%
      box-sizing border-box
      padding-right 0.15rem
      .hhf-upload-img-add-container
        display flex
        flex-flow column nowrap
        justify-content center
        align-items center
        border 1px dashed #c6c6c6
        height 1.49rem
      .hhf-upload-img-add-icon
        display flex
        width 0.6rem
        height 0.6rem
        flex-flow row nowrap
        justify-content center
        align-items center
        border-radius 50%
        background-color #5094f3
        color #ffffff
        font-size 0.36rem
      .hhf-upload-img-add-img
        padding-top 0.1rem
        font-size 0.26rem
        color #919191
</style>
