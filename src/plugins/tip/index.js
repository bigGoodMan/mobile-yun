// import Mask from '../mask'
import PopupMenu from '../popup-menu'
// import initParams from '../uitls/initParams'
// import Vue from 'vue'
let instance
function createInstance () {
  instance = instance || PopupMenu.createInstance()
  return instance
}
function tip (options) {
  let tipInstance = createInstance()
  options = {
    name: 'plugins_tip',
    Content: {
      props: {
        mask: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        handleClick () {
          this.$emit('trigger-confirm')
        }
      },
      render (h, context) {
        const {
          handleClick
        } = this.handleClick
        return (
          <div class="size-30" onClick={handleClick}>{options.type}</div>
        )
      }
    },
    ...options
  }
  tipInstance.add(options)
}
export default {
  name: 'tip',

  info (options) {
    return this.tip({ type: 'info', ...options })
  },
  success (options) {
    return this.tip({ type: 'success', ...options })
  },
  warning (options) {
    return this.tip({ type: 'warning', ...options })
  },
  error (options) {
    return this.tip({ type: 'error', ...options })
  },
  tip (options) {
    return tip(options)
  }
}
