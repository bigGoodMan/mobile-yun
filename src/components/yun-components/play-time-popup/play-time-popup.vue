<!-- 游玩时间弹窗 -->
<template>
  <van-popup
    v-model="show"
    @click-overlay="handleClose"
  >
    <div class="play-time-popup">
      <h5 class="size-30 color-3 padding-20-30 play-time-popup-title">游玩时间</h5>
      <div class="padding-20-30">
        <div class="flex-row flex-start-stretch">
          <input
            class="play-time-popup-entry padding-0 margin-0 size-28"
            v-model="value"
            placeholder="请输入游玩时间10~99"
          />
        </div>
        <div class="border"></div>
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
  components: {
    'van-popup': Popup
  }
}
</script>
<style lang="stylus" scoped>
.play-time-popup
  width rems(700)
  .play-time-popup-title
    margin 0
  .play-time-popup-entry
    flex 1
    margin-right rems(20)
    border none
    height rems(60)
    line-height rems(60)
</style>
