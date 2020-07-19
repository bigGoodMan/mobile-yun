<!-- 盘点礼品列表 -->
<template>
  <div class="bgcolor-f2 inventory-gift-list">
    <div v-for="(items, index) of list" :key="index">
      <div class="flex-row flex-between-stretch padding-20-30 bgcolor-f">
        <div class="flex-row flex-start-stretch">
          <div
            class="inventory-gift-list-img flex-center flex-row size-0 bgcolor-edeced"
          >
            <img
              v-lazy="items.thumb"
              class="inventory-gift-list-img-content"
              @click="handlePreview(items.img)"
            />
          </div>
          <ul class="flex-column flex-between-start color-393d49">
            <li class="size-28 weight-bold inventory-gift-list-name">
              {{ items.gift_name }}
            </li>
            <li class="size-28">编号{{ items.gift_id }}</li>
            <li class="size-28">{{ items.location_info }}</li>
          </ul>
        </div>
        <ul class="flex-column flex-between-end">
          <li class="size-28 weight-bold">
            库存量<i class="padding-left-10 color-error">{{ items.sys_num }}</i>
          </li>
          <li class="size-28">
            实盘数<i class="padding-left-10 color-393d49">{{ items.num }}</i>
          </li>
          <li class="size-24">
            差异
            <i
              v-if="items.num - items.sys_num > 0"
              class="padding-left-10 color-success"
              >+{{ items.num - items.sys_num }}</i
            >
            <i
              v-else-if="items.num - items.sys_num < 0"
              class="padding-left-10 color-error"
              >{{ items.num - items.sys_num }}</i
            >
            <i v-else class="padding-left-10 color-393d49">{{
              items.num - items.sys_num
            }}</i>
          </li>
        </ul>
      </div>
      <div class="border"></div>
    </div>
    <van-image-preview v-model="showPreview" :images="images">
    </van-image-preview>
  </div>
</template>

<script>
import { getInventoryDetailGiftListApi } from "@/api";
export default {
  name: "",

  components: {},

  data() {
    return {
      list: [],
      showPreview: false,
      images: []
    };
  },

  computed: {},
  created() {
    this.getInventoryDetailGiftList();
  },
  mounted() {},

  methods: {
    // 预览图片
    handlePreview(img) {
      this.images = [img];
      this.showPreview = true;
    },
    getInventoryDetailGiftList() {
      const { id, sid } = this.$route.query;
      getInventoryDetailGiftListApi({
        store_id: sid,
        inventory_id: id
      }).then(res => {
        if (res.return_code === "0") {
          this.list = res.data;
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.inventory-gift-list
  .inventory-gift-list-name
    max-width rems(350)
    word-break break-all
  .inventory-gift-list-img
    width rems(150)
    height rems(150)
    margin-right rems(10)
    .inventory-gift-list-img-content
      max-width 100%
      max-height 100%
</style>
