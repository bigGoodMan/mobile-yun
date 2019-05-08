<!-- 盘点礼品列表 -->
<template>
  <div class="bgcolor-f2 inventory-gift-list">
    <div v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="item">
      <div class="flex-row flex-between-stretch padding-20-30 bgcolor-f">
        <div class="flex-row flex-start-stretch">
          <div class="inventory-gift-list-img">
            <img class="inventory-gift-list-img-content" v-lazy="img" />
          </div>
          <ul class="flex-column flex-between-start color-393d49">
            <li class="size-30 weight-bold">30cm大猩猩</li>
            <li class="size-28">编号121312</li>
            <li class="size-28">A区-1</li>
          </ul>
        </div>
        <ul class="flex-column flex-between-end">
          <li class="size-28 weight-bold">库存量<i class="padding-left-10 color-error">10</i></li>
          <li class="size-28">实盘数<i class="padding-left-10 color-393d49">17</i></li>
          <li class="size-24">差异<i class="padding-left-10 color-error">+7</i></li>
        </ul>
      </div>
      <div class="border"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      img: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.inventory-gift-list
  .inventory-gift-list-img
    width rems(150)
    height rems(150)
    .inventory-gift-list-img-content
      max-width 100%
      max-height 100%
</style>
