<!-- 可以压缩上传图片 -->
<template>
  <div class="hhf-upload-img size-0 display-inline-block">
    <input
      type="file"
      :accept="accept"
      v-show="false"
      @change="handleChange($event)"
      ref="imgRef"
    />
    <div
      class="hhf-upload-img-container flex-column flex-center size-0"
      @click="handleClick"
    >
    <div :class="['hhf-upload-img-add-icon size-36 flex-row flex-center', btnCls]">
      <HhfIcon
        name="add"
      />
    </div>
      <span class="hhf-upload-img-add-img size-26 color-7">添加图片</span>
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
    maxWidth: Number,
    // 压缩之后的最大高度
    maxHeight: Number,
    // 最大尺寸
    maxSize: Number
  },
  data () {
    return {
    }
  },

  components: {
    HhfIcon
  },

  computed: {
    btnCls () {
      return this.disabled ? 'hhf-upload-img-btn-disabled' : null
    }
  },

  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$refs['imgRef'].value = ''
        this.$refs['imgRef'].click()
      }
    },
    handleChange (e) {
      this.$Loading('图片压缩中')
      let file = e.target.files[0]
      const _this = this
      const {
        quality,
        maxWidth,
        maxHeight,
        maxSize
      } = _this
      if (maxSize && quality < 1 && file.size > maxSize * 1024 * 1024) {
        pictureCompress.fileResizetoFile(file, function (b) {
          if (b.size > maxSize * 1024 * 1024) {
            pictureCompress.fileResizetoFile(file, function (b2) {
              _this.handleCallBack(b2)
              _this.$Loading.clear()
            }, 1, 400, 400)
            return
          }
          // if (Object.prototype.toString.call(b) === '[object Blob]') {
          //   var fileReader = new FileReader()
          //   fileReader.onload = function (ee) {
          //     _this.handleCallBack(ee.target.result)
          //   }
          //   fileReader.readAsDataURL(b)
          // } else {
          _this.handleCallBack(b)
          _this.$Loading.clear()
          // }
        // }, quality, maxWidth, maxHeight)
        }, quality, maxWidth, maxHeight)
      } else {
        _this.handleCallBack(file)
      }
    },
    handleCallBack (blob) {
      this.$emit('trigger-change', blob)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.hhf-upload-img-container
  width rems(150)
  height rems(150)
  box-sizing border-box
.hhf-upload-img-add-icon
  width rems(60)
  height @width
  border-radius 50%
  background-color #5094f3
  color #ffffff
  &.hhf-upload-img-btn-disabled
    background-color #dcdcdc
color #ffffff
.hhf-upload-img-add-img
  padding-top rems(10)
</style>
