<!-- 礼品筛选 -->
<template>
  <div class="gift-filter">
    <van-popup
      v-model="show"
      position="right"
      class="gift-filter-container"
      @click-overlay="handleClose"
    >
      <div>
        <FilterList title="库位" placeholder="根据库存查看库位中的礼品">
          <div class="size-0">
            <div
              v-for="items in statusList"
              :key="items.id"
              class="gift-filter-storehouse"
            >
              <HhfButton
                classes="gift-filter-storehouse-btn"
                :styles="items.checked ? activeStyles : null"
                @trigger-click="handleClick(items)"
                >{{ items.value }}</HhfButton
              >
            </div>
          </div>
        </FilterList>
      </div>
    </van-popup>
  </div>
</template>

<script>
import FilterList from "../filter-list";
import { mapState, mapActions } from "vuex";
export default {
  name: "GiftFilter",

  components: {
    FilterList
  },

  data() {
    return {
      activeStyles: {
        color: "#1890fc",
        borderColor: "#1890fc",
        backgroundColor: "rgba(24, 144, 252, 0.1)"
      },
      list: []
    };
  },

  computed: {
    ...mapState({
      storeList: state => state.common.storeList
    })
  },

  created() {
    this.getStore();
  },
  methods: {
    ...mapActions(["COMMON_GETSTORE_ACTION"]),
    // 关闭筛选窗
    handleClose() {
      this.$emit("trigger-close");
    },
    handleClick(items) {
      this.list = this.list.map(v => {
        const obj = {
          ...v
        };
        obj.checked = items.id === v.id ? !obj.checked : obj.checked;
        return obj;
      });
    },
    // 获取门店
    getStore() {
      this.COMMON_GETSTORE_ACTION().then(res => {
        if (res.return_code !== "0") {
          this.$Tip.warning(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
initStyle()
  border-radius rems(40)
  background-color #eaeaea
  font-size rems(28)
  color #292929
  height rems(60)
.gift-filter
  .gift-filter-container
    width 90%
    height 100%
    .gift-filter-storehouse
      width 30%
      display inline-block
      margin-bottom rems(20)
      &:not(:nth-child(3n))
        margin-right 5%
      .gift-filter-storehouse-btn
        initStyle()
        width 100%
</style>
