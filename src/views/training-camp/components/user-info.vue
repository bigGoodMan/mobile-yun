<!-- 用户头信息 -->
<template>
  <div class="user-info flex-row flex-between-stretch color-f">
    <LoadingImg :img="info.portrait" class="user-info-img" />
    <div class="flex-column flex-center-start user-info-introduce flex-1">
      <span class="size-30">{{info.name}}，欢迎！</span>
      <span class="size-24">{{info.welcome}}</span>
    </div>
    <div class="flex-column flex-center" @click="handleRouterPush">
      <img src="../img/collect-btn.png" class="collect-btn"/>
      <span class="size-24 text-nowrap">收藏</span>
    </div>
  </div>
</template>

<script>
import LoadingImg from '@yun/loading-img/loading-img'
export default {
  name: 'TrainingCampUserInfo',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },

  components: {
    LoadingImg
  },

  computed: {},

  methods: {
    handleRouterPush () {
      this.$router.push({
        name: 'TrainingCampCollect'
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.user-info
  padding rems(40) rems(30)
  box-sizing border-box
  height rems(190)
  background-color #1890fc
  .user-info-introduce
    padding 0 rems(10)
  .user-info-img
    width rems(100)
    height @width
    border-radius 50%
    border 1px solid #386ff1
    flex-shrink 0
    align-self center
  .collect-btn
    width rems(42)
    height @width
</style>
