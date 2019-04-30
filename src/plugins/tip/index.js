// import Mask from '../mask'
import PopupMenu from '../popup-menu'
// import initParams from '../uitls/initParams'
// import Vue from 'vue'
// let instance
const TipPopup = {
  props: {
    mask: {
      type: Boolean,
      default: false
    }
  },
  render (h, context) {
    return (
      <div class="size-30">这是提示</div>
    )
  }
}
export default () => <PopupMenu go="11"><TipPopup/></PopupMenu>
