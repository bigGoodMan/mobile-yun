<!-- 固件更新 -->
<template>
  <div class="firmware-update">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :default-index="0"
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
    <div class="main">
      <div class="container bgcolor-f2">
        <div class="border"></div>
        <van-pull-refresh
          v-model="isLoading"
          class="fresh"
          @refresh="handleRefresh"
        >
          <div
            class="content size-28 bgcolor-f"
          >
            <h5 class="margin-0 padding-20-30 bgcolor-f size-28 flex-row flex-between-center"><span>我的机台</span><span v-if="awaitUpdateColumns.length > 0" class="color-info" @click="putEquipmentUpdate">一键更新</span></h5>
            <div class="border"></div>
              <MachineCard
                v-for="(items, index) of columns"
                :key="index"
                :title="`${items.area_name}（${items.intro}）`"
              >
              <template v-if="items.items.length > 0">
                <li
                  v-for="its of items.items"
                  :key="its.machine_id"
                >
                  <TabulatingCard :img="its.img">
                    <template v-if="its.upgrade_status === '2'" v-slot:tag>待更新</template>
                    <template v-slot:title>{{its.name}}--{{its.no}}</template>
                    <template v-slot:content>{{its.machine_id}}</template>
                  </TabulatingCard>
                </li>
              </template>
              <template v-else>
                <li class="firmware-update-empty">该区域设备均是最新版本</li>
              </template>
              </MachineCard>
          </div>
        </van-pull-refresh>
      </div>
    </div>
    <div v-if="status">
      <EquipmentUpdateProgress :status="status" :pivot-text="progressNum" :percentage="percentage" @fail-canel="handleClose" @fail-retry="handleRetry" @success-confirm="handleClose"/>
    </div>
  </div>
</template>

<script>
import MyStore from '@yun/my-store'
import MachineCard from '@yun/machine/machine-card'
import EquipmentUpdateProgress from '@yun/firmware-update/equipment-update-progress'
import TabulatingCard from '@yun/tabulating-card'
import { errorCaptured } from '@l/utils'
import { getEquipmentUpdateListApi, judgeEquipmentUpdateStatusApi, getEquipmentUpdateProgressApi, putEquipmentUpdateApi } from '@/api'
export default {
  name: 'FirmwareUpdate',

  data () {
    this.timer = null
    return {
      activeNames: [0],
      columns: [],
      isLoading: false,
      store_id: '',
      status: '',
      progressNum: '',
      percentage: 0
    }
  },

  components: {
    MyStore,
    MachineCard,
    TabulatingCard,
    EquipmentUpdateProgress
  },

  computed: {
    // 待更新的机台
    awaitUpdateColumns () {
      let arr = []
      this.columns.forEach(v => {
        let itemsArr = v.items.filter(item => {
          return item.upgrade_status === '2'
        })
        arr = [ ...arr, ...itemsArr ]
      })
      return arr
    },
    awaitMidsParams () {
      return this.awaitUpdateColumns.map(v => ({ mid: v.machine_id, task_id: v.task_id }))
    }
  },

  methods: {
    // 选择门店回调
    handleConfirm (data) {
      this.store_id = data.value.store_id
      // this.handleGetMachineList()
      this.judgeEquipmentUpdateStatus()
    },
    // 更新成功确认j或者取消
    handleClose () {
      this.status = ''
    },
    // 重试更新
    handleRetry () {
      this.putEquipmentUpdate()
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    },
    // 获取门店是否在更新状态
    async judgeEquipmentUpdateStatus () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      let [err, res] = await errorCaptured(judgeEquipmentUpdateStatusApi, { store_id: this.store_id })
      if (err) {
        this.$toast.clear()
        return
      }
      await errorCaptured(this.getEquipmentUpdateList)
      if (res.return_code === '0') {
        let status = res.data // 0 无需更新 1是更新中
        if (status === '1') {
          this.getEquipmentUpdateProgress()
        }
      }
      // return res
    },
    // 获取门店设备更新进度
    async getEquipmentUpdateProgress () {
      clearTimeout(this.timer)
      this.timer = null
      let [err, res] = await errorCaptured(getEquipmentUpdateProgressApi, { store_id: this.store_id, mids: this.awaitMidsParams })
      this.$toast.clear()
      if (err) {
        return err
      }
      if (res.data) {
        const { data } = res
        const totalNum = data.total_num
        const succNum = data.succ_num
        const failNum = data.fail_num
        if (totalNum === succNum) {
          this.getEquipmentUpdateList()
          this.status = 'success'
          return
        }
        if (totalNum === succNum + failNum) {
          this.getEquipmentUpdateList()
          this.status = 'fail'
          return
        }
        this.status = 'updating'
        this.percentage = Math.ceil((succNum / totalNum) * 100)
        this.progressNum = `${succNum} / ${totalNum}`
        setTimeout(() => {
          this.getEquipmentUpdateProgress()
        }, 10000)
      }
    },
    // 去更新
    putEquipmentUpdate () {
      if (this.awaitUpdateColumns.length === 0) {
        this.$Tip.warning('没有机台可以更新')
        return
      }
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      putEquipmentUpdateApi({
        store_id: this.store_id,
        mids: this.awaitMidsParams
      }).then(res => {
        if (res.return_code === '0') {
        } else if (res.msg) {
          this.$Tip.warning(res.msg)
        }
        this.$toast.clear()
      })
      this.getEquipmentUpdateProgress()
    },
    async getEquipmentUpdateList () {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      const [err, res] = await errorCaptured(getEquipmentUpdateListApi, { store_id: this.store_id })
      this.$toast.clear()
      if (err) {
        return
      }
      if (res.return_code === '0') {
        this.columns = res.data
      } else if (res.msg) {
        this.$Tip.warning(res.msg)
      }
      return res
    },
    handleRefresh () {
      this.getEquipmentUpdateList().then(res => {
        this.isLoading = false
      })
    }
  },

  mounted () {
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>
<style lang="stylus">
.firmware-update
  .header
    position absolute
    top 0
    left 0
    width 100%
    z-index 10
  .container
    padding-top rems(106)
    height 100%
    box-sizing border-box
    .fresh
      padding-top rems(30)
      overflow initial
    .content
      .van-collapse-item__content
        padding 0
      .firmware-update-empty
        height rems(200)
        display flex
        flex-direction row
        flex-wrap nowrap
        justify-content center
        align-items center
        margin rems(40) auto
        width 90%
        border rems(2) solid #dddddd
</style>
