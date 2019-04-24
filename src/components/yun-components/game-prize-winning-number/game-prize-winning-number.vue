<!-- 获奖局数弹窗 -->
<template>
  <van-popup
    v-model="show"
    @click-overlay="handleClose"
  >
    <div class="game-prize-winning-number">
      <h5 class="size-30 color-3 padding-20-30 game-prize-winning-number-title">获奖局数</h5>
      <div class="padding-20-30">
        <div class="flex-row flex-between-center">
          <input
            class="game-prize-winning-number-entry padding-0 margin-0 size-28"
            v-model="value"
            placeholder="请输入毛利率"
          />
          <p class="margin-0 color-3 size-28">获奖局数：<span class="color-ff5722 size-28">{{number}}</span></p>
        </div>
        <div class="border"></div>
        <p class="size-24 color-9 margin-0 game-prize-winning-number-tip">毛利=收入*毛利率，即若收入100元，期望利润为80元则 毛利率设80%</p>
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
import { Popup } from 'vant'
import popup from '@yun/mixins/popup'
export default {
  name: 'game_prize_winning_number',
  mixins: [popup],
  props: {
    number: {
      default: '',
      type: String
    }
  },
  components: {
    'van-popup': Popup
  }
}
</script>
<style lang="stylus" scoped>
.game-prize-winning-number
  width rems(700)
  .game-prize-winning-number-title
    margin 0
  .game-prize-winning-number-entry
    flex 1
    margin-right rems(20)
    border none
    height rems(60)
    line-height rems(60)
  .game-prize-winning-number-tip
    margin-top rems(20)
</style>
