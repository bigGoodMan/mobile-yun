<!-- 预警参数 -->
<template>
  <div class="early-warning-parameters">
    <div class="padding-20-30">
      <div class="bgcolor-f radius-10">
        <van-cell-group>
          <van-field
    v-model="canClawNum"
    label="可抓取量"
    placeholder="请输入"
  />
          <!-- <HhfInput title="可抓取量" type="number" v-model="canClawNum" placeholder="请输入"/> -->
          <div class="border border-ebedf0"></div>
          <van-field
    v-model="canClawSafeNum"
    label="可抓取安全量"
    placeholder="请输入"
  />
          <!-- <HhfInput title="可抓取安全量" type="number" v-model="canClawSafeNum" placeholder="请输入"/> -->
        </van-cell-group>
      </div>
    </div>
    <div class="size-0 padding-20-30">
      <van-button size="large" type="info" :loading="loading" @click="handleSaveClick">保存</van-button>
    </div>
  </div>
</template>

<script>
// import HhfInput from '@hhf/hhf-input'
import { positiveIntegerRegularTool } from '@l/tools'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'early_warning_parameters',

  data () {
    return {
      canClawNum: '',
      canClawSafeNum: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      can_claw_num: state => state.machine.can_claw_num,
      can_claw_safe_num: state => state.machine.can_claw_safe_num,
      machine_id: state => state.machine.machine_id
    })
  },
  watch: {
    can_claw_num: {
      handler (val) {
        this.canClawNum = val
      },
      immediate: true
    },
    can_claw_safe_num: {
      handler (val) {
        this.canClawSafeNum = val
      },
      immediate: true
    }
  },
  components: {
    // HhfInput
  },
  methods: {
    ...mapActions(['MACHINE_SAVEEARLYPARAM_ACTION']),
    handleSaveClick () {
      if (!positiveIntegerRegularTool(this.canClawNum) || this.canClawNum < 1 || this.canClawNum > 999) {
        this.$toast.fail('可抓取量需在1~999区间内')
        return
      }
      if (!positiveIntegerRegularTool(this.canClawSafeNum) || this.canClawSafeNum > this.canClawNum - 0) {
        this.$toast.fail('可抓取安全量需大于等于1且小于等于可抓取量')
        return
      }
      this.loading = true
      const $this = this
      this.MACHINE_SAVEEARLYPARAM_ACTION({
        machineId: this.machine_id,
        canClawNum: this.canClawNum,
        canClawSafeNum: this.canClawSafeNum
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
</style>
