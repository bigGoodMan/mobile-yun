<!-- 重置局数 -->
<template>
  <div class="reset-number">
    <van-checkbox v-model="checked" @change="changeCheckBox">垃圾</van-checkbox>
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
      <div class="bgcolor-f content">
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <LinkageSelection
          right-icon
          title="请选择区域"
          :value="areaValue.text"
          :columns="areaColumns"
          @trigger-confirm="handleChoseArea"
        />
        <div class="border"></div>
        <LinkageSelection
          right-icon
          title="请选择机台编号"
          :value="machineValue.text"
          :columns="machineInfoColumns"
          @trigger-confirm="handleChoseMachine"
        />
        <div class="border"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkageSelection from '@yun/linkage-selection'
import MyStore from '@yun/my-store'
import { mapMutations } from 'vuex'
import { getSwitchgearDetailApi } from '@/api'
export default {
  name: 'ResetNumber',

  data () {
    return {
      checked: true,
      areaColumns: [],
      storeId: 1,
      result: ['a'],
      machineColumns: []
    }
  },

  components: {
    LinkageSelection,
    MyStore
  },

  computed: {
    machineInfoColumns () {
      return this.machineColumns.filter(v => v.area_id === this.areaId)
    },
    areaValue () {
      let arr = this.areaColumns.filter(item => item.id === this.areaId)
      return arr.length > 0 ? arr[0] : {}
    },
    machineValue: {
      get () {
        let arr = this.machineInfoColumns.filter(item => item.machine_id === this.machineId)
        return arr.length > 0 ? arr[0] : {}
      },
      set (val) {
      }
    }
  },

  methods: {
    ...mapMutations(['SWITCHGEAR_SETSTOREID_MUTATE']),
    handleConfirm (data) {
      this.$Loading('加载中……')
      this.SWITCHGEAR_SETSTOREID_MUTATE(data.value.store_id)
      getSwitchgearDetailApi({ store_id: this.storeId }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.areaColumns = res.data.area.map((item, index) => {
            return {
              text: item.name,
              ...item
            }
          })
          this.machineColumns = res.data.machine_list.map((item, index) => {
            return {
              text: item.no,
              ...item
            }
          })
        }
      })
    },
    handleRouter () {},
    handleChoseMachine () {},
    handleChoseArea () {},
    changeCheckBox (e) {
      console.log(e)
      this.result = []
    }
  },

  mounted () {
    let that = this
    let {
      result
    } = that
    this.$Confirm({
      message: '牛皮',
      // descrition: <div><van-checkbox ref="checkbox" value={checked} onClick={() => { checked = !checked }}>这是啥</van-checkbox></div>,
      descrition: '',
      confirm (v) {
        console.log(result)
      },
      cancel () {}
    })
  }
}
</script>
<style lang="stylus">
</style>
