<!-- 单元格选择器 -->
<template>
  <div>
    <div>
      <van-cell
        :title="title"
        :value="value"
        is-link
        @click="show = true"
      />
    </div>
    <BottomPopup
      :columns="columns"
      :show="show"
      @trigger-confirm="handleConfirm"
      @trigger-close="show = false"
    />
  </div>
</template>

<script>
import BottomPopup from '@yun/bottom-popup'
export default {
  name: 'cell_picker',
  props: {
    title: String,
    value: [String, Number],
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      show: false
    }
  },

  components: {
    BottomPopup
  },

  computed: {},

  methods: {
    handleConfirm (obj) {
      this.$emit('trigger-confirm', obj.value[0])
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped></style>
