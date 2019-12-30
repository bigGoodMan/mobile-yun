<!-- 嗨皮商家训练营栏目页 -->
<template>
  <div class="training-camp-column">
    <TrainingUserInfo :info="userInfo" class="training-camp-column-header" />
    <van-tabs
      v-model="activeName"
      color="#1890fc"
      class="training-camp-tabcontainer"
    >
      <van-tab
        title="学习手册"
        name="training-2"
        class="training-camp-column-tabcontent"
      >
        <van-pull-refresh
          v-model="learningManualFreshLoading"
          @refresh="handleRefresh"
          style="overflow:initial"
        >
          <div class="padding-top-20">
            <template v-if="learningManualList.length > 0">
              <van-list
                v-model="learningManualLoading"
                :finished="learningManualFinished"
                finished-text="没有更多了"
                @load="handleLoading(2)"
                :offset="10"
              >
                <ul class="no-ul">
                  <li
                    v-for="(items, index) in learningManualList"
                    :key="index"
                    class="padding-bottom-10"
                  >
                    <TrainingList :info="items" />
                  </li>
                </ul>
              </van-list>
            </template>
            <template v-else>
              <div class="size-24 text-center padding-top-20 color-9 ">暂时没有数据
                <van-icon name="smile-o" />
              </div>
            </template>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab
        title="核心教程"
        name="training-1"
        class="training-camp-column-tabcontent"
      >

        <van-pull-refresh
          v-model="coreCourseFreshLoading"
          @refresh="handleRefresh"
          style="overflow:initial"
        >
          <div class="padding-top-20">
            <template v-if="coreCourseList.length > 0">
              <van-list
                v-model="coreCourseLoading"
                :finished="coreCourseFinished"
                finished-text="没有更多了"
                @load="handleLoading(1)"
                :offset="10"
              >
                <ul class="no-ul">
                  <li
                    v-for="(items, index) in coreCourseList"
                    :key="index"
                    class="padding-bottom-10"
                  >
                    <TrainingList :info="items" />
                  </li>
                </ul>
              </van-list>
            </template>
            <template v-else>
              <div class="size-24 text-center padding-top-20 color-9 ">暂时没有数据
                <van-icon name="smile-o" />
              </div>
            </template>
          </div>
        </van-pull-refresh>
      </van-tab>
      <van-tab
        title="新特性"
        name="training-3"
        class="training-camp-column-tabcontent"
      >
        <van-pull-refresh
          v-model="newFeaturesFreshLoading"
          @refresh="handleRefresh"
          style="overflow:initial"
        >
          <div class="padding-top-20">
            <template v-if="newFeaturesList.length > 0">
              <van-list
                v-model="newFeaturesLoading"
                :finished="newFeaturesFinished"
                finished-text="没有更多了"
                @load="handleLoading(3)"
                :offset="10"
              >
                <ul class="no-ul">
                  <li
                    v-for="(items, index) in newFeaturesList"
                    :key="index"
                    class="padding-bottom-10"
                  >
                    <TrainingList :info="items" />
                  </li>
                </ul>
              </van-list>
            </template>
            <template v-else>
              <div class="size-24 text-center padding-top-20 color-9 ">暂时没有数据
                <van-icon name="smile-o" />
              </div>
            </template>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import TrainingUserInfo from './components/user-info'
import TrainingList from './components/list'
import mixin from './mixin'
import { getTrainTypeListApi } from '@/api'
// import { getEllipsisText } from '@l/tools'
export default {
  name: 'TrainingCampColumn',

  data () {
    return {
      learningManualFreshLoading: false, // 下来刷新
      learningManualLoading: false, // 上拉加载
      learningManualFinished: false, // 完成
      learningManualType: 2, // 学习手册类型
      learningManualList: [], // 学习手册数据
      learningManualPage: 1,

      coreCourseFreshLoading: false, // 下来刷新
      coreCourseLoading: false, // 上拉加载
      coreCourseFinished: false, // 完成
      coreCourseType: 1, // 核心教程
      coreCourseList: [], // 学习手册数据
      coreCoursePage: 1,

      newFeaturesFreshLoading: false, // 下来刷新
      newFeaturesLoading: false, // 上拉加载
      newFeaturesFinished: false, // 完成
      newFeaturesType: 3, // 新特性
      newFeaturesList: [], // 新特性数据
      newFeaturesPage: 1,

      typeData: {
        1: 'coreCourse',
        2: 'learningManual',
        3: 'newFeatures'
      }, // 类型数据
      activeName: 'training-2',
      limit: 20
    }
  },
  mixins: [mixin],
  components: {
    TrainingUserInfo,
    TrainingList
  },

  computed: {
  },
  watch: {
    activeName (val) {
      const type = val.split('-')[1]
      const {
        typeData
      } = this
      let typeName = typeData[type]
      let listKey = `${typeName}List`
      if (this[listKey].length === 0) {
        this.getTrainTypeList(type)
      }
    }
  },
  methods: {
    getTrainTypeList (type) {
      this.$Loading()
      const {
        limit,
        typeData
      } = this
      let typeName = typeData[type]
      let pageKey = `${typeName}Page`
      let freshLoadingKey = `${typeName}FreshLoading`
      let loadingKey = `${typeName}Loading`
      let finishedKey = `${typeName}Finished`
      let listKey = `${typeName}List`
      getTrainTypeListApi({
        limit,
        page: this[pageKey],
        type
      }).then(res => {
        ++this[pageKey]
        this[freshLoadingKey] = false
        this[loadingKey] = false
        this.$Loading.clear()
        if (res.return_code === '0') {
          let list = res.data.map(v => {
            return {
              ...v,
              type,
              create_time: v.create_time.split(' ')[0],
              name: v.name, // getEllipsisText(v.name, 10),
              is_collect: !!(v.is_collect - 0)
            }
          })
          if (list.length < limit) {
            this[finishedKey] = true
          }
          this[listKey] = [...this[listKey], ...list]
          return
        }
        this.$Tip.warning(res.msg)
      })
    },
    handleLoading (type) {
      this.getTrainTypeList(type)
    },
    handleRefresh () {
      let type = this.activeName.split('-')[1]
      let typeName = this.typeData[type]
      let pageKey = `${typeName}Page`
      let finishedKey = `${typeName}Finished`
      let listKey = `${typeName}List`
      this[finishedKey] = false
      this[pageKey] = 1
      this[listKey] = []
      this.getTrainTypeList(type)
    }
  },
  created () {
    let {
      type
    } = this.$route.query
    type = type - 0
    if (type && type !== 2) {
      this.activeName = `training-${type}`
      return
    }
    this.getTrainTypeList(2)
  },
  mounted () {}
}
</script>
<style lang="stylus">
.training-camp-column
  .training-camp-column-header
    position fixed
    top 0
    left 0
    width 100%
    z-index 12
  .training-camp-tabcontainer
    .van-tabs__wrap
      position fixed
      top rems(190)
      left 0
      width 100%
      z-index 11
  .training-camp-column-tabcontent
    position relative
    z-index 1
    padding-top 'calc(44px + %s)' % rems(190)
</style>
