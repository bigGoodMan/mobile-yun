<!--  -->
<template>
  <div
    class="loading-img flex-row flex-center"
    :style="wrapStyl"
  >
    <van-image
      v-if="img"
      :src="img"
      lazy-load
      @click="handleClick($event, img)"
    >
      <template #loading>
        <van-loading
          type="spinner"
          size="20"
        />
      </template>
      <!-- <template #error><div class="text-nowrap">加载失败</div></template> -->
    </van-image>
    <!-- <template v-if="img&&!showErr">
      <img v-lazy="img" class="loading-img-content" @click.stop="handleClick($event, img)" ref="img">
    </template>
    <template v-else-if="!img&&!showErr">
      <div class="loading-img-text">加载中……</div>
    </template>
    <template v-else>
      <div class="loading-img-text">图片加载失败</div>
    </template> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'LoadingImg',
  props: {
    img: {
      type: String
    },
    width: Number || String,
    height: Number || String,
    radius: Number || String,
    magnify: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showErr: false
    }
  },

  components: {},
  computed: {
    wrapStyl () {
      let {
        width,
        height,
        radius
      } = this
      width = typeof width === 'number' ? `${width}px` : width
      height = typeof height === 'number' ? `${height}px` : height
      radius = typeof radius === 'number' ? `${radius}px` : radius
      return {
        width,
        height,
        'border-radius': radius
      }
    }
  },

  methods: {
    ...mapMutations(['APP_IMAGEPREVIEW_MUTATE']),
    handleClick (e, img) {
      if (this.magnify) {
        this.APP_IMAGEPREVIEW_MUTATE({ previewImage: [img], imagePreviewShow: true })
      }
    },
    handleError (err) {
      console.log(err)
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
.loading-img
  overflow hidden
  .loading-img-content
    max-width 100%
    max-height 100%
  .loading-img-text
    background-color #969799
</style>
