<!-- 输入框 -->
<template>
  <div class="hhf-input flex-row flex-between-center">
    <div class="hhf-input-left">
      <slot name="start"></slot>
      <div class="size-28 color-3 hhf-input-left-title">
        {{$slots['title'] ? null : title}}
        <slot name="title"></slot>
      </div>
    </div>
    <div class="hhf-input-right">
      <div class="hhf-input-content size-28">
        <slot
          v-if="$slots['content']"
          name="content"
        ></slot>
        <input
          v-else
          :maxlength="maxlength"
          :type="type"
          :style="{'text-align': position}"
          :value="value"
          :class="['hhf-input-entry', inputClass]"
          @input="$emit('trigger-input', $event.target.value)"
          :placeholder="placeholder"
          @focus="handleFocus"
          @blur="$emit('trigger-blur', $event.target.value)"
        />
      </div>
      <slot name="end"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hhf_input',
  model: {
    prop: 'value',
    event: 'trigger-input'
  },
  props: {
    value: {
      default: ''
    },
    placeholder: String,
    position: {
      default: 'right',
      type: String
    },
    leftIcon: {
      default: '',
      type: String
    },
    rightIcon: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    inputClass: [String, Array],
    maxlength: Number,
    type: {
      default: 'text',
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['text', 'number', 'tel'].includes(value)
      }
    }
  },
  data () {
    return {
    }
  },
  components: {},

  computed: {},

  methods: {
    handleFocus (e) {
      // if (this.type === 'number') {
      //   return
      // }
      if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { // 移动端
        let target = e.target
        if (target.setSelectionRange) { // 火狐
          target.setSelectionRange(target.value.length, target.value.length) // 将光标定位在textarea的开头，需要定位到其他位置的请自行修改
        // target.focus()
        }
      }
      //  else if (target.createTextRange) { // ie
      //   var rtextRange = target.createTextRange()
      //   rtextRange.moveStart('character', target.value.length)
      //   rtextRange.collapse(true)
      //   rtextRange.select()
      // }
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus">
.hhf-input
.hhf-input-left-title
  padding-right rems(10)
.hhf-input-right
  flex 1
  font-size 0
.hhf-input-content
  flex 1
.hhf-input-entry
  border 0
  padding 0
  margin 0
  width 100%
  height rems(48)
</style>
