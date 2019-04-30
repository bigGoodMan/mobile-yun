import CancelConfirmBtn from '@yun/cancel-confirm-btn'
let myMixin = {
  model: {
    event: 'trigger-confirm'
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    value: {
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  components: {
    CancelConfirmBtn
  },

  computed: {},

  methods: {
    handleConfirm () {
      this.$emit('trigger-confirm', this.value)
      this.handleClose()
    },
    handleCancel () {
      this.handleClose()
    },
    // 关闭
    handleClose () {
      this.$emit('trigger-close')
    }
  }
}
export default myMixin
