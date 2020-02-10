<!-- 获奖局数弹窗 -->
<template>
  <van-popup v-model="show" @click-overlay="handleCancel" :close-on-click-overlay="false">
    <div class="game-prize-winning-number">
      <h5 class="size-30 color-3 padding-20-30 game-prize-winning-number-title">获奖局数</h5>
      <div class="padding-20-30">
        <div class="flex-row flex-between-center">
          <input
            class="game-prize-winning-number-entry padding-0 margin-0 size-28"
            :value="profit"
            @input="handleProfitInput"
            placeholder="请输入毛利率"
          />
          <span class="size-28 color-3 text-left flex-1">%</span>
          <p class="margin-0 color-3 size-28">
            获奖局数：
            <input
              class="game-prize-winning-number-entry padding-0 margin-0 size-28 color-ff5722"
              :value="awardValue"
              @input="handleAwardInput"
              placeholder="获奖局数"
            />
          </p>
        </div>
        <div class="border"></div>
        <div
          class="game-prize-winning-number-validator color-ff0000 size-28 text-right"
        >{{validatorContent}}</div>
        <p
          class="size-24 color-9 margin-0 game-prize-winning-number-tip"
        >毛利=收入*毛利率，即若收入100元，期望利润为80元则 毛利率设80%</p>
      </div>
      <CancelConfirmBtn
        @trigger-confirm="handleConfirm"
        @trigger-cancel="handleCancel"
        :loading="loading"
      />
    </div>
  </van-popup>
</template>

<script>
import popup from '@yun/mixins/popup'
import { positiveIntegerRegularTool, debounce } from '@l/tools'
export default {
  name: 'game_prize_winning_number',
  mixins: [popup],
  props: {
    // number: { // 游玩局数
    //   default: '',
    //   type: String
    // },
    awardCount: {
      // 游玩单价
      default: '',
      type: String
    },
    coinsSell: { // 游玩单价
      default: '0',
      type: String
    },
    moneyCost: { // 礼品成本
      default: '0',
      type: String
    },
    coinsValue: { // 平台币值
      default: '0',
      type: String
    },
    defaultEarnRate: { // 毛利率
      default: '0',
      type: [String, Number]
    }
  },
  data () {
    return {
      awardValue: '', // 获奖局数
      validatorContent: '',
      profit: '',
      loading: false
    }
  },
  watch: {
    awardCount (val) {
      this.awardValue = val
    },
    defaultEarnRate: {
      handler (val) {
        this.profit = val
      },
      immediate: true
    }
  },
  components: {
  },
  methods: {
    handleProfitInput: debounce({ callback: function (event) {
      const val = event.target.value
      this.profit = val
      let awardValue = Math.ceil(this.moneyCost / (this.coinsSell * this.coinsValue * (1 - val / 100)))
      this.awardValue = awardValue
      if (!positiveIntegerRegularTool(val) || val <= 0 || val >= 100) {
        this.validatorContent = '毛利率超出限制（1~99整数），请修改毛利率'
        return
      }
      if (!positiveIntegerRegularTool(this.awardValue) || this.awardValue <= 0 || this.awardValue > 99) {
        this.validatorContent = '获奖局数超出限制（1~99整数），请修改毛利率'
        return
      }
      this.validatorContent = ''
    }
    }),
    handleAwardInput: debounce({ callback: function (event) {
      const val = event.target.value
      this.awardValue = val
      let profit = ((1 - this.moneyCost / val / this.coinsSell / this.coinsValue) * 100) | 0
      this.profit = profit
      if (!positiveIntegerRegularTool(val) || val <= 0 || val >= 100) {
        this.validatorContent = '获奖局数超出限制（1~99整数），请修改获奖局数'
        return
      }
      if (!positiveIntegerRegularTool(profit) || profit < 0 || profit >= 100) {
        this.validatorContent = '毛利率超出限制（1~99整数），请修改获奖局数'
        return
      }
      this.validatorContent = ''
    }
    }),
    // handleAwardInput () {},
    handleConfirm () {
      if (this.validatorContent) {
        this.$Tip.warning(this.validatorContent)
        return
      }
      this.$emit('trigger-confirm', this.awardValue)
      this.$emit('trigger-change-profit', this.profit)
      this.handleClose()
    },
    handleReset () {
      this.profit = this.defaultEarnRate
      this.awardValue = this.awardCount
      this.validatorContent = ''
    },
    handleCancel () {
      this.handleReset()
      this.handleClose()
    }
  }
}
</script>
<style lang="stylus" scoped>
.game-prize-winning-number {
  width: rems(700);

  .game-prize-winning-number-title {
    margin: 0;
  }

  .game-prize-winning-number-entry {
    margin-right: rems(20);
    border: none;
    height: rems(60);
    line-height: rems(60);
    width: rems(200);
  }

  .game-prize-winning-number-tip {
    margin-top: rems(20);
  }

  .game-prize-winning-number-validator {
    height: rems(30);
  }
}
</style>
