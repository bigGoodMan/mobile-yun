// import Mask from '../mask'
import createNewInstance from '../popup-menu'
// import initParams from '../uitls/initParams'
// import Vue from 'vue'
// let instance
// function createInstance () {
//   instance = instance || PopupMenu.createInstance()
//   return instance
// }
function loading (options = {}) {
  let newInstance = createNewInstance(options)
  if (options.type === 'close') {
    newInstance.remove(options.message)
    return
  }
  const {
    message
  } = options
  let opt = {
    ...options,
    name: 'plugins_tip',
    Content: {
      props: {
        mask: {
          type: Boolean,
          default: false
        }
      },
      methods: {
      },
      render (h, context) {
        // let color
        return (
          <div class="size-30 hhf-plugins-loading">
            <div class="loader">
              <div class="loader_overlay"></div>
              <div class="loader_cogs">
                <div class="loader_cogs__top">
                  <div class="top_part"></div>
                  <div class="top_part"></div>
                  <div class="top_part"></div>
                  <div class="top_hole"></div>
                </div>
                <div class="loader_cogs__left">
                  <div class="left_part"></div>
                  <div class="left_part"></div>
                  <div class="left_part"></div>
                  <div class="left_hole"></div>
                </div>
                <div class="loader_cogs__bottom">
                  <div class="bottom_part"></div>
                  <div class="bottom_part"></div>
                  <div class="bottom_part"></div>
                  <div class="bottom_hole"></div>
                </div>
                <p>{message}</p>
              </div>
            </div>
          </div>
        )
      }
    }
  }
  opt.duration = 0
  opt.position = opt.position || 'center'
  opt.transitionName = opt.transitionName || 'fade'
  opt.transitionName = `hhf-plugins-${opt.transitionName}`
  newInstance.add(opt)
}
['close'].forEach(item => {
  loading[item] = (options) => {
    let opt = {}
    if (typeof options === 'object') {
      opt = {
        type: item,
        ...options
      }
    } else {
      opt = {
        type: item,
        message: options
      }
    }
    loading(opt)
  }
})
export default loading
