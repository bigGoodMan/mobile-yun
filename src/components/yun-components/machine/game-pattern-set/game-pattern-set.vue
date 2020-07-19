<!-- 游戏模式设置 -->
<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    @click-overlay="handleClose"
  >
    <div class="game-pattern-set size-30">
      <h5 class="size-30 color-3 padding-20-30 game-pattern-set-title">
        模式设置
      </h5>
      <van-radio-group v-model="val">
        <div class="padding-20-30">
          <van-radio name="0">固定（即固定第N局获奖）</van-radio>
        </div>
        <div class="padding-20-30">
          <van-radio name="1">随机（即N局内随机一局获奖）</van-radio>
        </div>
      </van-radio-group>
      <CancelConfirmBtn
        :loading="loading"
        @trigger-confirm="handleConfirm"
        @trigger-cancel="handleClose"
      />
    </div>
  </van-popup>
</template>

<script>
import popup from "@yun/mixins/popup";
export default {
  name: "GamePatternSet",
  mixins: [popup],
  props: {
    gameType: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="stylus" scoped>
.game-pattern-set
  width rems(700)
  .game-pattern-set-title
    margin 0
  .game-pattern-set-cancel
    margin-right rems(30)
  .game-pattern-set-btn
    height rems(60)
    line-height rems(60)
</style>
