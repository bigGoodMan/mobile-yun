<!-- 固件更新 -->
<template>
  <div class="firmware-update">
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :default-index="0"
      >
      <div class="flex-row flex-end-center flex-1" >
        <van-icon name="question-o" size="0.4rem"/>
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
          <van-collapse
            class="content"
            v-model="activeNames"
          >
            <van-collapse-item
              title="我的机台"
              :name="0"
            >
            <MachineCard v-for="(items, index) of columns" :img="items.img" :key="index" :title="`${items.area_name}（${items.intro}）`">
              <li v-for="its in items.items" :key="its.machine_id">
                <TabulatingCard :img="its.img">
                    <template v-slot:tag>待更新</template>
                    <template v-slot:title>x区-00</template>
                    <template v-slot:content>型号</template>
                </TabulatingCard>
              </li>
            </MachineCard>
            </van-collapse-item>
          </van-collapse>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import MyStore from '@yun/my-store'
import MachineCard from '@yun/machine/machine-card'
import TabulatingCard from '@yun/tabulating-card'
import { getMachineListApi } from '@/api'
export default {
  name: 'FirmwareUpdate',

  data () {
    return {
      activeNames: [0],
      columns: [],
      isLoading: false,
      store_id: ''
    }
  },

  components: {
    MyStore,
    MachineCard,
    TabulatingCard
  },

  computed: {},

  methods: {
    handleConfirm (data) {
      this.store_id = data.value.store_id
      this.handleGetMachineList()
    },
    handleGetMachineList (callback = () => {}) {
      this.$toast.loading({
        message: '加载中...',
        duration: 0
      })
      getMachineListApi({ store_id: this.store_id }).then(res => {
        callback()
        this.$toast.clear()
        if (res.return_code === '0') {
          this.columns = res.data.machine_list
          console.log(this.columns)
        } else {
          this.$Tip.warning(res.msg)
        }
      })
    },
    handleRefresh () {
      this.handleGetMachineList(() => {
        this.isLoading = false
      })
    }
  },

  mounted () {}
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
</style>
