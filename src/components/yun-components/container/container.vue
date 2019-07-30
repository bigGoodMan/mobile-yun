<!-- container -->
<template>
  <div class="container">
      <transition :name="transitionName">
    <keep-alive :include="['my_machine', 'add_gift_storage']">
        <router-view class="child-view"></router-view>
    </keep-alive>
      </transition>
    <div
      v-if="goHome"
      class="go-home flex-row flex-center"
      @click="handleGoHome"
    >
      <van-icon
        :name="home"
        color="#ffffff"
      />
    </div>
    <van-image-preview
  v-model="show"
  :images="previewImage"
>
</van-image-preview>
  </div>
</template>

<script>
import config from '@/config'
import { home } from '@l/img'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'container',

  data () {
    return {
      home: home,
      goHome: '',
      transitionName: 'slide-left'
    }
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      imagePreviewShow: state => state.app.imagePreviewShow,
      previewImage: state => state.app.previewImage
    }),
    show: {
      get () {
        return this.imagePreviewShow
      },
      set (imagePreviewShow) {
        this.APP_IMAGEPREVIEW_MUTATE({ imagePreviewShow, previewImage: [] })
      }
    }
  },

  watch: {
    token: {
      handler (val) {
        // 判断是否需要token
        if (!config.notLoginPageName.includes(this.$route.name) && !val) {
          const $route = this.$route
          const name = $route.name
          const query = $route.query
          const params = $route.params
          this.$router.push({
            name: 'login',
            query: {
              url: encodeURIComponent(JSON.stringify({
                name,
                query,
                params
              }))
            }
          })
        }
      },
      immediate: true
    },
    '$route': {
      handler (route) {
        if (route.meta && route.meta.goHome) {
          this.goHome = route.meta.goHome
        } else {
          this.goHome = ''
        }
      },
      immediate: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    // if (to.name === 'login') {
    //   this.transitionName = 'slide-up'
    // } else if (from.name === 'login') {
    //   this.transitionName = 'slide-down'
    // } else
    if (to.meta.toTransition) {
      this.transitionName = to.meta.toTransition
    } else if (from.meta.fromTransition) {
      this.transitionName = from.meta.fromTransition
    } else if (to.path.split('/').length > from.path.split('/').length) {
      this.transitionName = 'slide-left'
    } else if (to.path.split('/').length < from.path.split('/').length) {
      this.transitionName = 'slide-right'
    }
    next()
  },
  components: {},

  methods: {
    ...mapMutations(['APP_IMAGEPREVIEW_MUTATE']),
    handleGoHome () {
      this.$router.push({
        name: this.goHome
      })
    }
  },
  created () {
    // window.addEventListener('popstate', (e) => {
    //   console.log(e)
    // })
    // document.body.classList.add('bgcolor-f2')
  },
  mounted () {},
  beforeDestroy () {
    // document.body.classList.remove('bgcolor-f2')
  }
}
</script>
<style lang="stylus" scoped>
.container
  .go-home
    position fixed
    bottom rems(30)
    right rems(30)
    border-radius 50%
    font-size rems(60)
    width rems(100)
    height rems(100)
    background-color rgba(0, 0, 0, 0.5)
    z-index 3
</style>
