<!-- 训练营文章列表模块 -->
<template>
  <div class="training-camp-list bgcolor-f size-0 flex-row flex-start-stretch" @click="handleRouter">
    <div class="training-camp-list-img">
      <LoadingImg
        class="training-camp-list-img-content"
        :img="info.image"
      />
    </div>
    <div class="flex-column flex-between-start training-camp-list-container flex-1">
      <h5 class="training-camp-list-title">{{info.name}}</h5>
      <div class="flex-row flex-between-center size-24 width-2half">
        <span class="color-9">{{info.create_time}}</span>
        <van-checkbox v-model="info.is_collect" @click.stop="() => {}" @change="handleChange">
          收藏
          <template #icon="props">
            <img :src="props.checked ? activeIcon : inactiveIcon">
          </template>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingImg from '@yun/loading-img/loading-img'
import { operetionFavouriteApi } from '@/api'
export default {
  name: 'TrainingCampList',
  props: {
    info: Object
  },
  data () {
    this.collectTimer = null
    return {
      checked: false,
      activeIcon: require('../img/collect.png'),
      inactiveIcon: require('../img/abandon.png')
    }
  },

  components: {
    LoadingImg
  },

  computed: {},

  methods: {
    handleChange (collect) {
      clearTimeout(this.collectTimer)
      this.collectTimer = null
      this.collectTimer = setTimeout(() => {
        clearTimeout(this.collectTimer)
        this.handleCollect(collect)
      }, 1000)
    },
    handleCollect (collect) {
      this.$Loading({ mask: true })
      const {
        info
      } = this
      operetionFavouriteApi({
        type: info.type,
        f_id: info.id,
        is_favorite: collect ? 1 : 0
      }).then(res => {
        this.$Loading.clear()
        if (res.return_code !== '0') {
          this.$Tip.warning(res.msg)
        }
      })
    },
    handleRouter () {
      const {
        info
      } = this
      if (info.link) {
        // this.$router.push({
        //   name: 'TrainingCampDetail',
        //   query: {
        //     url: info.link
        //   }
        // })
        window.location.href = info.link
        return
      }
      this.$router.push({
        name: 'LearningManual',
        query: {
          id: info.id
        }
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.training-camp-list
  padding rems(30)
  .training-camp-list-title
    font-size rems(28)
    color #202020
    margin 0
  .training-camp-list-img
    width rems(240)
    border-radius rems(10)
    background-color #e3e3e3
    padding 1px
    .training-camp-list-img-content
      height rems(160)
  .training-camp-list-container
    padding-left rems(30)
    img
      max-width 100%
      max-height 100%
</style>
