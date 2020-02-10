<!-- 游玩价格 -->
<template>
  <div class="play-price">
    <div class="padding-20-30">
      <div class="bgcolor-f radius-10">
        <div class="padding-20-30">
          <HhfInput
            title="游玩单价（币）："
            type="tel"
            class="color-input"
            v-model="coinsSell"
            position="left"
            placeholder="会员价（默认）"
          >
          <template #end>
            <span class="size-28 color-7">会员价（默认）</span>
          </template>
          </HhfInput>
        </div>
        <div class="border border-ebedf0"></div>
        <div class="padding-20-30">
          <HhfInput
            title="游玩单价（币）："
            type="tel"
            v-model="coinSellVip"
            class="color-input"
            position="left"
            placeholder="非会员价"
          >
          <template #end>
            <span class="size-28 color-7">非会员价</span>
          </template>
          </HhfInput>
        </div>
      </div>
      <ul class="no-ul size-22 color-7">
        <li class="padding-10-0">会员/非会员：嗨皮主板</li>
        <li class="padding-10-0">正常充值嗨币、购买小票的默认设置会员价（不使用神采消费卡）</li>
        <li class="padding-10-0">使用神采消费卡区分：会员/非会员价格</li>
      </ul>
    </div>
    <div class="size-0 padding-20-30">
      <van-button size="large" :loading="loading" type="info" @click="handleSaveClick">保存</van-button>
    </div>
  </div>
</template>

<script>
// import HhfInput from '@hhf/hhf-input'
import { mapState, mapActions } from 'vuex'
import HhfInput from '@hhf/hhf-input'
import { positiveIntegerRegularTool } from '@l/tools'
export default {
  name: 'play_price',

  data () {
    return {
      coinsSell: '',
      coinSellVip: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      coins_sell: state => state.machine.coins_sell,
      machine_id: state => state.machine.machine_id,
      coins_sell_vip: state => state.machine.coins_sell_vip
    })
  },
  watch: {
    coins_sell: {
      handler (val) {
        this.coinsSell = val
      },
      immediate: true
    },
    coins_sell_vip: {
      handler (val) {
        this.coinSellVip = val
      },
      immediate: true
    }
  },
  components: {
    HhfInput
  },
  methods: {
    ...mapActions(['MACHINE_SAVEPLAYPRICE_ACTION']),
    handleSaveClick () {
      if (!positiveIntegerRegularTool(this.coinsSell) || this.coinsSell < 1 || this.coinsSell > 99) {
        this.$Tip.warning('游玩单价需在1~99区间内')
        return
      }
      this.loading = true
      const $this = this
      this.MACHINE_SAVEPLAYPRICE_ACTION({
        machineId: this.machine_id,
        coinsSell: this.coinsSell,
        coinSellVip: this.coinSellVip
      }).then(res => {
        $this.loading = false
        if (res.return_code === '0') {
          $this.$dialog.alert({
            message: '游玩单价设置成功，手动重启机台后生效'
          }).then(() => {
            $this.$router.push({
              name: 'machine_detail',
              query: {
                mid: $this.$route.query.mid
              }
            })
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
    if (!this.machine_id) {
      const { mid } = this.$route.query
      this.$router.push({
        name: 'machine_detail',
        query: { mid }
      })
    }
  }
}
</script>
<style lang="stylus">
.play-price {
  margin-top: rems(20);

  .play-price-entry {
    .van-field__label {
      max-width: none;
      white-space: nowrap;
      flex: none;
    }
  }
}
</style>
