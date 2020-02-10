import CancelConfirmBtn from '@yun/cancel-confirm-btn'
let myMixin = {
  model: {
    event: 'trigger-close',
    prop: 'show'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      val: '',
      loading: false
    }
  },
  components: {
    CancelConfirmBtn
  },
  watch: {
    value: {
      handler (val, oldVal) {
        this.val = val
      }
    }
  },
  computed: {},

  methods: {
    handleConfirm () {
      this.$emit('trigger-confirm', this.val)
      this.handleClose()
    },
    handleCancel () {
      this.$emit('trigger-cancel', this.val)
      this.handleClose()
    },
    // 关闭
    handleClose () {
      this.$emit('trigger-close', false)
    }
  }
}
export default myMixin
