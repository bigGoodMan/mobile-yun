<!-- 查看图片 -->
<template>
  <van-image :src="img" :lazy-load="lazyLoading" :width="width" :height="height" @click="handleEnlarge($event)">
  <template v-slot:loading>
    <van-loading type="spinner" size="20" />
  </template>
</van-image>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'watch-img',
  props: {
    img: String,
    lazyLoading: {
      type: Boolean,
      default: true
    },
    enlarge: {
      type: Boolean,
      default: false
    },
    width: Number,
    height: Number
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    ...mapMutations(['APP_IMAGEPREVIEW_MUTATE']),
    handleEnlarge (e) {
      const {
        img,
        enlarge
      } = this
      if (enlarge) {
        e.stopPropagation()
        this.APP_IMAGEPREVIEW_MUTATE({ previewImage: [img || ''], imagePreviewShow: true })
      }
    }

  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
