<!-- 运营参数设置 -->
<template>
  <div class="operational-parameters bgcolor-f2">
    <!-- 游戏模式 -->
    <div class="operational-parameters-game-pattern">
      <h5 class="size-30 color-3 operational-parameters-title">游戏模式</h5>
      <van-cell-group>
        <van-cell
          title="模式设置"
          :value="gameValue"
          is-link
          @click="handlePopup('gamePatternShow', true)"
        />
        <van-cell
          title="获奖局数"
          :value="gameWinningNumberValue"
          is-link
          @click="handlePopup('gameWinningNumberShow', true)"
        />
      </van-cell-group>
    </div>
    <GamePatternSet
      :show="gamePatternShow"
      v-model="gameType"
      @trigger-close="handlePopup('gamePatternShow', false)"
    />
    <GamePrizeWinningNumber
      :show="gameWinningNumberShow"
      v-model="gameWinningNumberValue"
      :coinsSell="machine.coins_sell"
      :moneyCost="machine.money_cost"
      :coinsValue="machine.coins_value"
      :defaultEarnRate="defaultEarnRate"
      @trigger-change-profit="(val) => this.defaultEarnRate = val"
      @trigger-close="handlePopup('gameWinningNumberShow', false)"
    />
    <!-- 天车参数 -->
    <div class="operational-parameters-car-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">天车参数</h5>
      <CellPicker
        title="天车前后速度F"
        :columns="carSpeedColumns.carSpeedFrontBackColumns"
        :value="craneSpeed[carSpeedFrontBack]"
        @trigger-confirm="(obj) => handleConfirm(obj, 'carSpeedFrontBack')"
      />
      <div class="border border-ebedf0"></div>
      <CellPicker
        title="天车前后速度L"
        :columns="carSpeedColumns.carSpeedLeftRightColumns"
        :value="craneSpeed[carSpeedLeftRight]"
        @trigger-confirm="(obj) => handleConfirm(obj, 'carSpeedLeftRight')"
      />
      <div class="border border-ebedf0"></div>
      <CellPicker
        title="天车上下速度U"
        :columns="carSpeedColumns.carSpeedUpDownColumns"
        :value="craneSpeed[carSpeedUpDown]"
        @trigger-confirm="(obj) => handleConfirm(obj, 'carSpeedUpDown')"
      />
      <div class="border border-ebedf0"></div>
      <CellPopup
        title="绳长"
        popupTitle="绳长"
        @trigger-confirm="(val) => handleInput(val, 'lineLength') "
        popupPlaceholder="请输入绳长10~50"
        validatorMessage="请输入绳长10~50"
        :validator="(val) => /^([1-4][0-9]|50)$/.test(val)"
        :value="lineLength"
      />
      <!-- <van-cell-group>
        <van-cell
          title="天车前后速度F"
          :value="machine.car_speed_front_back_value"
        />
        <van-cell
          title="天车前后速度L"
          :value="machine.car_speed_left_right_value"
        />
        <van-cell
          title="天车上下速度U"
          :value="machine.car_speed_up_down_value"
        />
        <van-cell
          title="碰上停DELAY"
          :value="machine.key20_value"
        />
        <van-cell
          title="绳长"
          :value="machine.line_length"
        />
      </van-cell-group> -->
    </div>
    <!-- 抓力参数 -->
    <div class="operational-parameters-grasp-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">抓力参数</h5>
      <CellPopup
        title="C1抓力"
        popupTitle="C1抓力"
        @trigger-confirm="(val) => handleInput(val, 'grabVoltage') "
        popupPlaceholder="请输入抓力0~48"
        validatorMessage="请输入抓力0~48"
        :validator="(val) => /^([0-9]|[1-3][0-9]|4[0-8])$/.test(val)"
        :value="grabVoltage"
      />
      <div class="border border-ebedf0"></div>
      <CellPopup
        title="C2抓力"
        popupTitle="C2抓力"
        @trigger-confirm="(val) => handleInput(val, 'fallVoltage') "
        popupPlaceholder="请输入抓力0~48"
        validatorMessage="请输入抓力0~48"
        :validator="(val) => /^([0-9]|[1-3][0-9]|4[0-8])$/.test(val)"
        :value="fallVoltage"
      />
      <div class="border border-ebedf0"></div>
      <van-cell title="C2智能抓力">
          <template>
            <span class="color-error" v-if="machine.mind_fall_voltage >= 0">{{machine.mind_fall_voltage}}</span>
            <span class="color-success" v-else>未生效</span>
          </template>
        </van-cell>
      <CellPopup
        title="C3抓力"
        popupTitle="C3抓力"
        @trigger-confirm="(val) => handleInput(val, 'afterFallVoltage') "
        popupPlaceholder="请输入抓力0~48"
        validatorMessage="请输入抓力0~48"
        :validator="(val) => /^([0-9]|[1-3][0-9]|4[0-8])$/.test(val)"
        :value="afterFallVoltage"
      />
      <div class="border border-ebedf0"></div>
      <CellPopup
        title="C4抓力"
        popupTitle="C4抓力"
        @trigger-confirm="(val) => handleInput(val, 'vigorouslyVoltage') "
        popupPlaceholder="请输入抓力0~48"
        validatorMessage="请输入抓力0~48"
        :validator="(val) => /^([0-9]|[1-3][0-9]|4[0-8])$/.test(val)"
        :value="vigorouslyVoltage"
      />
      <!-- <van-cell-group>
        <van-cell
          title="C1抓力"
          :value="machine.grab_voltage"
        />
        <van-cell
          title="C2抓力"
          :value="machine.fall_voltage"
        />
        <van-cell
          title="C3抓力"
          :value="machine.after_fall_voltage"
        />
        <van-cell
          title="C4抓力"
          :value="machine.vigorously_voltage"
        />
        <van-cell
          title="变C2点"
          :value="machine.key21_value"
        />
      </van-cell-group> -->
    </div>
    <!-- 游戏参数 -->
    <div class="operational-parameters-game-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">游戏参数</h5>
      <van-cell-group>
        <!-- <van-cell
          title="游戏时间设定"
          :value="palyTimePopupValue"
          is-link
          @click="handlePopup('palyTimePopupShow', true)"
        /> -->
      <CellPopup
        title="游玩时间"
        popupTitle="游玩时间"
        @trigger-confirm="(val) => handleInput(val, 'gameTime') "
        popupPlaceholder="请输入游玩时间10~99"
        validatorMessage="请输入游玩时间10~99"
        :validator="(val) => /^([1-9][0-9])$/.test(val)"
        :value="gameTime"
      />
      <div class="border border-ebedf0"></div>
        <van-switch-cell
          class="vant-border border-left-15"
          v-model="gameTimesShutdown"
          title="投币局数开机恢复"
        />
        <van-switch-cell
          class="vant-border border-left-15"
          v-model="powerTimes"
          title="出奖局数开机恢复"
        />
        <van-switch-cell
          class="vant-border border-left-15"
          v-model="skyGrabThing"
          title="空中取物"
        />
      </van-cell-group>
    </div>
    <!-- 音乐参数 -->
    <div class="operational-parameters-game-pattern">
      <h5 class="size-30 color-3 operational-parameters-title">音乐参数</h5>
      <van-cell-group>
        <van-switch-cell
          v-if="machine.main_board !== '2'"
          class="vant-border border-left-15"
          v-model="awaitMusic"
          title="待机音乐"
        />
        <template v-else>
          <van-cell
            title="背景音乐"
            :value="machine.key23"
          />
          <van-cell
            title="下抓音乐"
            :value="machine.key24"
          />
          <van-cell
            title="中奖音乐"
            :value="machine.key25"
          />
          <van-cell
            title="投币音乐"
            :value="machine.key26"
          />
          <van-cell
            title="报警音乐"
            :value="machine.key27"
          />
          <van-cell
            title="音量"
            :value="machine.key28"
          />
        </template>
      </van-cell-group>
    </div>
    <div class="size-0 padding-20-30">
      <van-button
        size="large"
        type="info"
        :loading="loading"
        @click="handleSet"
        loading-text="下发参数中"
      >下发参数</van-button>
    </div>
  </div>
