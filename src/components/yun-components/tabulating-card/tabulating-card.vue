<!-- 机器卡片 -->
<template>
  <div class="tabulating-card">
    <div class="tabulating-card-img bgcolor-f2 flex-row flex-center">
      <div class="tabulating-card-tag size-24" v-if="$slots.tag">
        <van-tag
          :color="tagColor"
          size="large"
        ><slot name="tag"></slot></van-tag>
      </div>
      <img
        class="tabulating-card-img-content"
        :src="img"
        alt=""
      >
      <!-- <img class="tabulating-card-img-content" src="http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif" alt=""> -->
    </div>
    <div>
      <p class="flex-row flex-between-center"><slot name="title"></slot></p>
      <p class="flex-row flex-between-center"><slot name="content"></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabulatingCard',
  props: {
    img: String,
    tagColor: {
      type: String,
      default: '#ff5722'
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus">
.tabulating-card-img
  position relative
  width 100%
  height rems(345)
  font-size 0
.tabulating-card-tag
  position absolute
  top 0
  right 0
  // padding rems(10) rems(20)
  // background-color rgba(0, 0, 0, 0.5)
.tabulating-card-img-content
  max-width 100%
  max-height 100%
</style>
