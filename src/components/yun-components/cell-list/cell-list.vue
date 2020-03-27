<!-- 单元格列表 -->
<template>
  <div class="cell-list flex-row flex-between-center padding-20-30" @click="handleClick">
    <div class="cell-list-title size-28 color-3">
      {{$slots['title'] ? null : title}}
      <slot name="title"></slot>
    </div>
    <div class="size-28 flex-row flex-start-center">
      <span class="cell-list-placeholder" v-if="placeholder && !value">{{placeholder}}</span>
      <span v-else>{{value}}</span>
      <van-icon v-if="rightIcon" color="#969799" name="arrow" class="flex-row flex-center margin-left-10 size-32" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CellList',
  props: {
    title: String,
    value: String,
    placeholder: String,
    leftIcon: {
      type: Boolean,
      default: false
    },
    rightIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {
    handleClick (e) {
      this.$emit('trigger-click', e)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.cell-list
  &:active
    background-color #e8e8e8
.cell-list-placeholder
  color #cacaca
</style>
