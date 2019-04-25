<!-- 运营参数设置 -->
<template>
  <div class="operational-parameters">
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
        @trigger-close="handlePopup('gameWinningNumberShow', false)"
      />
    <!-- 天车参数 -->
    <div class="operational-parameters-car-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">天车参数</h5>
      <van-cell-group>
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
      </van-cell-group>
    </div>
    <!-- 抓力参数 -->
    <div class="operational-parameters-grasp-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">抓力参数</h5>
      <van-cell-group>
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
      </van-cell-group>
    </div>
    <!-- 游戏参数 -->
    <div class="operational-parameters-game-parameter">
      <h5 class="size-30 color-3 operational-parameters-title">游戏参数</h5>
      <van-cell-group>
        <van-cell
          title="游戏时间设定"
          :value="palyTimePopupValue"
          is-link
          @click="handlePopup('palyTimePopupShow', true)"
        />
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
    <PlayTimePopup
      :show="palyTimePopupShow"
      v-model="palyTimePopupValue"
      @trigger-close="handlePopup('palyTimePopupShow', false)"
    />
    <!-- 音乐参数 -->
    <div class="operational-parameters-game-pattern">
      <h5 class="size-30 color-3 operational-parameters-title">音乐参数</h5>
      <van-cell-group>
        <van-switch-cell
          v-if="machine.main_board === '1'"
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
import GamePatternSet from '@yun/game-pattern-set'
import GamePrizeWinningNumber from '@yun/game-prize-winning-number'
import PlayTimePopup from '@yun/play-time-popup'
import { mapState, mapActions } from 'vuex'
import { GAME_MODE } from '@l/judge'
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
      profit: '', // 获奖局数毛利率
      gameWinningNumberValue: '', // 获奖局数
      palyTimePopupShow: false, // 展示游玩时间
      palyTimePopupValue: '', // 游玩时间
      gameTimesShutdown: false, // 投币局数开机恢复
      powerTimes: false, // 出奖局数开机恢复
      skyGrabThing: false, // 空中取物
      awaitMusic: false // 待机音乐
    }
  },

  components: {
    GamePatternSet,
    GamePrizeWinningNumber,
    PlayTimePopup
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
    gameMode () { // 游戏模式
      return this.machine.main_board === '1' ? this.machine.key22 : this.machine.key29
    },
    awardNumber () { // 获奖局数
      return this.machine.main_board === '1' ? this.machine.award_count : this.machine.key32
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
    game_time: {
      handler (val) { // 游玩时间
        this.palyTimePopupValue = val
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
    }
    // profit (val) { // 毛利率
    //   this.gameWinningNumberValue = val * 2
    // }
  },
  methods: {
    ...mapActions(['MACHINE_GETOPERATEPARAM_ACTION', 'MACHINE_SETOPERATEPARAM_ACTION']),
    handlePopup (showParam, boo) {
      this[showParam] = boo
    },
    // 获取运营参数
    getInfo () {
      this.MACHINE_GETOPERATEPARAM_ACTION({
        machineId: this.machine_id
      })
    },
    // 下发参数
    handleSet () {
      if (this.gameType !== '0' && this.gameType !== '1') {
        this.$toast.fail('没有选择游戏模式')
        return
      }
      if (!positiveIntegerRegularTool(this.gameWinningNumberValue) || this.gameWinningNumberValue > 99 || this.gameWinningNumberValue <= 0) {
        this.$toast.fail('获奖局数需在1~99区间内')
        return
      }
      if (!positiveIntegerRegularTool(this.palyTimePopupValue) || this.palyTimePopupValue > 99 || this.palyTimePopupValue < 10) {
        this.$toast.fail('游玩时间需在10~99区间内')
        return
      }
      const data = {}
      if (this.machine.main_board === '1') { // 武马行
        data.key22 = this.gameType
        data.award_count = this.gameWinningNumberValue
        data.await_music = this.awaitMusic ? '1' : '0'
      } else { // 花花世界
        data.key29 = this.gameType
        data.key32 = this.gameWinningNumberValue
      }
      this.loading = true
      data.game_time = this.palyTimePopupValue
      data.game_times_shutdown = this.gameTimesShutdown ? '1' : '0'
      data.power_times = this.powerTimes ? '1' : '0'
      data.sky_grab_thing = this.skyGrabThing ? '1' : '0'
      this.MACHINE_SETOPERATEPARAM_ACTION({
        machineId: this.machine_id,
        data
      }).then(res => {
        this.loading = false
        if (res.return_code === '0') {
          this.$toast.success('下发成功！')
          this.$router.push({
            name: 'machine_detail',
            query: {
              id: this.machine_id
            }
          })
          return
        }
        if (res.return_code !== '0') {
          this.$toast.fail(res.msg)
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
