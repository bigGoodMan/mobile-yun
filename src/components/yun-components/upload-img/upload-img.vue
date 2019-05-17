<!-- 上传图片 -->
<template>
    <dl class="upload-img-container size-0">
      <dd class="upload-img-list flex-row flex-" v-for="(item,index) of column" :key="index" @click="APP_IMAGEPREVIEW_MUTATE({ previewImage: [item.src], imagePreviewShow: true })">
        <span class="upload-img-remove" @click.stop="handleDelete(index)">×</span>
       <img :src="item.src">
      </dd>
      <dt class="upload-img-add" v-if="list.length < maxLength">
        <HhfUploadImg :accept="accept" :disabled="disabled" :quality="quality" :maxWidth="maxWidth" :maxHeight="maxHeight" @trigger-change="handleChange" />
      </dt>
    </dl>
</template>

<script>
import HhfUploadImg from '@hhf/hhf-upload-img'
import { mapMutations, mapActions } from 'vuex'
import { uploadImgToOssApi } from '@/api'
import webOssUpload from '@l/webOssUpload'
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
    quality: Number,
    // 压缩之后的最大宽度
    maxWidth: Number,
    // 压缩之后的最大高度
    maxHeight: Number,
    maxLength: {
      type: Number,
      default: 6
    },
    column: Array // 图片数组
  },
  data () {
    return {
      list: [],
      accessKeyID: '', // oss id
      policy: '', // oss policy
      signature: '', // oss signature
      securityToken: '', // oss SecurityToken
      callback: '' // oos callback
    }
  },

  components: {
    HhfUploadImg
  },

  computed: {},

  methods: {
    ...mapActions(['APP_SETOSSINFO_ACTION']), // 设置oss信息
    ...mapMutations(['APP_IMAGEPREVIEW_MUTATE']), // 预览图片
    handleChange (blob) {
      this.uploadImg(blob)

      // var fileReader = new FileReader()
      // fileReader.onload = (ee) => {
      //   this.list.push({
      //     blob,
      //     src: ee.target.result
      //   })
      // }
      // fileReader.readAsDataURL(blob)
      // this.list.push({
      //   blob,
      //   src: window.URL.createObjectURL(blob)
      // })
      // if (this.list === 6) {
      //   this.show = false
      // }
    },
    uploadImg (blob) {
      const {
        accessKeyID,
        policy,
        signature,
        securityToken,
        callback
      } = this
      let formDt = webOssUpload({
        filename: `${new Date() - 1}.png`, policy, accessid: accessKeyID, signature, securityToken
      })
      let data = new FormData()
      data.append('callback', callback)
      for (let key in formDt) {
        data.append(key, formDt[key])
      }
      data.append('file', blob)
      uploadImgToOssApi({ data, callback }).then(res => {
        data = null
        if (res.return_code === '0') {
          this.$emit('trigger-change', { src: res.data })
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          })
        }
      })
    },
    // 获取oss信息
    getOssImgInfo () {
      this.APP_SETOSSINFO_ACTION().then(res => {
        if (res.return_code === '0') {
          const {
            AccessKeyId,
            SecurityToken,
            policy,
            signature,
            callback
          } = res.data
          this.accessKeyID = AccessKeyId
          this.policy = policy
          this.signature = signature
          this.securityToken = SecurityToken
          this.callback = callback
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          })
        }
      })
    },
    handleDelete (index) {
      this.list.splice(index, 1)
      console.log(index, this.list)
    },
    handleRevoke (e) {
      window.URL.revokeObjectURL(e.target.src)
    }
  },
  created () {
    this.getOssImgInfo()
  },
  mounted () {

  }
}
</script>
<style lang="stylus" scoped>
.upload-img-container
  display flex
  flex-flow row wrap
  justify-content flex-start
  align-items flex-start
  margin 0
  box-sizing border-box
  .upload-img-add
    padding rems(10) 0
  .upload-img-list
    position relative
    width rems(150)
    height rems(150)
    padding rems(10) 0
    margin 0 rems(10) 0 0
    .upload-img-remove
      position absolute
      top 0
      right rems(-10)
      display inline-block
      width rems(30)
      height @width
      line-height @width
      background-color #ff0000
      color #ffffff
      font-size 0.26rem
      border-radius 50%
      text-align center
      z-index 1
    img
      max-width 100%
      max-height 100%
</style>
