<!-- 更多礼品 -->
<template>
  <div class="more-gift bgcolor-f2">
    <div class="more-gift-main">
        <!-- 头部搜索 -->
        <div>
          <HeaderSearch
            v-model="value"
            placeholder="请输入礼品名称或编号"
            @trigger-search="handleSearch"
          />
        </div>
        <!-- 礼品内容 -->
        <div>
          <div class="color-393d49 size-28 more-gift-title">该门店库存为0的礼品</div>
          <div class="border"></div>
          <div>
            <div
              v-for="items in [1, 2, 3, 4, 5, 6, 7, 8, 9]"
              :key="items"
            >
              <div
                class="flex-row flex-between-center size-28 color-393d49 more-gift-describe bgcolor-f"
                @click="handleCheck"
              >
                <van-checkbox
                  name="1"
                  v-model="checked"
                ></van-checkbox>
                <div class="flex-1 flex-row flex-start">
                  <div class="more-gift-describe-img bgcolor-f2 flex-row flex-center">
                    <img
                      class="more-gift-describe-img-content"
                      v-lazy="img"
                    >
                  </div>
                  <div class="flex-column flex-start">
                    <span class="color-393d49 size-32 weight-bold padding-bottom-20">30cm大猩猩</span>
                    <span class="size-28 color-454545">编号123236</span>
                  </div>
                </div>
              </div>
              <div class="border"></div>
            </div>
          </div>
        </div>
        <!-- 添加礼品按钮 -->
    </div>
        <div class="more-gift-btn">
          <div class="more-gift-btn-container">
            <HhfButton
              type="info"
              size="large"
              @trigger-click="$router.push({ name: 'inventorying'})"
            >添加列表</HhfButton>
          </div>
        </div>
  </div>
</template>

<script>
import HeaderSearch from '@yun/header-search'
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'more_gift',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      value: '',
      checked: true,
      img: 'https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg'
    }
  },

  components: {
    HeaderSearch,
    HhfButton
  },

  computed: {},

  methods: {
    handleSearch () {

    },
    handleCheck () {
      this.checked = !this.checked
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.more-gift
  .more-gift-main
    position relative
    z-index 5
    .more-gift-title
      padding rems(20)
    .more-gift-describe
      padding rems(20)
      .more-gift-describe-img
        width rems(150)
        height rems(150)
        margin 0 rems(20) 0 rems(50)
      .more-gift-describe-img-content
        max-width 100%
        min-height 100%
.more-gift-btn
  height rems(100)
  .more-gift-btn-container
    position fixed
    bottom 0
    left 0
    width 100%
    font-size 0
    z-index 6
</style>
