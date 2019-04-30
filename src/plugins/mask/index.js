const Mask = {
  props: {
    maskPacity: {
      type: Number
    },
    maskColor: {
      type: String
    }
  }
  render () {
    const styles = {
      opacity: this.maskPacity,
      backgroundColor: this.maskColor
    }
    return (
      <div class="hhf-plugins-mask" style={styles}></div>
    )
  }
}
export default Mask