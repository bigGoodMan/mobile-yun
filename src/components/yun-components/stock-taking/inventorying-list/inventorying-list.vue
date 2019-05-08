<!-- 盘点中列表 -->
<template>
  <div class="bgcolor-f inventorying-list">
    <div class="inventorying-list-cell">
      <div class="size-0 flex-row flex-start">
        <div class="inventorying-list-cell-img bgcolor-f2 flex-row flex-center">
          <img
            class="inventorying-list-cell-img-content"
            v-lazy="img"
          >
        </div>
        <div class="inventorying-list-describe flex-column flex-start size-393d49">
          <span class="weight-bold size-32 inventorying-list-describe-name">30cm超级大猩猩</span>
          <span class="size-28">编号12999</span>
        </div>
      </div>
      <div class="flex-row flex-between-center">
        <div class="size-28 size-393d49">所在库位：<span>未标记库位</span></div>
        <div class="flex-row flex-center">
          <span class="size-28 size-393d49 inventorying-list-text">实盘数</span>
          <van-stepper
            v-model="value"
            integer
            :min="0"
            :max="999"
            :step="1"
            @change="handleChange"
          />
        </div>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
export default {
  name: 'inventorying_list',

  data () {
    return {
      initValue: 0,
      value: 0,
      img: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },

  components: {},

  computed: {},

  methods: {
    handleClearTime () {
      clearTimeout(this.timer)
      this.timer = null
    },
    handleChange (val) {
      this.handleClearTime()
      this.timer = setTimeout(() => {

      }, 500)
    }
  },

  mounted () {
    // console.log(this.$refs['img'].getBoundingClientRect())
  },
  beforeDestroy () {
    this.handleClearTime()
  }
}
</script>
<style lang="stylus" scoped>
.inventorying-list
  .inventorying-list-cell
    padding rems(20)
    .inventorying-list-cell-img
      width rems(150)
      height rems(150)
      .inventorying-list-cell-img-content
        max-width 100%
        max-height 100%
    .inventorying-list-describe
      padding-left rems(20)
      .inventorying-list-describe-name
        padding-bottom rems(20)
    .inventorying-list-text
      margin-right rems(10)
</style>
