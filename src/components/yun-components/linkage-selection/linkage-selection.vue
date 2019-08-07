<!-- 联动选择 -->
<template>
  <div>
    <CellList
      :title="title"
      :value="value"
      :right-icon="rightIcon"
      :placeholder="placeholder"
      @trigger-click="frontBackShow = true"
    >
    <template v-if="$slots.title" v-slot:title>
      <slot name="title"></slot>
    </template>
    </CellList>

    <BottomPopup :columns="columns" :show="show" @trigger-confirm="handleConfirm(obj)" @trigger-close="show = false" />
  </div>
</template>

<script>
import CellList from '@yun/cell-list'
import BottomPopup from '@yun/bottom-popup'
export default {
  name: 'LinkageSelection',
  model: {
    prop: 'value',
    event: 'trigger-confirm'
  },
  props: {
    value: {
      default: ''
    },
    title: String,
    placeholder: String,
    columns: Array,
    rightIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false
    }
  },

  components: {
    CellList,
    BottomPopup
  },

  computed: {},

  methods: {
    handleConfirm (obj) {
      this.$emit('trigger-confirm', obj)
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped></style>
