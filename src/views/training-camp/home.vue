<!-- 商家训练营首页 -->
<template>
  <div class="training-camp-home">
      <TrainingUserInfo :info="userInfo" />
      <van-search placeholder="开店教程" @focus="handleFocus" />
      <ul class="no-ul">
        <li class="training-camp-list">
          <ModeCard title="学习手册" :list="list.manual_list">
            <template #title-right>
              <span class="color-info size-24 flex-row flex-center" @click="handleRouter(2)">查看更多<van-icon name="arrow" /></span>
            </template>
          </ModeCard>
        </li>
        <li class="training-camp-list">
          <ModeCard title="核心教程" :list="list.art_list">
            <template #title-right>
              <span class="color-info size-24 flex-row flex-center" @click="handleRouter(1)">查看更多<van-icon name="arrow" /></span>
            </template>
          </ModeCard>
        </li>
        <li class="training-camp-list">
          <ModeCard title="新特性" :list="list.new_list">
            <template #title-right>
              <span class="color-info size-24 flex-row flex-center" @click="handleRouter(3)">查看更多<van-icon name="arrow" /></span>
            </template>
          </ModeCard>
        </li>
        <li class="training-camp-list">
          <Contact :info="contactInfo" />
        </li>
      </ul>
  </div>
</template>

<script>
import TrainingUserInfo from './components/user-info'
import ModeCard from './components/mode-card'
import Contact from './components/contact'
// import { getEllipsisText } from '@l/tools'
import { getTrainHomeApi } from '@/api'
import mixin from './mixin'
export default {
  name: 'TrainingCampHome',

  data () {
    return {
      list: {
        art_list: [],
        manual_list: [],
        new_list: []
      }
    }
  },
  mixins: [mixin],
  components: {
    TrainingUserInfo,
    ModeCard,
    Contact
  },

  computed: {
  },

  methods: {
    getCardList () {
      this.$Loading({ mask: true })
      getTrainHomeApi().then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          let data = res.data
          for (let key in data) {
            data[key] = data[key].map(v => ({
              ...v,
              name: v.name
            }))
          }
          this.list = data
          return
        }
        this.$Tip.warning(res.msg)
      })
    },
    // 跳转到搜索
    handleFocus () {
      this.$router.push({
        name: 'TrainingCampSearch'
      })
    },
    handleRouter (type) {
      this.$router.push({
        name: 'TrainingCampColumn',
        query: {
          type
        }
      })
    }
  },
  created () {
    this.getCardList()
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.training-camp-home
  .training-camp-list
    margin-top rems(20)
</style>
