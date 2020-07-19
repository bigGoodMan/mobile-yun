<!-- 复选框 -->
<!--<template>
  <label class="hhf-checkbox">
    <input
      class="hhf-checkbox-input"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @input="handleInput($event)"
    >
    <span :class="['hhf-checkbox-content', 'hhf-iconfont', checked ? 'hhf-icon-ticket' : null]"></span>
    <span class="hhf-checkbox-text">
      <slot></slot>
    </span>
  </label>
</template> -->

<script>
// export default {
//   name: 'hhf-checkbox',
//   model: {
//     prop: 'checked',
//     event: 'trigger-input'
//   },
//   props: {
//     checked: {
//       type: Boolean,
//       default: false
//     },
//     disabled: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data () {
//     return {
//     }
//   },
//   watch: {
//   },
//   components: {},

//   computed: {},

//   methods: {
//     handleInput (event) {
//       let checked = event.target.checked
//       this.$emit('trigger-input', checked)
//       console.log(this.checked)
//       this.handleChange(event)
//     },
//     handleChange (e) {
//       this.$emit('trigger-change', e)
//     }
//   },

//   mounted () {}
// }
export default {
  // functional: true,
  model: {
    prop: "checked",
    event: "trigger-input"
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isChecked: this.checked
    };
  },
  methods: {
    handeChange($event) {
      this.$emit("trigger-change", $event, this);
    }
  },
  render() {
    // console.log(context)
    // const {
    //   props: {
    //     disabled,
    //     checked },
    //   listeners
    // } = context
    const { isChecked, disabled } = this;
    return (
      <label class="hhf-checkbox">
        <input
          class="hhf-checkbox-input"
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          // onInput={(e) => { listeners['trigger-change'](e, context) }}
          onChange={$event => this.handeChange($event, this)}
        />
        <span
          class={[
            "hhf-checkbox-content",
            "hhf-iconfont",
            isChecked ? "hhf-icon-ticket" : null
          ]}
        ></span>
        <span class="hhf-checkbox-text">{this.$scopedSlots.default()}</span>
      </label>
    );
  }
};
</script>
<style lang="stylus">
.hhf-checkbox
  display flex
  flex-flow row nowrap
  justify-content flex-start
  align-items center
  position relative
  .hhf-checkbox-input
    display none
    &:disabled + .hhf-checkbox-content
      background-color #ebedf0
      border-color #c8c9cc
      color #c8c9cc
  .hhf-checkbox-content
    border-radius 50%
    border 1px solid #e5e5e5
    width 22px
    height 22px
    line-height 22px
    text-align center
    user-select none
    box-sizing border-box
    font-size 16px
    &.hhf-icon-ticket
      color #fff
      background-color #1989fa
      border-color #1989fa
  .hhf-checkbox-text
    margin-left 8px
</style>
