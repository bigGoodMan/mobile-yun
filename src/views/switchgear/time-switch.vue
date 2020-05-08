<!--  -->
<template>
  <div class="time-switch">
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
    <div class="container">
      <div class="bgcolor-f content">
        <h5 class="margin-0 padding-20-30 size-30">我的机台</h5>
        <div class="border"></div>
        <LinkageSelection
          right-icon="arrow"
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
      <div class="bgcolor-f content flex-row flex-between-center padding-20-30" v-if="machineValue.machine_id">
        <div class="img-container" @click.stop="APP_IMAGEPREVIEW_MUTATE({ previewImage: [machineValue.img || ''], imagePreviewShow: true })">
          <img class="img"  v-lazy="machineValue.img || ''" >
        </div>
        <ul class="no-ul flex-1 size-28">
          <li class="flex-row flex-between-center list"><span>型号：</span><span>{{machineValue.machine_type_name}}-{{machineValue.no}}</span></li>
          <li class="flex-row flex-between-center list"><span>开机：</span><span :class="machineValue.turn_on_time ? 'color-info' : ''">{{machineValue.turn_on_time || '未设置'}}</span></li>
          <li class="flex-row flex-between-center list"><span>关机：</span><span :class="machineValue.turn_off_time ? 'color-info' : ''">{{machineValue.turn_off_time || '未设置'}}</span></li>
        </ul>
      </div>
      <div class="bgcolor-f" style="overflow: hidden"  v-if="machineValue.machine_id">
      <div class="border"></div>
      <dl class="padding-20-30 size-28">
        <dt class="title padding-bottom-20">开机-每日</dt>
        <dd class="size-36 padding-bottom-20 flex-row flex-between-center">
          <span class="name">{{openObj.text}}</span>
          <div class="flex-row flex-between-center">
            <input type="tel" :class="['time-input', timeError[0] ? 'border-error' : null]" maxlength="2" :value="openHour" @input="handleInput($event.target,'openHour')">
            :
            <input type="tel" :class="['time-input', timeError[1] ? 'border-error' : null]" maxlength="2" :value="openMinute" @input="handleInput($event.target,'openMinute')">
          </div>
          <van-button type="info" size="small" @click="handleSave('open')">保存</van-button>
        </dd>
        <dt class="title padding-bottom-20">关机-每日</dt>
        <dd class="size-36 flex-row flex-between-center">
          <span class="name">{{closeObj.text}}</span>
          <div class="flex-row flex-between-center">
            <input type="tel" :class="['time-input', timeError[2] ? 'border-error' : null]" maxlength="2" :value="closeHour" @input="handleInput($event.target,'closeHour')">
            :
            <input type="tel" :class="['time-input', timeError[3] ? 'border-error' : null]" maxlength="2" :value="closeMinute" @input="handleInput($event.target,'closeMinute')">
          </div>
          <van-button type="info" size="small" @click="handleSave('close')">保存</van-button>
        </dd>
      </dl>
      </div>
    </div>
  </div>
</template>

