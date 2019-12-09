<!-- 指令强抓 -->
<template>
  <div class="command-strong-grasp">
    <!-- <HhfCheckBox v-model="checked" @trigger-change="changeCheckBox">这是什么</HhfCheckBox> -->
    <div class="header bgcolor-f">
      <MyStore
        @trigger-click="handleConfirm"
        :store-id="storeId"
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
      <div class="bgcolor-f content">
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <MyArea
        :store-id="storeId"
        v-model="areaId"
         />
        <div class="border"></div>
        <MyMachine
        :store-id="storeId"
        :area-id="areaId"
        v-model="machineId"
         />
      </div>
      <!-- 操作内容 -->
      <div v-if="machineId" class="fixed-max-width bottom-0">
        <p class="size-28 command-strong-grasp-tip">下发强抓不可撤销，点击【确认下发】立即下发强抓，若需要保持强抓至出货，请勾选【保持强抓】。</p>
        <div class="size-28 text-center weight-bold flex-row flex-center margin-bottom-20">
          <van-checkbox v-model="checked">保持强抓至出货</van-checkbox>
        </div>
        <div class="text-center"><HhfButton :loading="loading" type="info" size="large" @trigger-click="handleCommand">下发强抓</HhfButton></div>
      </div>
  </div>
</template>

<script>
import MyStore from '@yun/my-store'
import MyArea from '@yun/my-area'
import MyMachine from '@yun/my-machine'
import HhfButton from '@hhf/hhf-button'
import HhfCheckBox from '@hhf/hhf-checkbox'
import { commandStrongGrasp } from '@/api'
// import { getSwitchgearDetailApi } from '@/api'
export default {
  name: 'ResetNumber',

  data () {
    return {
      loading: false,
      checked: false,
      areaColumns: [],
      storeId: null,
      areaId: null,
      machineId: null,
      result: ['a'],
      machineColumns: []
    }
  },

  components: {
    MyStore,
    MyArea,
    MyMachine,
    HhfButton
  },
  computed: {
  },

  methods: {
    handleConfirm (data) {
      this.storeId = data.value.store_id
    },
    handleRouter () {},
    handleChoseMachine () {},
    handleChoseArea () {},
    changeCheckBox (e, vm) {
      this.checked = vm.isChecked = !vm.isChecked
      // console.log(e)
      // console.log(this.checked = !this.checked)
    },
    // 下发强抓
    handleCommand () {
      const that = this
      this.$Confirm({
        message: '下发强抓不可撤销，立即下发',
        mask: true,
        // descrition: <div><van-checkbox ref="checkbox" value={checked} onClick={() => { checked = !checked }}>这是啥</van-checkbox></div>,
        descrition: <HhfCheckBox v-model={this.checked} on-trigger-change={this.changeCheckBox}>保持强抓出货</HhfCheckBox>,
        confirm (confirmId) {
          that.handleSure(confirmId)
        // console.log(result)
        },
        cancel () {}
      })
    },
    handleSure (confirmId) {
      this.loading = true
      this.$Loading('下发抢抓中')
      commandStrongGrasp({ machine_id: this.machineId, type: this.checked ? 5 : 7 }).then(res => {
        this.$Loading.clear()
        this.loading = false
        if (res.return_code === '0') {
          this.$Confirm.clear(confirmId)
          this.$Tip({
            type: 'success',
            message: res.msg,
            mask: true
          })
        } else if (res.return_code) {
          this.$Tip({
            type: 'warning',
            message: res.msg,
            mask: true
          })
        } else {
          this.$Tip({
            type: 'error',
            message: res.msg,
            mask: true
          })
        }
      })
    }
  },
  created () {
    const {
      sid,
      mid,
      aid
    } = this.$route.query
    if (sid) {
      this.storeId = sid
    }
    if (sid && aid) {
      this.areaId = aid
    }
    if (sid && aid && mid) {
      this.machineId = mid
    }
  },
  mounted () {
    // this.$Confirm({
    //   message: '牛皮',
    //   // descrition: <div><van-checkbox ref="checkbox" value={checked} onClick={() => { checked = !checked }}>这是啥</van-checkbox></div>,
    //   descrition: <HhfCheckBox v-model={this.checked} on-trigger-change={this.changeCheckBox}>这是什么</HhfCheckBox>,
    //   confirm (v) {
    //     // console.log(result)
    //   },
    //   cancel () {}
    // })
  }
}
</script>
<style lang="stylus" scoped>
.command-strong-grasp
  .content
    margin-top rems(50)
  .btn-container
    position fixed
    bottom 0
    left 0
    width 100%
    margin-bottom rems(50)
  .command-strong-grasp-tip
    width rems(600)
    margin-left auto
    margin-right auto
</style>
