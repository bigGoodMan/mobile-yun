<!-- 底部弹窗 -->
<template>
  <div class="bottom-popup">
    <van-popup
      v-model="show"
      position="bottom"
      :overlay="overlay"
    >
      <van-picker
        show-toolbar
        :loading="loading"
        :columns="columns"
        @change="handleChange"
        @cancel="handleCancel"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Popup, Picker } from 'vant'
export default {
  name: '',
  props: {
    columns: {
      default: () => ([])
    },
    overlay: { // 是否展示蒙层 默认有
      default: true,
      type: Boolean
    }
  },
  data () {
    return {
      show: false, // 是否展示popup
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
    'van-picker': Picker,
    'van-popup': Popup
  },

  computed: {},

  methods: {
    // 取消
    handleCancel () {
      this.show = false
    },
    // 选中
    handleConfirm (value, index) {
      this.$emit('trigger-confirm', { value, index })
      this.show = false
    },
    // 改变
    handleChange () {}
  },

  mounted () {
  }
}
</script>
<style lang="stylus" scoped></style>
