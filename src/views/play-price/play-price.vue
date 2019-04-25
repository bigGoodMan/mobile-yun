<!-- 游玩价格 -->
<template>
  <div class="play-price">
    <div class="padding-20-30">
      <div class="bgcolor-f radius-10">
        <van-cell-group>
          <van-field
            v-model="coinsSell"
            placeholder="请输入"
            class="play-price-entry"
          >
          <template v-slot:label>
            <div>游玩单价（币）</div>
          </template>
          </van-field>
          <!-- <HhfInput type="number" title="游玩单价（币）" v-model="coinsSell" placeholder="请输入"/> -->
        </van-cell-group>
      </div>
    </div>
    <div class="size-0 padding-20-30">
      <van-button
        size="large"
        :loading="loading"
        type="info"
        @click="handleSaveClick"
      >保存</van-button>
    </div>
  </div>
</template>

<script>
// import HhfInput from '@hhf/hhf-input'
import { mapState, mapActions } from 'vuex'
import { positiveIntegerRegularTool } from '@l/tools'
export default {
  name: 'play_price',

  data () {
    return {
      coinsSell: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      coins_sell: state => state.machine.coins_sell,
      machine_id: state => state.machine.machine_id
    })
  },
  watch: {
    coins_sell: {
      handler (val) {
        this.coinsSell = val
      },
      immediate: true
    }
  },
  components: {
    // HhfInput
  },
  methods: {
    ...mapActions(['MACHINE_SAVEPLAYPRICE_ACTION']),
    handleSaveClick () {
      if (!positiveIntegerRegularTool(this.coinsSell) || this.coinsSell < 1 || this.coinsSell > 99) {
        this.$toast.fail('游玩单价需在1~99区间内')
        return
      }
      this.loading = true
      const $this = this
      this.MACHINE_SAVEPLAYPRICE_ACTION({
        machineId: this.machine_id,
        coinsSell: this.coinsSell
      }).then(res => {
        $this.loading = false
        if (res.return_code === '0') {
          $this.$dialog.alert({
            message: '游玩单价设置成功，手动重启机台后生效'
          }).then(() => {
            $this.$router.push({
              name: 'machine_detail',
              query: {
                id: $this.$route.query.id
              }
            })
          })
          return
        }
        if (res.return_code !== '0') {
          $this.$toast.fail(res.msg)
        }
      })
    }
  },
  created () {
    if (!this.machine_id) {
      const { id } = this.$route.query
      this.$router.push({
        name: 'machine_detail',
        query: { id }
      })
    }
  }
}
</script>
<style lang="stylus">
.play-price
  margin-top rems(20)
  .play-price-entry
    .van-field__label
      max-width none
      white-space nowrap
      flex none
</style>
