<!-- 机台列表 -->
<template>
  <div class="machine-list">
    <dl
      v-for="(items, index) in record"
      :key="index"
      class="machine-list-container"
    >
      <dt class="size-28 color-3 machine-list-place">
        {{ items.area_name }}（{{ items.intro }}）
      </dt>
      <dd class="machine-list-main bgcolor-f2">
        <ul class="machine-list-content">
          <li
            v-for="its in items.items"
            :key="its.machine_id"
            class="machine-list-panel"
          >
            <div
              class="bgcolor-f machine-list-panel-container"
              @click="
                handleHref({
                  machineId: its.machine_id,
                  machineType: its.machine_type,
                  parentId: its.parent_id,
                  giftId: its.gift_id,
                  giftIdBak: its.gift_id_bak
                })
              "
            >
              <div class="machine-list-img bgcolor-f2 flex-row flex-center">
                <div class="machine-list-tag color-ff5722 size-24">
                  <van-tag
                    :color="its.status_type === '1' ? '#5fb878' : '#ff5722'"
                    size="large"
                    >{{ its.MACHINE_STATUS }}</van-tag
                  >
                </div>
                <img class="machine-list-img-content" :src="its.img" alt="" />
                <!-- <img class="machine-list-img-content" src="http://www.3d2000.com/wp-content/uploads/2016/05/294194-63df2252ee261b59.gif" alt=""> -->
              </div>
              <div class="machine-list-substance">
                <p>
                  <span class="weight-bold size-28 color-3"
                    >{{ its.name }}-{{ its.no }}</span
                  ><span class="size-24 color-9 machine-list-panel-number"
                    >({{ its.machine_id }})</span
                  >
                </p>
                <p class="flex-row flex-between-center">
                  <span class="size-24 color-9">{{ its.type_name }}</span
                  ><span class="size-28 color-ff0000 weight-bold">{{
                    its.coins_sell
                  }}</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
import { MACHINE_STATUS_TYPE, MACHINE_TYPE } from "@l/judge";
export default {
  name: "",

  components: {},
  props: {
    columns: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {};
  },

  computed: {
    record() {
      return this.columns.map(v => ({
        ...v,
        items: v.items.map(its => ({
          ...its,
          MACHINE_STATUS: MACHINE_STATUS_TYPE[its.status_type],
          MACHINE_TYPE: MACHINE_TYPE[its.machine_type],
          coins_sell: its.coins_sell ? its.coins_sell + "币" : ""
        }))
      }));
    }
  },

  mounted() {},
  methods: {
    handleHref({ machineId, machineType, parentId, giftId, giftIdBak }) {
      if (machineType === "1" && parentId !== "54") {
        // 礼品机可以去详情
        if ((!giftId && !giftIdBak) || (giftId === "0" && giftIdBak === "0")) {
          this.$Tip.warning("该机型未设置礼品，请先设置礼品");
          return;
        }
        this.$router.push({
          name: "machine_detail",
          query: { mid: machineId }
        });
      } else {
        this.$Tip.warning("该机型不可设置参数");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.machine-list
  .machine-list-container
    margin 0
    .machine-list-place
      padding rems(20)
    .machine-list-main
      margin 0
      .machine-list-content
        display flex
        flex-flow row wrap
        justify-content space-between
        padding rems(10)
        .machine-list-panel
          box-sizing border-box
          width 50%
          padding rems(10)
          .machine-list-panel-container
            padding rems(20)
          .machine-list-img
            position relative
            width 100%
            height rems(345)
            font-size 0
            .machine-list-tag
              position absolute
              top 0
              right 0
              // padding rems(10) rems(20)
              // background-color rgba(0, 0, 0, 0.5)
            .machine-list-img-content
              max-width 100%
              max-height 100%
          .machine-list-panel-number
            padding-left rems(20)
</style>
