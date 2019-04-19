<!-- 菜单栏 -->
<template>
  <div class="side-menu">
    <div :class="['side-menu-collapsed', collapsed ? 'side-menu-collapsed-active' : null]"><van-icon name="wap-nav" @click="handleClick"/></div>
    <van-popup v-model="collapsed">内容</van-popup>
  </div>
</template>

<script>
import { Popup, Icon } from 'vant'
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',

  data () {
    return {
      show: false
    }
  },

  components: {
    'van-icon': Icon,
    'van-popup': Popup
  },

  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed
    })
  },

  methods: {
    ...mapMutations(['APP_SHOWCOLLAPSED_MUTATE']),
    // 点击展示隐藏popup菜单栏
    handleClick () {
      this.APP_SHOWCOLLAPSED_MUTATE(!this.collapsed)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.side-menu
  .side-menu-collapsed
    display inline-block
    transition transform 0.2s ease-in-out
    .side-menu-collapsed-active
      transform rotate(45deg)
</style>
