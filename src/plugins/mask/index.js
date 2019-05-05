import { initZIndexReduce } from '../utils/initParams'
const Mask = {
  props: {
    maskPacity: {
      type: Number
    },
    maskColor: {
      type: String
    }
  },
  methods: {
    close () {
      this.$emit('trigger-close')
    }
  },
  render (h) {
    const styles = {
      opacity: this.maskPacity,
      backgroundColor: this.maskColor,
      zIndex: 1010 + initZIndexReduce()
    }
    const {
      close
    } = this
    return (
      <div class="hhf-plugins-mask" style={styles} onClick={close}></div>
    )
  }
}
export default Mask
