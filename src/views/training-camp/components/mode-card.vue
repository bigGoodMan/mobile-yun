<!-- 模块卡片 -->
<template>
  <div class="mode-card bgcolor-f">
    <h5 class="flex-row flex-between-center mode-card-head">
      <span class="size-30 color-3">{{title}}</span>
      <div class="flex-row flex-end-center"><slot name="title-left"></slot></div>
    </h5>
    <div class="border"></div>
    <div class="mode-card-container">
      <ul class="no-ul mode-card-ul">
        <li v-for="(items, index) of list" :key="index" class="mode-card-list" @click="handleRouter(items)">
          <div class="mode-card-content bgcolor-f">
            <div class="mode-card-img">
              <LoadingImg class="mode-card-img-content" :img="items.image" />
            </div>
            <p class="size-24 mode-card-text text-ellipsis">{{items.name}}</p>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LoadingImg from '@yun/loading-img/loading-img'
export default {
  name: 'TrainingCampModeCard',
  props: {
    title: String,
    list: Array
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
    handleRouter (item) {
      if (item.link) {
        this.$router.push({
          name: 'TrainingCampDetail',
          query: {
            url: item.link
          }
        })
        return
      }
      this.$router.push({
        name: 'LearningManual',
        query: {
          id: item.id
        }
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.mode-card
  padding-bottom rems(20)
  .mode-card-head
    margin 0
    padding rems(30)
  .mode-card-container
    overflow hidden
    .mode-card-ul
      display flex
      flex-flow row nowrap
      justify-content flex-start
      align-items center
      overflow-x scroll
      font-size 0
      padding rems(10)
      .mode-card-list
        border-right none
        overflow hidden
        flex-shrink 0
        flex-basis rems(240)
        .mode-card-content
          padding rems(10)
          .mode-card-img
            background-color #e3e3e3
            width rems(240)
            padding 1px
            border-radius rems(10)
            .mode-card-img-content
              height rems(160)
          .mode-card-text
            padding rems(10)
            margin 0
</style>
