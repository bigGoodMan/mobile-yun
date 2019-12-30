<!-- 学习手册 -->
<template>
  <div class="learning-manual">
    <div class="learning-manual-head">
      <TrainingUserInfo :info="userInfo" />
    </div>
    <div class="learning-manual-container">
      <div class="bgcolor-f padding-30-0">
      <h5 class="learning-manua-title margin-0">
        <div class="size-28 color-3 padding-bottom-10">{{info.name}}</div>
        <div class="size-24 color-9">{{info.create_time}}</div>
      </h5>
      <ul class="no-ul">
        <li v-for="(items, index) in list" :key="index" class="flex-row flex-between-stretch bgcolor-f">
          <StepBar class="padding-left-30" v-if="info.is_sort > 0" :num="items.manual_sort"/>
          <div :style="{width: info.is_sort > 0 ? '90%' : '100%'}">
            <TrainingList :info="items" />
            <div class="border"></div>
          </div>
        </li>
      </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TrainingUserInfo from './components/user-info'
import StepBar from '@yun/step-bar/step-bar'
import TrainingList from './components/list'
import { getTrainStudyDetailApi } from '@/api'
// import { getEllipsisText } from '@l/tools'
import mixin from './mixin'
export default {
  name: 'LearningManual',

  data () {
    return {
      manualId: 0,
      list: [],
      info: {}
    }
  },
  mixins: [mixin],
  components: {
    TrainingUserInfo,
    TrainingList,
    StepBar
  },

  computed: {},

  methods: {
    getTrainStudyDetail () {
      this.$Loading()
      const {
        manualId
      } = this
      getTrainStudyDetailApi({
        manual_id: manualId
      }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          let data = res.data
          this.list = data.list.map(v => ({
            ...v,
            create_time: v.create_time.split(' ')[0],
            manual_sort: v.manual_sort - 0,
            is_collect: !!(v.is_collect - 0),
            name: v.name // getEllipsisText(v.name, 10)
          })).sort((a, b) => a.manual_sort - b.manual_sort)
          data.manual_info.create_time = data.manual_info.create_time.split(' ')[0]
          this.info = data.manual_info
          return
        }
        this.$Tip.warning(res.msg)
      })
    }
  },
  created () {
    const {
      id
    } = this.$route.query
    this.manualId = id
    this.getTrainStudyDetail()
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.learning-manual
  .learning-manual-head
    position fixed
    top 0
    left 0
    width 100%
    z-index 9
  .learning-manual-container
    padding-top 92px
    margin-top rems(20)
    .learning-manua-title
      padding rems(30)
      padding-top 0
</style>
