<!-- 输入框 -->
<template>
  <div class="hhf-input">
    <div class="flex-row flex-between-center">
      <div class="hhf-input-left">
        <slot name="start"></slot>
        <div class="size-28 color-3 hhf-input-left-title">
          {{ $slots["title"] ? null : title }}
          <slot name="title"></slot>
        </div>
      </div>
      <div class="hhf-input-right">
        <div
          :class="[
            'hhf-input-content size-28',
            width ? null : 'flex-1',
            border ? 'border' : null
          ]"
          :style="getInputStyle"
        >
          <slot v-if="$slots['content']" name="content"></slot>
          <input
            v-else
            :maxlength="maxlength"
            :type="type"
            :style="{ 'text-align': position }"
            :value="value"
            :class="['hhf-input-entry', inputClass]"
            :placeholder="placeholder"
            @input="$emit('trigger-input', $event.target.value)"
            @focus="handleFocus"
            @blur="$emit('trigger-blur', $event.target.value)"
          />
        </div>
        <template>
          <span v-if="suffix" class="size-28 color-3 padding-left-10">{{
            suffix
          }}</span>
          <slot name="suffix"></slot>
        </template>
      </div>
    </div>
    <template>
      <div
        v-if="errorText !== void 0"
        class="color-error size-20 height-err"
        :style="errorStyle"
      >
        {{ errorText }}
      </div>
      <slot name="end"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: "HhfInput",
  components: {},
  model: {
    prop: "value",
    event: "trigger-input"
  },
  props: {
    value: {
      default: ""
    },
    placeholder: String,
    position: {
      default: "right",
      type: String
    },
    leftIcon: {
      default: "",
      type: String
    },
    rightIcon: {
      default: "",
      type: String
    },
    suffix: {
      type: String,
      default: ""
    },
    title: {
      default: "",
      type: String
    },
    width: {
      type: String
    },
    border: {
      type: Boolean,
      default: false
    },
    inputStyle: {
      type: String || Object,
      default: ""
    },
    errorStyle: {
      type: String || Object,
      default: ""
    },
    errorText: {
      type: String
    },
    inputClass: [String, Array],
    maxlength: Number,
    type: {
      default: "text",
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["text", "number", "tel"].includes(value);
      }
    }
  },
  data() {
    return {};
  },

  computed: {
    getInputStyle() {
      if (typeof this.inputStyle === "string") {
        const width = this.width ? `width:${this.width};` : "";
        return `${this.inputStyle}${width}`;
      } else if (typeof this.inputStyle === "object") {
        return {
          ...this.inputStyle,
          width: this.width
        };
      }
      return {
        width: this.width
      };
    }
  },
  mounted() {},

  methods: {
    handleFocus(e) {
      // if (this.type === 'number') {
      //   return
      // }
      if (
        /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) &&
        !/(Win32)/i.test(navigator.platform)
      ) {
        // 移动端
        const target = e.target;
        if (target.setSelectionRange) {
          // 火狐
          target.setSelectionRange(target.value.length, target.value.length); // 将光标定位在textarea的开头，需要定位到其他位置的请自行修改
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
  }
};
</script>
<style lang="stylus">
.hhf-input
.hhf-input-left-title
  padding-right rems(10)
.hhf-input-right
  display flex
  flex-flow row nowrap
  justify-content flex-start
  align-items center
  flex 1
  font-size 0
.hhf-input-entry
  border 0
  padding 0
  margin 0
  width 100%
  height rems(48)
</style>
