import { initZIndexAdd } from '../utils/initParams'
import Mask from '../mask'
export default {
  props: {
    duration: {
      type: Number,
      default: 30
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    keyName: {
      type: String,
      required: true
    },
    classes: {
      type: String
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    mask: { // 是否有遮罩层
      type: Boolean,
      default: false
    },
    maskClose: { // 关闭遮罩层是否去除组件
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 去除当前组件
    close () {
      this.clearTimer()
      this.$emit('trigger-close', this.keyName)
    },
    maskClick () {
      if (this.maskClose) {
        this.close()
      }
    },
    // 清除计时器
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.clearTimer)
        this.timer = null
      }
    }
  },
  mounted () {
    this.clearTimer()
    if (this.duration !== 0) {
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration * 1000)
    }
  },
  beforeDestroy () {
    this.clearTimer()
    this.$emit('trigger-before-close') // 销毁组件之前的回调
  },
  destoryed () {
    this.$emit('trigger-after-close') // 销毁组件之后的回调
  },
  render (h) {
    const {
      $slots,
      transitionName,
      mask,
      maskClick
    } = this
    const wrapStyle = {
      'z-index': 1010 + initZIndexAdd(),
      ...this.styles
    }
    const className = [
      'hhf-plugins-popup',
      this.classes
    ]
    return (
      <div>
        {
          mask ? <Mask on={{ 'trigger-close': maskClick }} /> : null
        }
        <transition name={transitionName}>
          <div class={className} style={wrapStyle}>{$slots.default}</div>
        </transition>
      </div>
    )
  }
}
