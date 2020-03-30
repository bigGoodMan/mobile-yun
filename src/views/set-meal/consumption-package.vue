<!-- 消费套餐 -->
<template>
  <div class="consumption-package">
    <div class="header bgcolor-f">
      <MyStore @trigger-click="handleConfirm" :store-id="storeId" :default-index="0">
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
    </div>
    <div class="main">
      <dl class="container margin-0">
        <van-pull-refresh
          v-model="freshLoading"
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
        <dt class="size-26 title">当前消费套餐</dt>
        <dd class="content" v-for="(value, index) of list" :key="value.id"><ConsumptionPackageItem :packageItem="value" @trigger-delete="handleDelete(value.id, index)" @trigger-edit="handleEdit"/></dd>
          </van-list>
        </van-pull-refresh>
      </dl>
    </div>
        <HhfButton type="info" :bottom-z-index="3" size="large" @trigger-click="handleAdd">新增消费套餐</HhfButton>
    <ConsumptionPackagePopup v-model="show" :itemData="itemData" @trigger-save="handleSave"/>
  </div>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
import ConsumptionPackagePopup from './components/consumption-package-popup'
import MyStore from '@yun/my-store'
import ConsumptionPackageItem from './components/consumption-package-item'
import { getConsumptionPackageList, deleteConsumptionPackage, addConsumptionPackage, editConsumptionPackage } from '@/api'
export default {
  name: 'ConsumptionPackage',

  data () {
    return {
      storeId: null,
      show: false,
      page: 1,
      limit: 20,
      freshLoading: false, // 下拉刷新loading状态
      loading: false,
      finished: true, // 是否加载完成
      list: [],
      itemData: null
    }
  },

  components: {
    MyStore,
    HhfButton,
    ConsumptionPackageItem,
    ConsumptionPackagePopup
  },

  computed: {

  },

  methods: {
    getDataList (callback = () => {}) {
      this.$Loading({
        message: '加载中...'
      })
      const {
        page,
        limit,
        storeId
      } = this
      getConsumptionPackageList({ store_id: storeId, limit, page }).then(res => {
        this.$Loading.clear()
        let arr = []
        if (res.return_code === '0') {
          arr = res.data.list.map(v => {
            const limit = v.rules[0].limit
            const discount = v.rules[0].discount
            return {
              ...v,
              limit,
              discount
            }
          })
          ++this.page
        } else {
          this.$Tip.warning(res.msg)
        }
        callback(arr)
      })
    },
    // 下拉刷新
    handleRefresh () {
      this.page = 1
      this.getDataList(dt => {
        this.list = dt
        this.finished = dt.length < this.limit || dt.length === 0
        this.freshLoading = false
      })
    },
    // 上拉加载
    handleLoading () {
      this.getDataList((dt) => {
        this.list = this.list.concat(dt)
        this.finished = dt.length < this.limit || dt.length === 0
        this.loading = false
      })
    },
    // 选择门店回调
    handleConfirm (data) {
      this.storeId = data.value.store_id
      this.handleRefresh()
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    },
    handleDelete (id, index) {
      this.$Confirm({
        message: '确定删除？',
        mask: true,
        maskOpacity: 1,
        maskColor: 'rgba(0,0,0,0.3)',
        confirm: confirmId => {
          this.$Loading('正在删除……')
          deleteConsumptionPackage({ id }).then(res => {
            this.$Loading.clear()
            if (res.return_code === '0') {
              this.$Confirm.clear(confirmId)
              this.$Tip.success(res.msg)
              this.list.splice(index, 1)
              return
            }
            this.$Tip.warning(res.msg)
          })
          // that.handleSure(confirmId)
          // console.log(result)
          return true
        },
        cancel () {}
      })
    },
    handleEdit (item) {
      this.itemData = item
      this.show = true
    },
    handleAdd () {
      this.itemData = {
        store_id: this.storeId
      }
      this.show = true
    },
    handleSave (item) {
      const {
        title,
        store_id: storeId,
        discount,
        limit,
        id
      } = item
      let jsons = {
        title: title,
        store_id: storeId,
        rules: [{
          discount: discount,
          limit: limit
        }]
      }
      this.$Loading('正在保存……')
      if (id) {
        jsons.id = id
        editConsumptionPackage(jsons).then(res => {
          this.$Loading.clear()
          if (res.return_code === '0') {
            this.list = this.list.map(v => {
              if (v.id === id) {
                v.title = title
                v.rules = [{
                  discount,
                  limit
                }]
              }
              return v
            })
            this.$Tip.success(res.msg)
            this.show = false
            return
          }
          this.$Tip.warning(res.msg)
        })
        return
      }
      addConsumptionPackage(jsons).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.list.push({
            ...jsons,
            discount,
            limit,
            id: res.data
          })
          this.$Tip.success(res.msg)
          this.show = false
          return
        }
        this.$Tip.warning(res.msg)
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
.consumption-package
  .main
    .container
      .title
        padding rems(30) rems(20)
      .content
        margin 0
        padding 0 rems(30) rems(30)
</style>