</template>

<script>
import GamePatternSet from '@yun/machine/game-pattern-set'
import CellPicker from '@yun/cell-picker'
import CellPopup from '@yun/cell-popup'
import GamePrizeWinningNumber from '@yun/machine/game-prize-winning-number'
import { mapState, mapActions } from 'vuex'
import { GAME_MODE, CRANE_SPEED } from '@l/judge'
import { positiveIntegerRegularTool } from '@l/tools'
export default {
  name: 'operational_parameters',

  data () {
    return {
      machine_id: '', // 机台id,
      loading: false,
      checked: true,
      gameType: '', // 游戏模式类型
      gameValue: '', // 类型名字
      gamePatternShow: false, // 展示游戏模式
      gameWinningNumberShow: false, // 展示获奖局数
      // profit: '', // 获奖局数毛利率(没有使用)
      defaultEarnRate: '', // 获奖局数毛利率
      gameWinningNumberValue: '', // 获奖局数

      gameTimesShutdown: false, // 投币局数开机恢复
      powerTimes: false, // 出奖局数开机恢复
      skyGrabThing: false, // 空中取物
      awaitMusic: false, // 待机音乐

      craneSpeed: CRANE_SPEED, // 天车速度
      carSpeedFrontBack: '', // 天车前后速度F
      carSpeedLeftRight: '', // 天车前后速度L
      carSpeedUpDown: '', // 天车上下速度U
      lineLength: '', // 绳长

      grabVoltage: '', // C1抓力
      fallVoltage: '', // C2抓力
      afterFallVoltage: '', // C3抓力
      vigorouslyVoltage: '', // C4抓力

      gameTime: '' // 游玩时间
    }
  },

  components: {
    GamePatternSet,
    GamePrizeWinningNumber,
    CellPicker,
    CellPopup
  },
  computed: {
    ...mapState({
      machine: state => state.machine,
      game_time: state => state.machine.game_time,
      game_times_shutdown: state => state.machine.game_times_shutdown,
      power_times: state => state.machine.power_times,
      sky_grab_thing: state => state.machine.sky_grab_thing,
      await_music: state => state.machine.await_music
    }),
    carSpeedColumns () {
      const keysArr = Object.keys(CRANE_SPEED)
      let carSpeedFrontBackIndex = 0
      let carSpeedLeftRightIndex = 0
      let carSpeedUpDownIndex = 0
      const values = keysArr.map((v, i) => {
        if (v === this.carSpeedFrontBack) {
          carSpeedFrontBackIndex = i
        }
        if (v === this.carSpeedLeftRight) {
          carSpeedLeftRightIndex = i
        }
        if (v === this.carSpeedUpDown) {
          carSpeedUpDownIndex = i
        }
        return {
          id: v,
          text: CRANE_SPEED[v]
        }
      })
      return {
        carSpeedFrontBackColumns: [{
          values: values,
          defaultIndex: carSpeedFrontBackIndex
        }],
        carSpeedLeftRightColumns: [{
          values: values,
          defaultIndex: carSpeedLeftRightIndex
        }],
        carSpeedUpDownColumns: [{
          values: values,
          defaultIndex: carSpeedUpDownIndex
        }]
      }
    },
    gameMode () { // 游戏模式
      return this.machine.main_board === '2' ? this.machine.key29 : this.machine.key22
    },
    awardNumber () { // 获奖局数 1和3是五马行和自研主板
      return this.machine.main_board === '2' ? this.machine.key32 : this.machine.award_count
    },
    profit () { // 毛利率
      return this.machine.default_earn_rate / 100
    }
  },
  watch: {
    gameMode: { // 游戏模式
      handler (val) {
        this.gameType = val
      },
      immediate: true
    },
    gameType: {
      handler (val) { // 游戏模式类型
        this.gameValue = GAME_MODE[val]
      },
      immediate: true
    },
    game_times_shutdown: {
      handler (val) { // 投币数开机恢复
        this.gameTimesShutdown = val === '1'
      },
      immediate: true
    },
    power_times: {
      handler (val) { // 出奖局数开机恢复
        this.powerTimes = val === '1'
      },
      immediate: true
    },
    sky_grab_thing: {
      handler (val) { // 空中取物
        this.skyGrabThing = val === '1'
      },
      immediate: true
    },
    await_music: {
      handler (val) { // 待机音乐
        this.awaitMusic = val === '1'
      },
      immediate: true
    },
    awardNumber: {
      handler (val) { // 获奖局数
        this.gameWinningNumberValue = val
      },
      immediate: true
    },
    profit: { // 毛利率
      handler (val) {
        this.defaultEarnRate = val
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['MACHINE_GETOPERATEPARAM_ACTION', 'MACHINE_SETOPERATEPARAM_ACTION']),
    handleVoluation () {
      this.carSpeedFrontBack = this.machine.car_speed_front_back
      this.carSpeedLeftRight = this.machine.car_speed_left_right
      this.carSpeedUpDown = this.machine.car_speed_up_down
      this.lineLength = this.machine.line_length

      this.grabVoltage = this.machine.grab_voltage
      this.fallVoltage = this.machine.fall_voltage
      this.afterFallVoltage = this.machine.after_fall_voltage
      this.vigorouslyVoltage = this.machine.vigorously_voltage

      this.gameTime = this.game_time
    },
    // inputConfirm
    handleInput (val, key) {
      this[key] = val
    },
    // pickerConfrim
    handleConfirm (obj, key) {
      this[key] = obj.id
    },
    handlePopup (showParam, boo) {
      this[showParam] = boo
    },
    // 获取运营参数
    getInfo () {
      this.$Loading('加载中')
      this.MACHINE_GETOPERATEPARAM_ACTION({
        machineId: this.machine_id
      }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.handleVoluation()
        } else if (res.msg) {
          this.$Tip.warning({
            mask: true,
            message: res.msg
          })
        }
      })
    },
    // 下发参数
    handleSet () {
      if (this.gameType !== '0' && this.gameType !== '1') {
        this.$Tip.warning('没有选择游戏模式')
      }
      if (!positiveIntegerRegularTool(this.gameWinningNumberValue) || this.gameWinningNumberValue > 99 || this.gameWinningNumberValue <= 0) {
        this.$Tip.warning('获奖局数需在1~99区间内')
      }
      if (!/^([1-4][0-9]|50)$/.test(this.lineLength)) {
        this.$Tip.warning('绳长需在10~50区间内')
      }
      if (!/^([0-9]|[1-3][0-9]|4[0-8])$/.test(this.grabVoltage)) {
        this.$Tip.warning('C1抓力需在0~48区间内')
      }
      if (!/^([0-9]|[1-3][0-9]|4[0-8])$/.test(this.fallVoltage)) {
        this.$Tip.warning('C2抓力需在0~48区间内')
        return
      }
      if (!/^([0-9]|[1-3][0-9]|4[0-8])$/.test(this.afterFallVoltage)) {
        this.$Tip.warning('C3抓力需在0~48区间内')
        return
      }
      if (!/^([0-9]|[1-3][0-9]|4[0-8])$/.test(this.vigorouslyVoltage)) {
        this.$Tip.warning('C4抓力需在0~48区间内')
        return
      }
      if (!/^([1-9][0-9])$/.test(this.gameTime)) {
        this.$Tip.warning('游玩时间需在10~99区间内')
        return
      }
      const data = {}
      if (this.machine.main_board === '1' || this.machine.main_board === '3') { // 武马行
        data.key22 = this.gameType
        data.award_count = this.gameWinningNumberValue
        data.await_music = this.awaitMusic ? '1' : '0'
      } else { // 花花世界
        data.key29 = this.gameType
        data.key32 = this.gameWinningNumberValue
      }
      this.loading = true
      data.line_length = this.lineLength
      data.grab_voltage = this.grabVoltage
      data.fall_voltage = this.fallVoltage
      data.after_fall_voltage = this.afterFallVoltage
      data.vigorously_voltage = this.vigorouslyVoltage
      data.game_time = this.gameTime
      data.game_times_shutdown = this.gameTimesShutdown ? '1' : '0'
      data.power_times = this.powerTimes ? '1' : '0'
      data.sky_grab_thing = this.skyGrabThing ? '1' : '0'
      data.car_speed_front_back = this.carSpeedFrontBack
      data.car_speed_left_right = this.carSpeedLeftRight
      data.car_speed_up_down = this.carSpeedUpDown
      data.default_earn_rate = this.defaultEarnRate
      this.MACHINE_SETOPERATEPARAM_ACTION({
        machineId: this.machine_id,
        data
      }).then(res => {
        const $this = this
        $this.loading = false
        if (res.return_code === '0') {
          $this.$Tip.success({
            message: '下发成功！',
            duration: 1.5,
            mask: true,
            close () {
              $this.$router.go(-1)
            }
          })
          return
        }
        if (res.return_code !== '0') {
          $this.$Tip.warning(res.msg)
        }
      })
    }
  },
  created () {
    this.machine_id = this.$route.query.id

    this.getInfo()
  }
}
</script>
<style lang="stylus" scoped>
.operational-parameters
  .operational-parameters-title
    margin 0
    padding rems(20) rems(10)
</style>
