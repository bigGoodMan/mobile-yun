<!-- 盘点单元格 -->
<template>
  <ul class="stock-taking-list">
    <li class="stock-taking-list-cell bgcolor-f">
      <div class="flex-row flex-between-center stock-taking-list-first">
        <span class="color-393d49 size-32">西溪印象城</span>
        <span class="color-error size-24">盘点中</span>
      </div>
      <div class="stock-taking-list-second size-28 color-393d49">
        <span>订单号：PD123123123</span>
      </div>
      <div class="stock-taking-list-third flex-row flex-between-center size-24 color-393d49">
        <span>
          盘盈<i class="color-success">2</i>个，盘亏<i class="color-error">3</i>个
        </span>
        <span>2018-10-10 12:00:00</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'stock_taking_list',

  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.stock-taking-list
  margin 0
  list-style none
  .stock-taking-list-cell
    padding rems(20)
    .stock-taking-list-first
      margin-bottom rems(20)
    .stock-taking-list-third
      margin-top rems(20)
</style>
