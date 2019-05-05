import Popup from './Popup'
import { initKeyAdd } from '../utils/initParams'
// let defaultOptions = {}
const PopupMenu = {
  name: 'hhf-plugins-popup-menu',
  data () {
    return {
      popupArr: []
    }
  },
  methods: {
    add (popupProp) {
      // popupProp.keyName = initKeyAdd('popup_menu')
      this.popupArr = []
      popupProp.keyName = popupProp.keyName || initKeyAdd(popupProp.name)
      this.popupArr.push(popupProp)
    },
    remove (keyName) {
      this.popupArr = this.popupArr.filter(v => v.keyName !== keyName)
    },
    btnClick (keyName, callback = () => {}) {
      this.remove(keyName)
      callback(keyName)
    }
  },
  render (h, context) {
    const popupNodes = this.popupArr.map(v => {
      const {
        Content,
        confrim,
        cancel,
        close,
        keyName,
        notConfrimClose, // 确认按钮是否要关闭
        duration,
        transitionName,
        classes,
        styles,
        mask,
        maskClose // 关闭遮罩层是否去除组件
      } = v
      const key = keyName
      const popupProps = {
        key,
        props: {
          duration,
          transitionName,
          classes,
          styles,
          mask,
          maskClose, // 关闭遮罩层是否去除组件
          keyName
        },
        on: {
          'trigger-close': (keyname) => this.btnClick(keyname, close)
        }
      }
      const contentProps = {
        on: {
          'trigger-confrim': notConfrimClose ? null : () => this.btnClick(keyName, confrim),
          'trigger-cancel': () => this.btnClick(keyName, cancel)
        }
      }
      return (
        <Popup {...popupProps}>
          <Content {...contentProps} />
        </Popup>
      )
    })
    return (
      <div class="hhf-plugins-popup-menu">
        {popupNodes}
      </div>
    )
  }
}
export default PopupMenu
