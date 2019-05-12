import PopupMenu from './PopupMenu'
import Vue from 'vue'

let instance
PopupMenu.createInstance = (properties = {}) => {
  const Instance = new Vue({ ...PopupMenu })
  const component = Instance.$mount()
  const parentDom = properties.elem || document.body
  parentDom.appendChild(component.$el)
  // const PpM = Instance.$children[0]
  // console.log(Instance, PpM)
  return {
    add (popupProp) {
      Instance.add(popupProp)
    },
    remove (keyName) {
      Instance.remove(keyName)
    },
    destroy () {
      this.remove()
      setTimeout(() => {
        parentDom.removeChild(component.$el)
      }, 500)
    }
  }
}
function createNewInstance (options) {
  instance = instance || PopupMenu.createInstance(options)
  return instance
}
export default createNewInstance
