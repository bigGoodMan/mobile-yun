<!-- 底部弹窗 -->
<template>
  <div class="bottom-popup">
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="overlay"
      @click-overlay="handleClose"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @change="handleChange"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        :default-index="defaultIndex"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    columns: {
      default: () => ([]),
      type: Array
    },
    overlay: { // 是否展示蒙层 默认有
      default: true,
      type: Boolean
    },
    show: { //  是否展示popup
      default: false,
      type: Boolean
    },
    defaultIndex: Number
  },
  data () {
    return {
      loading: true // picker动画
    }
  },
  watch: {
    columns: {
      handler (val, oldVal) {
        this.loading = false
      }
    }
  },
  components: {
  },

  computed: {},

  methods: {
    // 取消
    handleCancel () {
      this.$emit('trigger-cancel')
      this.handleClose()
    },
    // 选中
    handleConfirm (value, index) {
      this.$emit('trigger-confirm', { value, index })
      this.handleClose()
    },
    handleClose () {
      this.$emit('trigger-close')
    },
    // 改变
    handleChange () {}
  },

  mounted () {
  }
}
</script>
<style lang="stylus" scoped></style>
