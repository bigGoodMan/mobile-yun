<!-- 我的区域 -->
<script>
import LinkageSelection from '@yun/linkage-selection'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MyArea',
  model: {
    prop: 'value',
    event: 'trigger-change'
  },
  props: {
    storeId: String,
    value: {
      default: ''
    },
    title: {
      type: String,
      default: '请选择区域'
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
    storeId: {
      handler (val) {
        if (val) {
          this.COMMON_GETAREA_ACTION({ storeId: val })
        }
      },
      immediate: true
    },
    areaList (list) {
      let hasArea = list.some(v => this.value === v.id)
      if (!hasArea) {
        this.$emit('trigger-change', null)
      }
    }
  },
  computed: {
    ...mapState({
      areaList: state => state.common.areaList
    })
  },

  methods: {
    ...mapActions(['COMMON_GETAREA_ACTION']),
    handleChoseArea (obj) {
      this.$emit('trigger-change', obj.value.id)
    }
  },

  mounted () {},
  render (h) {
    const {
      value,
      areaList,
      handleChoseArea,
      title
    } = this
    let val
    let defaultIndex = 0
    for (let i = 0; i < areaList.length; ++i) {
      if (areaList[i].id === value) {
        val = areaList[i].name
        defaultIndex = i
        break
      }
    }
    return (
      <LinkageSelection
        right-icon
        title={title}
        value={val}
        columns={areaList}
        default-index={defaultIndex}
        on-trigger-confirm={handleChoseArea}
      />
    )
  }
}
</script>
<style lang="stylus" scoped>
</style>
