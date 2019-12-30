<!-- 免费无限抓 -->
<template>
  <div class="handleConfirm">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :default-index="0"
        :store-id="store_id"
      >
        <div class="flex-row flex-end-center flex-1">
          <van-icon
            @click="handleRouter"
            name="question-o"
            size="0.4rem"
          />
        </div>
      </MyStore>
    </div>
    <div class="main-container">
      <div class="handleConfirm-container bgcolor-f2">
        <div class="border"></div>
        <van-pull-refresh
          v-model="isLoading"
          class="handleConfirm-fresh"
          @refresh="handleRefresh"
        >
        <div class="size-28 color-3 padding-20 bgcolor-f" style="line-height: 1.5;">我的机台</div>
          <van-collapse
            class="handleConfirm-content bgcolor-f2"
            v-model="activeNames"
            accordion
          >
            <van-collapse-item
               v-for="(items, index) of list"
              :title="items.area_name || ''"
              :name="index"
              :key="items.area_id"
            >
            <div class="bgcolor-f" v-for="item of items.items" :key="item.machine_id">
              <FreeGraspCell v-model="checked" />
              <div class="border"></div>
            </div>

              <!-- <MachineList :columns="columns" /> -->
            </van-collapse-item>
          </van-collapse>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import FreeGraspCell from './components/free-grasp-cell'
import { getFreeInfiniteGraspList } from '@/api'
import MyStore from '@yun/my-store'
export default {
  name: 'Switchgear',

  data () {
    return {
      activeNames: 0,
      list: [],
      checked: true,
      isLoading: false,
      store_id: null
    }
  },

  components: {
    MyStore,
    FreeGraspCell
  },

  computed: {
  },

  methods: {
    // 根据门店获得信息
    getList () {
      this.$Loading('加载中……')
      return getFreeInfiniteGraspList(this.store_id).then(res => {
        this.$Loading.clear()
        if (res.return_code !== '0') {
          this.$Tip.warning(res.msg)
        }
      })
    },
    // 选择门店回调
    handleConfirm (data) {
      this.store_id = data.value.store_id
      this.getList()
    },
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    },
    handleRefresh () {
      this.getList().then(() => {
        this.isLoading = false
      })
    }
  },
  created () {
    const {
      sid
    } = this.$route.query
    if (sid) {
      this.store_id = sid
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
.switchgear
  .header
    position absolute
    top 0
    left 0
    width 100%
    z-index 10
  .main-container
    height 100%
    -webkit-overflow-scrolling touch
    .switchgear-container
      padding-top rems(106)
      height: 100%;
      box-sizing: border-box;
    .switchgear-fresh
      padding-top rems(30)
      overflow: initial;
    .switchgear-content
      .van-collapse-item__content
        padding 0
</style>
