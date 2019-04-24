<!-- 我的机台 -->
<template>
  <div class="my-machine bgcolor-f2">
    <div class="my-machine-header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :columns="columns"
        :default-index="0"
      />
    </div>
    <div class="my-machine-container">
      <div class="border"></div>
      <van-collapse
        class="my-machine-content"
        v-model="activeNames"
      >
        <van-collapse-item
          title="我的机台"
          :name="0"
        >
          <MachineList :columns="columns" />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import { Collapse, CollapseItem } from 'vant'
import MyStore from '@yun/my-store'
import MachineList from '@yun/machine-list'
import { getMachineListApi } from '@/api'
export default {
  name: 'my_machine',

  data () {
    return {
      activeNames: [0],
      columns: []
    }
  },

  components: {
    MyStore,
    MachineList,
    'van-collapse': Collapse,
    'van-collapse-item': CollapseItem
  },

  computed: {},

  methods: {
    handleConfirm (data) {
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        duration: 0
      })
      getMachineListApi({ store_id: data.value.store_id }).then(res => {
        this.$toast.clear()
        if (res.return_code === '0') {
          this.columns = res.data.machine_list
        } else {
          this.$toast.faile(res.msg)
        }
      })
    }
  },

  mounted () {
  }
}
</script>
<style lang="stylus">
.my-machine
  .my-machine-container
    margin-top rems(20)
    .my-machine-content
      .van-collapse-item__content
        padding 0
</style>
