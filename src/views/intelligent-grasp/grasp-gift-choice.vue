<!-- 智能抓感--选择礼品 -->
<template>
  <div class="grasp-gift-choice">
    <!-- 头部 -->
    <div class="header">
      <HhfDropdown
        v-model="show"
        :columns="filterCloumn"
        @trigger-change="handleChange"
      >
        <HeaderSearch
          v-model="name"
          @trigger-click="handleFilterClick"
          @trigger-search="handleSearch"
          placeholder="请输入礼品编号或礼品名称"
          filter
        />
      </HhfDropdown>
    </div>
    <!-- 主体内容 -->
    <div class="container">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="handleRefresh"
        style="overflow:initial"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="handleLoading"
          :offset="10"
        >
          <van-radio-group v-model="radio">
            <div
              v-for="(items, index) of columns"
              :key="index"
            >
              <div
                :result="items"
                class="flex-row flex-between-stretch bgcolor-f padding-20-30"
                @click="handleRadio(items)"
              >
                <van-radio
                  :disabled="items.disabled"
                  :name="items.id"
                ></van-radio>
                <div class="flex-1 flex-row flex-between-stretch padding-left-10">
                  <div class="flex-column flex-center-start">
                    <span class="color-393d49 size-30 weight-bold padding-bottom-20 max-width-400 text-ellipsis text-break text-justify">{{items.name}}</span>
                    <span class="size-28 color-454545">编号{{items.id}}</span>
                  </div>
                  <div class="flex-row flex-end-center">
                    <van-tag :color="items.color1">{{items.colorName1}}</van-tag>
                    <van-tag
                      :color="items.color2"
                      class="tag-content"
                    >{{items.colorName2}}</van-tag>
                  </div>
                </div>
              </div>
              <div class="border"></div>
            </div>
          </van-radio-group>
        </van-list>
      </van-pull-refresh>
    </div>
<!-- 按钮 -->
    <div class="height-100">
      <div class="fixed-max-width bottom-0 size-0 zindex-2">
        <HhfButton
          size="large"
          type="info"
          @trigger-click="handleSave"
          radius="0.05rem"
        >确认</HhfButton>
      </div>
    </div>
  </div>
</template>

<script>
import HhfDropdown from '@hhf/hhf-dropdown'
import HhfButton from '@hhf/hhf-button'
import HeaderSearch from '@yun/header-search'
import { mapState, mapMutations } from 'vuex'
import { errorCaptured } from '@l/utils'
import { getGraspGiftListApi } from '@/api'
export default {
  name: 'GraspGiftChoice',

  data () {
    return {
      show: false,
      filterCloumn: [{
        name: '全部',
        value: '0',
        checked: false
      },
      {
        name: '需配置',
        value: '1',
        checked: false
      },
      {
        name: '自采购',
        value: '2',
        checked: false
      }
      ],
      columns: [],
      isLoading: false, // 下拉刷新
      loading: false, // 上拉加载
      finished: false, // 完成
      radio: '', // 选中的礼品id
      name: '',
      status: '0',
      limit: 20,
      page: 1

    }
  },

  components: {
    HeaderSearch,
    // GiftList,
    HhfDropdown,
    HhfButton
  },

  computed: {
    ...mapState({
      cachePageList: state => state.app.cachePageList
    })
  },

  methods: {
    ...mapMutations(['INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE']),
    handleSave () {
      const giftInfo = this.columns.filter(v => this.radio === v.id)[0] || {}
      this.INTELLIGENTGRASP_EDITGIFTINFOSELECTED_MUTATE(giftInfo)
      if (giftInfo.id) {
        this.$router.push({
          name: 'GraspEquipmentChoice'
        })
      }
    },
    // 选中礼品
    handleRadio (items) {
      if (!items.disabled) {
        this.radio = items.id
      }
    },
    handleChange ({ name, index, value, checked }) {
      this.filterCloumn = this.filterCloumn.map(v => {
        const obj = { ...v }
        obj.checked = obj.value === value || false
        return obj
      })
      this.show = false
      this.status = value
      this.page = 1
      this.columns = []
      this.handleLoading()
    },
    handleFilterClick () {
      this.show = !this.show
    },
    handleSearch (val) {
      this.handleRefresh()
    },
    async getGraspGiftList () {
      this.$Loading({
        message: '加载中...'
      })
      const sid = this.$route.query.sid
      const { page, status, limit, name } = this
      let [err, res] = await errorCaptured(getGraspGiftListApi, { store_id: sid, page, status, limit, name })
      this.$Loading.clear()
      if (err) {
        return []
      }
      if (res.return_code === '0') {
        const { data } = res
        const columns = data.map(v => {
          let obj = { name: v.name, id: v.id }
          if (v.brand_id === '0') {
            obj.color1 = '#03a9f4'
            obj.colorName1 = '平台'
            if (v.is_platform === '0') {
              obj.disabled = true
            }
          } else {
            obj.colorName1 = '自采'
            obj.color1 = '#ff9800'
          }
          if (v.critical_value === '0') {
            obj.colorName2 = '待配置'
            obj.color2 = '#f44336'
          } else {
            obj.colorName2 = '已配置'
            obj.color2 = '#8bc34a'
          }
          return obj
        })
        this.columns = this.columns.concat(columns)
      } else if (res.msg) {
        this.$Tip.warning(res.msg)
      }
      return res.data
    },
    // 下拉刷新
    handleRefresh () {
      this.columns = []
      this.page = 1
      this.finished = true
      this.handleLoading(null, 'fresh').then(() => { this.isLoading = false })
    },
    // 上拉加载
    handleLoading (e) {
      return this.getGraspGiftList().then(res => {
        this.page += 1
        this.loading = false
        if (!res || res.length === 0 || res.length < this.limit) {
          this.finished = true
          return
        }
        this.finished = false
      })
      // this.getInventoryList((dt) => {
      //   this.inventoryList = this.inventoryList.concat(dt)
      //   this.finished = dt.length === 0
      // })
    }
  },

  mounted () {},
  created () {
    if (!this.cachePageList.includes('GraspEquipmentChoice')) {
      this.finished = true
      this.$router.push({
        name: 'GraspEquipmentChoice'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.grasp-gift-choice
  .header
    position fixed
    top 0
    left 0
    width 100%
    z-index 9
  .container
    margin-top rems(108)
  .tag-content
    margin-left rems(20)
</style>
