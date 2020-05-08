<!-- 根据门店和区域查询机台 -->
<script>
import LinkageSelection from '@yun/linkage-selection'
import { mapActions } from 'vuex'
export default {
  name: 'MyMachine',
  model: {
    prop: 'value',
    event: 'trigger-change'
  },
  props: {
    storeId: [String, Number],
    areaId: [String, Number],
    value: {
      default: () => ({})
    },
    title: {
      type: String,
      default: '请选择机台'
    },
    type: {
      type: String,
      default: 'MACHINE',
      validator (val) {
        return ['MACHINE', 'MACHINE_TYPE'].includes(val)
      }
    },
    rightIcon: {
      type: String,
      default: 'arrow'
    },
    columns: Array
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    LinkageSelection
  },
  watch: {
    areaId: {
      handler (val) {
        const { storeId, type } = this
        if (storeId && val) {
          let jsons = { storeId, areaId: val }
          if (type === 'MACHINE_TYPE') {
            this.COMMON_GETMACHINETYPE_ACTION(jsons).then(this.handleReturnDeal)
            return
          }
          this.COMMON_GETMACHINE_ACTION(jsons).then(this.handleReturnDeal)
        } else {
          this.list = []
          this.$emit('trigger-change', {})
        }
      },
      immediate: true
    }
  },

  methods: {
    ...mapActions(['COMMON_GETMACHINE_ACTION', 'COMMON_GETMACHINETYPE_ACTION']),
    handleChoseMachine (obj) {
      this.$emit('trigger-change', obj.value)
    },
    handleReturnDeal (res) {
      if (res.return_code === '0') {
        const { data } = res
        this.list = data
        this.$emit('trigger-change', {})
      }
    }
  },

  mounted () {},
  render (h) {
    const {
      value,
      list,
      handleChoseMachine,
      title,
      rightIcon
    } = this
    let val
    let defaultIndex = 0
    for (let i = 0; i < list.length; ++i) {
      if (list[i].id === value.id) {
        val = list[i].no
        defaultIndex = i
        break
      }
    }
    return (
      <LinkageSelection
        right-icon={rightIcon}
        title={title}
        value={val}
        columns={list}
        default-index={defaultIndex}
        on-trigger-confirm={handleChoseMachine}
      />
    )
  }
}
</script>
<style lang="stylus">
</style>