<script>
import LinkageSelection from '@yun/linkage-selection'
import MyStore from '@yun/my-store'
import { debounce, positiveIntegerRegularTool } from '@l/tools'
import { getSwitchgearDetailApi, getSwitchgearTimeApi } from '@/api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'TimeSwitch',

  data () {
    return {
      openHour: '', // 开机小时，
      openMinute: '', // 开机分钟
      closeHour: '', // 关机小时
      closeMinute: '', // 关机分钟
      timeError: [false, false, false, false],
      openObj: {
        text: '',
        type: ''
      },
      closeObj: {
        text: '',
        type: ''
      },
      areaColumns: [],
      machineColumns: []
      // machineInfoColumns: []
    }
  },

  components: {
    LinkageSelection,
    MyStore
  },

  computed: {
    ...mapState({
      storeId: state => state.switchgear.storeId,
      areaId: state => state.switchgear.areaId,
      machineId: state => state.switchgear.machineId
    }),
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
    },
    machineInfoColumns () {
      return this.machineColumns.filter(v => v.area_id === this.areaId)
    }
  },
  watch: {
    machineValue (val) {
      if (val.turn_on_time) {
        this.openHour = val.turn_on_time.split(':')[0]
        this.openObj = this.judgeTime(this.openHour)
        this.openMinute = val.turn_on_time.split(':')[1]
      } else {
        this.openHour = ''
        this.openMinute = ''
      }
      if (val.turn_off_time) {
        this.closeHour = val.turn_off_time.split(':')[0]
        this.closeObj = this.judgeTime(this.closeHour)
        this.closeMinute = val.turn_off_time.split(':')[1]
      } else {
        this.closeHour = ''
        this.closeMinute = ''
      }
    }
  },
  methods: {
    ...mapMutations(['SWITCHGEAR_SETSTOREID_MUTATE', 'SWITCHGEAR_AREAID_MUTATE', 'SWITCHGEAR_MACHINEID_MUTATE', 'APP_IMAGEPREVIEW_MUTATE', 'SWITCHGEAR_SETSWITCHGEARLIST_MUTATE']),
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
    // 选择区域
    handleChoseArea (data) {
      this.SWITCHGEAR_AREAID_MUTATE(data.value.id)
      this.SWITCHGEAR_MACHINEID_MUTATE('')
    },
    // 选择机台
    handleChoseMachine (data) {
      this.SWITCHGEAR_MACHINEID_MUTATE(data.value.machine_id)
    },
    judgeTime (val) {
      if (!positiveIntegerRegularTool(val)) {
        return {}
      } else if (val >= 0 && val <= 11) {
        return {
          text: '上午',
          type: 'forenoon'
        }
      } else if (val >= 12 && val <= 23) {
        return {
          text: '下午',
          type: 'afternoon'
        }
      }
      return {}
    },
    handleInput: debounce({
      callback (target, type) {
        const val = target.value
        switch (type) {
          case 'openHour':
            if ((!positiveIntegerRegularTool(val) && val) || val < 0 || val >= 24) {
              this.timeError.splice(0, 1, true)
            } else {
              this.timeError.splice(0, 1, false)
            }
            this.openObj = this.judgeTime(val)
            this.openHour = val
            break
          case 'openMinute':
            if ((!positiveIntegerRegularTool(val) && val) || val < 0 || val >= 60) {
              this.timeError.splice(1, 1, true)
            } else {
              this.timeError.splice(1, 1, false)
            }
            this.openMinute = val
            break
          case 'closeHour':
            if ((!positiveIntegerRegularTool(val) && val) || val < 0 || val >= 24) {
              this.timeError.splice(2, 1, true)
            } else {
              this.timeError.splice(2, 1, false)
            }
            this.closeObj = this.judgeTime(val)
            this.closeHour = val
            break
          case 'closeMinute':
            if ((!positiveIntegerRegularTool(val) && val) || val < 0 || val >= 60) {
              this.timeError.splice(3, 1, true)
            } else {
              this.timeError.splice(3, 1, false)
            }
            this.closeMinute = val
            break
        }
      }
    }),
    handleSave (type) {
      let {
        openHour,
        openMinute,
        closeHour,
        closeMinute,
        machineId,
        storeId,
        areaId,
        machineColumns
      } = this
      if ((!openHour && openMinute) || (openHour && !openMinute)) {
        this.$Tip.warning('请设置正确的开机时间')
        return
      }
      if (openHour && (openHour < 0 || openHour >= 24)) {
        this.$Tip.warning('请设置正确的开机时间')
        return
      }
      if (openMinute && (openMinute < 0 || openMinute >= 60)) {
        this.$Tip.warning('请设置正确的开机时间')
        return
      }
      if ((!closeHour && closeMinute) || (closeHour && !closeMinute)) {
        this.$Tip.warning('请设置正确关机时间')
        return
      }
      if (closeHour && (closeHour < 0 || closeHour >= 24)) {
        this.$Tip.warning('请设置正确的关机时间')
        return
      }
      if (closeMinute && (closeMinute < 0 || closeMinute >= 60)) {
        this.$Tip.warning('请设置正确的关机时间')
        return
      }
      openHour = openHour.length === 1 ? '0' + openHour : openHour
      openMinute = openMinute.length === 1 ? '0' + openMinute : openMinute
      closeHour = closeHour.length === 1 ? '0' + closeHour : closeHour
      closeMinute = closeMinute.length === 1 ? '0' + closeMinute : closeMinute
      let onTime = [openHour, openMinute].join(':')
      let offTime = [closeHour, closeMinute].join(':')
      getSwitchgearTimeApi({
        mid: machineId,
        store_id: storeId,
        area_id: areaId,
        turn_on_time: onTime,
        turn_off_time: offTime
      }).then(res => {
        if (res.return_code === '0') {
          this.machineColumns = machineColumns.map(v => {
            if (v.machine_id === machineId) {
              return { ...v,
                turn_on_time: onTime,
                turn_off_time: offTime }
            }
            return v
          })
          this.SWITCHGEAR_SETSWITCHGEARLIST_MUTATE({
            machine_id: machineId,
            store_id: storeId,
            area_id: areaId,
            turn_on_time: onTime,
            turn_off_time: offTime
          })
          this.$Tip.success(res.msg)
        } else if (res.return_code) {
          this.$Tip.warning(res.msg)
        }
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.time-switch
  .container
    .content
      margin-top rems(50)
      .img-container
        display flex
        flex-flow row nowrap
        justify-content center
        align-items center
        width rems(150)
        height rems(150)
        .img
          max-width 100%
          max-height 100%
      .list
        margin 0 0 rems(20) rems(100)
        &:last-child
          margin-bottom 0
    input.time-input.border-error
      border 1px solid #ff0000
    .time-input
      width rems(50)
      padding rems(5) rems(10)
      text-align center
      border 1px solid #aaa
      transition border 0.2s ease-in-out
      &:first-of-type
        margin-right rems(20)
      &:last-of-type
        margin-left rems(20)
      &:focus
        border 1px solid #1989fa
    .name
      width rems(100)
</style>
