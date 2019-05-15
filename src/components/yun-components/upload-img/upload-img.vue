<!-- 上传图片 -->
<template>
  <div>
    <dl class="upload-img-container">
      <dt class="upload-img-add">
        <HhfUploadImg @trigger-change="handleChange" />
      </dt>
      <dd class="upload-img-list" v-for="(item,index) in imgData" :key="index" @click="exhibitionImgFunc(item)">
        <span class="upload-img-remove" @click.stop="deleteImgFunc(index)">×</span>
       <img :src="item" >
      </dd>
    </dl>
  </div>
</template>

<script>
import HhfUploadImg from '@hhf/hhf-upload-img'
export default {
  name: '',

  data () {
    return {
    }
  },

  components: {
    HhfUploadImg
  },

  computed: {},

  methods: {
    handleChange (blob) {

    }
  },

  mounted () {
    class P {
      constructor (func) {
        this.result = null
        func(this._resolve, this._reject)
      }
      _resolve (res) {
        this.result = res
      }
      _reject (er) {
        return {
          catch: (callback) => callback(er)
        }
      }
      then (callback) {
        callback(this.result)
        return this
      }
    }
    function test (resolve, reject) {
      resolve()
    }
    const abc = new P(test)
    abc.then(r => {

    })
  }
}
</script>
<style lang="stylus" scoped>
.upload-file-container
  display flex
  flex-flow row wrap
  justify-content flex-start
  align-items flex-start
  width 100%
  padding 0.23rem
  min-height 3.2rem
  box-sizing border-box
  .upload-file-add
    width 25%
    box-sizing border-box
    padding-right 0.15rem
  .upload-file-list
    position relative
    display flex
    flex-flow row nowrap
    justify-content center
    align-items center
    width 25%
    box-sizing border-box
    height 1.49rem
    padding-right 0.15rem
    margin-bottom 0.15rem
    .upload-file-remove
      position absolute
      top -0.1rem
      right -0.1rem
      display inline-block
      width 0.3rem
      height @width
      line-height @width
      background-color #ff0000
      color #ffffff
      font-size 0.26rem
      border-radius 50%
      text-align center
    img
      max-width 100%
      max-height 100%
</style>
