<!-- 勾选选择框 -->
<template>
  <div class="hhf-ticket-selection-box" @click="handleClick">
      <span class="hhf-ticket-selection-box-font" :style="fontStyl">{{title}}</span>
      <div class="hhf-ticket" :style="ticketStyl">
        <span v-if="value">✔</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HhfTicketSelectionBox',
  model: {
    prop: 'value',
    event: 'trigger-change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    ticketColor: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {
    fontStyl () {
      return {
        color: this.value ? this.ticketColor : null
      }
    },
    ticketStyl () {
      return {
        color: this.ticketColor
      }
    }
  },

  methods: {
    handleClick () {
      console.log(111)
      this.$emit('trigger-change', !this.value)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.hhf-ticket-selection-box
  display flex
  flex-flow row nowrap
  justify-content space-between
  align-items center
  padding rems(20)
  background-color #ffffff
  font-size rems(40)
  height rems(40)
  .hhf-ticket-selection-box-font
    font-size rems(30)
</style>
