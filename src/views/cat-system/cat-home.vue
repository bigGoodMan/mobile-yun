<!--  -->
<template>
  <div class="cat-home flex-column flex-start-center">
    <van-grid :gutter="10" :column-num="3">
      <van-grid-item
        v-for="value of gridList"
        :key="value.type"
        v-bind="value"
        @click="handleClick(value.type)"
      />
    </van-grid>
  </div>
</template>
<script>
export default {
  name: "CatHome",

  components: {},

  data() {
    return {
      gridList: [
        {
          text: "商品建档",
          icon: "photo-o",
          type: "putOnRecord"
        },
        {
          text: "商品列表",
          icon: "photo-o",
          type: "goodList"
        },
        {
          text: "商品上架",
          icon: "photo-o",
          type: "goodOn"
        },
        {
          text: "商品下架",
          icon: "photo-o",
          type: "goodOff"
        },
        {
          text: "商品核销",
          icon: "photo-o",
          type: "goodVerify"
        },
        {
          text: "核销记录",
          icon: "photo-o",
          type: "VerifyRecord"
        }
      ]
    };
  },

  computed: {},

  mounted() {},

  methods: {
    handleClick(type) {
      switch (type) {
        case "putOnRecord":
          this.$router.push({
            name: "CatCreateGood"
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.cat-home
  width 100%
  height 100vh
  box-sizing border-box
  padding-top rems(100)
</style>
