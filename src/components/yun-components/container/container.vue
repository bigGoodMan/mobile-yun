<!-- container -->
<template>
  <div class="container">
    <keep-alive :include="['my_machine']">
      <router-view></router-view>
    </keep-alive>
    <div v-if="!hide" class="go-home flex-row flex-center" @click="handleGoHome">
    <van-icon :name="home" color="#ffffff" />
    </div>
  </div>
</template>

<script>
import config from '@/config'
import { home } from '@l/img'
export default {
  name: 'container',

  data () {
    return {
      hide: true,
      home: home
    }
  },
  watch: {
    '$route': {
      handler (route) {
        this.hide = config.homeHide.includes(route.name)
      },
      immediate: true
    }
  },
  components: {},

  computed: {},

  methods: {
    handleGoHome () {
      this.$router.push({
        name: 'my_machine'
      })
    }
  },
  created () {
    // document.body.classList.add('bgcolor-f2')
  },
  mounted () {},
  beforeDestroy () {
    // document.body.classList.remove('bgcolor-f2')
  }
}
</script>
<style lang="stylus" scoped>
.go-home
  position fixed
  bottom rems(30)
  right rems(30)
  border-radius 50%
  font-size rems(60)
  width rems(100)
  height rems(100)
  background-color rgba(0, 0, 0, 0.5)
  z-index 9
</style>
