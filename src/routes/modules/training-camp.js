// 商家训练营
// 首页
const TrainingCampHome = {
  path: '/training-camp/home',
  name: 'TrainingCampHome',
  component: () => import(/* webpackChunkName: "TrainingCampHome" */ '@v/training-camp/home.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
// 收藏
const TrainingCampCollect = {
  path: '/training-camp/collect',
  name: 'TrainingCampCollect',
  component: () => import(/* webpackChunkName: "TrainingCampCollect" */ '@v/training-camp/collect.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
// 搜索
const TrainingCampSearch = {
  path: '/training-camp/search',
  name: 'TrainingCampSearch',
  component: () => import(/* webpackChunkName: "TrainingCampSearch" */ '@v/training-camp/search.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
// 栏目
const TrainingCampColumn = {
  path: '/training-camp/column',
  name: 'TrainingCampColumn',
  component: () => import(/* webpackChunkName: "TrainingCampColumn" */ '@v/training-camp/column.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
// 学习手册
const LearningManual = {
  path: '/training-camp/learning-manual',
  name: 'LearningManual',
  component: () => import(/* webpackChunkName: "LearningManual" */ '@v/training-camp/learning-manual.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
// 文章详情
const TrainingCampDetail = {
  path: '/training-camp/detail',
  name: 'TrainingCampDetail',
  component: () => import(/* webpackChunkName: "TrainingCampDetail" */ '@v/training-camp/detail.vue'),
  meta: {
    goHome: 'TrainingCampHome',
    tabBar: true
  }
}
export default [TrainingCampHome, TrainingCampCollect, TrainingCampSearch, TrainingCampColumn, LearningManual, TrainingCampDetail]
