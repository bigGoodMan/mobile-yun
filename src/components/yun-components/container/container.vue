<!-- container -->
<template>
  <div class="container">
    <div :class="tabBar ? 'content-bottom' : null">
      <transition :name="transitionName">
        <keep-alive :include="cachePageList">
          <router-view class="child-view"></router-view>
        </keep-alive>
      </transition>
    </div>
    <template>
      <ul
        v-if="tabBar"
        class="size-36 bgcolor-f2 no-ul tab-bar flex-row flex-start-stretch"
      >
        <li
          class="tab-bar-route flex-row flex-center"
          :style="tabBarStly"
          @click="$router.go(-1)"
          @touchstart="() => {}"
        >
          <van-icon name="arrow-left" />
        </li>
        <li
          v-if="goHome"
          class="tab-bar-route flex-row flex-center"
          @click="handleGoHome"
          @touchstart="() => {}"
        >
          <van-icon name="wap-home-o" />
        </li>
        <li
          class="tab-bar-route flex-row flex-center"
          :style="tabBarStly"
          @click="$router.go(1)"
          @touchstart="() => {}"
        >
          <van-icon name="arrow" />
        </li>
      </ul>
      <div
        v-else-if="goHome"
        class="go-home flex-row flex-center"
        @click="handleGoHome"
      >
        <van-icon :name="home" color="#ffffff" />
      </div>
    </template>
    <van-image-preview v-model="show" :images="previewImage">
    </van-image-preview>
  </div>
</template>

<script>
import config from "@/config";
import { home } from "@l/img";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Container",

  data() {
    return {
      home: home,
      goHome: null,
      tabBar: false,
      transitionName: "slide-left"
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token,
      imagePreviewShow: state => state.app.imagePreviewShow,
      previewImage: state => state.app.previewImage,
      cachePageList: state => state.app.cachePageList
    }),
    show: {
      get() {
        return this.imagePreviewShow;
      },
      set(imagePreviewShow) {
        this.APP_IMAGEPREVIEW_MUTATE({ imagePreviewShow, previewImage: [] });
      }
    },
    tabBarStly() {
      return this.goHome ? { width: "calc(100% / 3)" } : null;
    }
  },

  watch: {
    token: {
      handler(val) {
        // 判断是否需要token
        if (!config.notLoginPageName.includes(this.$route.name) && !val) {
          const $route = this.$route;
          const path = $route.path;
          const query = $route.query;
          const params = $route.params;
          this.$router.push({
            name: "login",
            query: {
              url: encodeURIComponent(
                JSON.stringify({
                  path,
                  query,
                  params
                })
              )
            }
          });
        }
      },
      immediate: true
    },
    $route: {
      handler(route) {
        this.goHome = route.meta && route.meta.goHome;
        this.tabBar = route.meta && route.meta.tabBar;
      },
      immediate: true
    }
  },
  beforeRouteUpdate(to, from, next) {
    // if (to.name === 'login') {
    //   this.transitionName = 'slide-up'
    // } else if (from.name === 'login') {
    //   this.transitionName = 'slide-down'
    // } else
    if (to.meta.toTransition) {
      this.transitionName = to.meta.toTransition;
    } else if (from.meta.fromTransition) {
      this.transitionName = from.meta.fromTransition;
    } else if (to.path.split("/").length > from.path.split("/").length) {
      this.transitionName = "slide-left";
    } else if (to.path.split("/").length < from.path.split("/").length) {
      this.transitionName = "slide-right";
    }
    next();
  },

  methods: {
    ...mapMutations(["APP_IMAGEPREVIEW_MUTATE"]),
    handleGoHome() {
      if (this.goHome === this.$route.name) {
        return;
      }
      this.$router.push({
        name: this.goHome
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  .content-bottom
    padding-bottom $tabHeight
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
  .tab-bar
    position fixed
    left 0
    bottom 0
    width 100%
    height $tabHeight
    z-index 99
    border-top 1px solid #d7d7d7
  .tab-bar-route
    width calc((100% / 2))
    &:active
      background-color #dbdbdb
      opacity 0.5
</style>
