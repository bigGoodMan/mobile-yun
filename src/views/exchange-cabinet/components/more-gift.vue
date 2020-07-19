<!--盘点单添加更多礼品 -->
<template>
  <div>
    <van-popup v-model="show" position="bottom" class="more-gift bgcolor-f2">
      <div class="more-gift-main">
        <!-- 头部搜索 -->
        <div>
          <HeaderSearch
            v-model="value"
            placeholder="请输入礼品名称或编号"
            @trigger-input="handleSearchInput"
          />
        </div>
        <!-- 礼品内容 -->
        <div>
          <div class="color-393d49 size-28 more-gift-title">
            该门店库存为0的礼品
          </div>
          <div class="border"></div>
          <ul>
            <li v-for="items in giftList" :key="items.gift_id">
              <div
                class="flex-row flex-between-center size-28 color-393d49 more-gift-describe bgcolor-f"
                @click="handleCheck(items)"
              >
                <van-checkbox
                  v-model="items.checked"
                  :name="items.gift_id"
                ></van-checkbox>
                <div class="flex-1 flex-row flex-start">
                  <div
                    class="more-gift-describe-img bgcolor-f2 flex-row flex-center"
                  >
                    <img
                      v-lazy="items.thumb"
                      class="more-gift-describe-img-content"
                      @click.stop="handlePreview(items.img)"
                    />
                  </div>
                  <div class="flex-column flex-start">
                    <span
                      class="color-393d49 size-32 weight-bold padding-bottom-20"
                      >{{ items.name }}</span
                    >
                    <span class="size-28 color-454545"
                      >编号{{ items.gift_id }}</span
                    >
                  </div>
                </div>
              </div>
              <div class="border"></div>
            </li>
          </ul>
        </div>
        <div class="height-100"></div>
      </div>
      <!-- 添加礼品按钮 -->
      <div class="more-gift-btn-container fixed-max-width bottom-0">
        <HhfButton type="info" size="large" @trigger-click="handleAdd"
          >添加列表</HhfButton
        >
      </div>
    </van-popup>
    <van-image-preview v-model="showPreview" :images="images">
    </van-image-preview>
  </div>
</template>

<script>
import HeaderSearch from "@yun/header-search";
import HhfButton from "@hhf/hhf-button";
import { mapState } from "vuex";
export default {
  name: "MoreGift",

  components: {
    HeaderSearch,
    HhfButton
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      initGiftList: [],
      giftList: [],
      value: "",
      images: [],
      showPreview: false
    };
  },

  computed: {
    ...mapState({
      inventoryGiftList: state => state.inventory.inventoryGiftList, // 当前盘点中的礼品
      inventoryMoreGiftList: state => state.inventory.inventoryMoreGiftList // 更多盘点礼品
    })
  },
  watch: {
    inventoryGiftList(currVal) {
      const { inventoryMoreGiftList } = this;
      let list = [];
      list = inventoryMoreGiftList.map(v => ({ ...v, checked: false }));
      list = list.filter(v => {
        for (const items of currVal) {
          if (items.gift_id === v.gift_id) {
            return false;
          }
        }
        return true;
      });
      this.initGiftList = list;
    },
    show() {},
    initGiftList() {
      this.giftList = this.initGiftList;
    }
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    this.handleClearTimer();
  },
  methods: {
    // 预览图片
    handlePreview(img) {
      this.images = [img];
      this.showPreview = true;
    },
    handleClearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    // 搜索监听
    handleSearchInput() {
      // this.handleClearTimer();
      // this.timer = setTimeout(() => {
      //   if (val === "") {
      //     this.giftList = this.initGiftList;
      //   } else {
      //     this.giftList = this.initGiftList.filter(
      //       v => v.gift_id === val || v.name.indexOf(val) > -1
      //     );
      //   }
      // }, 300);
    },
    handleCheck(items) {
      this.initGiftList = this.initGiftList.map(v => ({
        ...v,
        checked: v.gift_id === items.gift_id ? !v.checked : v.checked
      }));
    },
    handleAdd() {
      this.$emit(
        "trigger-close",
        this.initGiftList.filter(v => v.checked)
      );
    }
  }
};
</script>
<style lang="stylus" scoped>
.more-gift
  width 100%
  height 100%
  overflow hidden
  .more-gift-main
    height 100%
    overflow auto
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
          max-height 100%
  .more-gift-btn-container
    z-index 6
</style>
