<!-- 根据门店和区域查询机台 -->
<script>
import LinkageSelection from '@yun/linkage-selection'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  name: 'MyArea',
  model: {
    prop: 'value',
    event: 'trigger-change'
  },
  props: {
    storeId: [String, Number],
    areaId: [String, Number],
    value: {
      default: ''
    },
    title: {
      type: String,
      default: '请选择机台'
    },
    columns: Array
  },
  data () {
    return {
    }
  },
  components: {
    LinkageSelection
  },
  watch: {
    areaId: {
      handler (val) {
        if (this.storeId && val) {
          this.COMMON_GETMACHINE_ACTION({ storeId: this.storeId, areaId: val }).then(res => {
            if (res.return_code === '0') {
              let hasMachine = this.machineList.some(v => v.id === this.value)
              if (!hasMachine) {
                this.$emit('trigger-change', null)
              }
            }
          })
        } else {
          this.COMMON_GETMACHINE_MUTATE([])
          this.$emit('trigger-change', null)
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      machineList: state => state.common.machineList,
      areaList: state => state.common.areaList
    }),
    paramId () {
      return {
        storeId: this.storeId,
        areaId: this.areaId
      }
    }
  },

  methods: {
    ...mapMutations(['COMMON_GETMACHINE_MUTATE']),
    ...mapActions(['COMMON_GETMACHINE_ACTION']),
    handleChoseArea (obj) {
      this.$emit('trigger-change', obj.value.id)
    }
  },

  mounted () {},
  render (h) {
    const {
      value,
      machineList,
      handleChoseArea,
      title
    } = this
    let val
    let defaultIndex = 0
    for (let i = 0; i < machineList.length; ++i) {
      if (machineList[i].id === value) {
        val = machineList[i].no
        defaultIndex = i
        break
      }
    }
    return (
      <LinkageSelection
        right-icon
        title={title}
        value={val}
        columns={machineList}
        default-index={defaultIndex}
        on-trigger-confirm={handleChoseArea}
      />
    )
  }
}
</script>
<style lang="stylus">
</style>
