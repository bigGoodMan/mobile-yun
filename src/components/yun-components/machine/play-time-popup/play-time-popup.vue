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
            type="number"
            v-model="value"
            placeholder="请输入游玩时间10~99"
          />
        </div>
        <div class="border"></div>
      </div>
      <div class="validator color-ff0000 size-28 text-right">{{validatorContent}}</div>
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
export default {
  name: 'game_prize_winning_number',
  mixins: [popup],
  data () {
    return {
      validatorContent: ''
    }
  },
  components: {
  },
  watch: {
    value () {
      if (/(^[1-9]{1}[0-9]{1}$)|100$/.test(this.value)) {
        this.validatorContent = ''
      } else {
        this.validatorContent = '格式不正确'
      }
    }
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
  .validator
    padding 0 rems(20)
    height rems(30)
</style>
