<!-- 游玩价格 -->
<template>
  <div class="play-price">
    <div class="padding-20-30">
      <div class="bgcolor-f radius-10">
        <van-cell-group>
          <HhfInput title="游玩单价（币）" v-model="coinsSell" placeholder="请输入"/>
        </van-cell-group>
      </div>
    </div>
    <div class="size-0 padding-20-30">
      <van-button size="large" :loading="loading" type="info" @click="handleSaveClick">保存</van-button>
    </div>
  </div>
</template>

<script>
import { CellGroup, Button } from 'vant'
import HhfInput from '@hhf/hhf-input'
import { mapState, mapActions } from 'vuex'
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
    'van-cell-group': CellGroup,
    'van-button': Button,
    HhfInput
  },
  methods: {
    ...mapActions(['MACHINE_SAVEPLAYPRICE_ACTION']),
    handleSaveClick () {
      this.loading = true
      const $this = this
      this.MACHINE_SAVEPLAYPRICE_ACTION({
        machineId: this.machine_id,
        coinsSell: this.coinsSell
      }).then(res => {
        $this.loading = false
        if (res.return_code === '0') {
          $this.$toast.success({
            message: '设置成功！',
            onClose () {
              $this.$router.push({
                name: 'machine_detail',
                query: {
                  id: $this.$route.query.id
                }
              })
            }
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
<style lang="stylus" scoped>
.play-price
  margin-top rems(20)
</style>
