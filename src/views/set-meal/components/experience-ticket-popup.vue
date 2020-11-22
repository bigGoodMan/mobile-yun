<!-- 体验券弹窗 -->
<template>
  <van-popup
    class="experience-ticket-popup"
    :value="show"
    :close-on-click-overlay="false"
    @click-overlay="handleClickOverlay"
  >
    <div class="experience-ticket-popup-container">
      <div class="flexperience-ticket-popup-close" @click="handleClickOverlay">
        <van-icon name="cross" />
      </div>
      <div class="experience-ticket-popup-header">
        <!-- <h6 class="margin-0 size-30 padding-20-30">印象城10周年庆包</h6> -->
        <ul class="no-ul">
          <li class="padding-20-30">
            <HhfInput
              v-model="experienceTicketItem.name"
              title="券包名字"
              type="text"
              placeholder="券包名字"
            />
          </li>
          <li>
            <CellList
              title="开始时间"
              :value="getDate(experienceTicketItem.start_time)"
              right-icon="arrow"
              @trigger-click="
                handleOpenPackageDate({
                  key: 'start_time',
                  start: experienceTicketItem.start_time,
                  end: experienceTicketItem.end_time
                })
              "
            />
          </li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li>
            <CellList
              title="结束时间"
              :value="getDate(experienceTicketItem.end_time)"
              right-icon="arrow"
              @trigger-click="
                handleOpenPackageDate({
                  key: 'end_time',
                  start: experienceTicketItem.start_time,
                  end: experienceTicketItem.end_time
                })
              "
            />
          </li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li class="padding-20-30">
            <HhfInput
              v-model="experienceTicketItem.num"
              title="发放人数"
              type="tel"
              placeholder="可填入发放人数"
            />
          </li>
        </ul>
        <div class="border"></div>
      </div>
      <div class="experience-ticket-popup-main">
        <div class="experience-ticket-popup-container padding-20-30">
          <van-swipe
            ref="swipeRef"
            class="experience-ticket-popup-content"
            vertical
            :loop="false"
            @change="handleSwipe"
          >
            <van-swipe-item
              v-for="(items, index) of experienceTicketItem.card_info"
              :key="index"
            >
              <div class="size-28 text-center">卡券{{ index + 1 }}</div>
              <ul class="no-ul">
                <li>
                  <CellList
                    title="开始时间"
                    :value="getDate(items.start)"
                    right-icon="arrow"
                    @trigger-click="
                      handleOpenCouponDate({
                        key: 'start',
                        start: items.start,
                        end: items.end,
                        index
                      })
                    "
                  />
                </li>
                <li class="border"></li>
                <li>
                  <CellList
                    title="结束时间"
                    :value="getDate(items.end)"
                    right-icon="arrow"
                    @trigger-click="
                      handleOpenCouponDate({
                        key: 'end',
                        start: items.start,
                        end: items.end,
                        index
                      })
                    "
                  />
                </li>
                <li class="border"></li>
                <li class="padding-20-30">
                  <HhfInput
                    v-model="items.coin"
                    title="面值"
                    type="tel"
                    placeholder="可填入面值"
                  />
                </li>
                <li class="border"></li>
                <li class="padding-20-30">
                  <HhfInput
                    v-model="items.num"
                    title="发放人数"
                    type="tel"
                    placeholder="可填入发放人数"
                  />
                </li>
                <li class="border"></li>
              </ul>
            </van-swipe-item>
            <template #indicator>
              <div class="experience-ticket-popup-custom-indicator">
                {{ current + 1 }}/{{ experienceTicketItem.card_info.length }}
              </div>
            </template>
          </van-swipe>
          <div class="text-center">
            <HhfButton type="info" radius="0.1rem" @trigger-click="handleAdd"
              >添加卡券</HhfButton
            >
          </div>
          <div class="text-center margin-top-20">
            <HhfButton
              type="info"
              size="large"
              radius="0.1rem"
              @trigger-click="handleSave"
              >保存</HhfButton
            >
          </div>
        </div>
        <van-popup
          v-model="dateShow"
          position="bottom"
          get-container="body"
          overlay
          @click-overlay="handleDateClose"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="handleConfirm"
            @cancel="handleCancel"
          />
        </van-popup>
      </div>
    </div>
  </van-popup>
</template>

<script>
import CellList from "@yun/cell-list";
import HhfButton from "@hhf/hhf-button";
import HhfInput from "@hhf/hhf-input";
import moment from "moment";
export default {
  name: "ExperienceTicketPopup",
  components: {
    HhfInput,
    CellList,
    HhfButton
  },
  model: {
    prop: "show",
    event: "trigger-change"
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    ticketData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      current: 0,
      dateShow: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      dateNameObj: {},
      experienceTicketItem: {
        card_info: [{}]
      }
    };
  },

  watch: {
    ticketData(currVal) {
      if (!currVal) {
        this.init();
        return;
      }
      const card = currVal.card_info.map(item => ({ ...item }));
      this.experienceTicketItem = {
        ...currVal,
        card_info: card
      };
    }
  },

  mounted() {},
  methods: {
    init() {
      const initObj = {
        current: 0,
        dateShow: false,
        minDate: new Date(),
        maxDate: new Date(2025, 10, 1),
        currentDate: new Date(),
        dateNameObj: {},
        experienceTicketItem: {
          card_info: [{}]
        }
      };
      for (const key in initObj) {
        this[key] = initObj[key];
      }
    },
    getDate(dt) {
      if (!dt) {
        return "";
      }
      return moment(dt * 1000).format("YYYY-MM-DD");
    },
    handleSwipe(index) {
      this.current = index;
    },
    handleOpenPackageDate({ key, start, end }) {
      this.dateNameObj = {
        type: "package",
        name: key
      };
      let currentDate;
      if (key === "start_time") {
        this.minDate = new Date();
        this.maxDate = end
          ? new Date(end * 1000 - 24 * 60 * 60 * 1000)
          : new Date(2025, 10, 1);
        currentDate = start || Date.parse(this.minDate) / 1000;
      } else if (key === "end_time") {
        this.maxDate = new Date(2025, 10, 1);
        this.minDate = start
          ? new Date(start * 1000 + 24 * 60 * 60 * 1000)
          : new Date();
        currentDate = end || Date.parse(this.minDate) / 1000;
      }
      if (currentDate) {
        this.currentDate = new Date(currentDate * 1000);
      } else {
        this.currentDate = new Date();
      }
      this.dateShow = true;
    },
    handleOpenCouponDate({ key, start, end, index }) {
      this.dateNameObj = {
        type: "coupon",
        name: key,
        index
      };
      let currentDate;
      if (key === "start") {
        this.minDate = new Date();
        this.maxDate = end
          ? new Date(end * 1000 - 24 * 60 * 60 * 1000)
          : new Date(2025, 10, 1);
        currentDate = start || Date.parse(this.minDate) / 1000;
      } else if (key === "end") {
        this.maxDate = new Date(2025, 10, 1);
        this.minDate = start
          ? new Date(start * 1000 + 24 * 60 * 60 * 1000)
          : new Date();
        currentDate = start || Date.parse(this.minDate) / 1000;
      }
      if (currentDate) {
        this.currentDate = new Date(currentDate * 1000);
      } else {
        this.currentDate = new Date();
      }
      this.dateShow = true;
    },
    handleConfirm(value) {
      const { type, name, index } = this.dateNameObj;
      const val = Date.parse(value) / 1000;
      if (type === "package") {
        this.experienceTicketItem = {
          ...this.experienceTicketItem,
          [name]: val
        };
      } else if (type === "coupon") {
        const card = this.experienceTicketItem.card_info.map((v, i) => {
          if (index === i) {
            v[name] = val;
          }
          return v;
        });
        this.experienceTicketItem = {
          ...this.experienceTicketItem,
          card_info: card
        };
      }
      this.handleDateClose();
    },
    handleClickOverlay() {
      this.init();
      this.$emit("trigger-change", false);
    },
    handleCancel() {
      this.handleDateClose();
    },
    handleDateClose() {
      this.dateShow = false;
    },
    handleAdd() {
      const card = this.experienceTicketItem.card_info;
      const length = card.length;
      const tailIndex = length - 1;
      const cardItem = card[tailIndex];
      const keys = Object.keys(cardItem);
      const keysLength = keys.length;
      if (keysLength < 4) {
        this.$Tip.warning(`请把卡券${length}填写完整！`);
        return;
      }
      for (let i = 0; i < keysLength; ++i) {
        if (!cardItem[keys[i]]) {
          this.$Tip.warning(`请把卡券${length}填写完整！`);
          return;
        }
      }
      card.push({});
      const index = card.length - 1;
      this.experienceTicketItem = {
        ...this.experienceTicketItem,
        card_info: card
      };
      this.$refs.swipeRef.swipeTo(index);
    },
    handleSave() {
      // this.init()
      this.$emit("trigger-save", this.experienceTicketItem);
    }
  }
};
</script>
<style lang="stylus">
.experience-ticket-popup {
  overflow: visible;

  .experience-ticket-popup-container {
    position: relative;
    min-width: 90vw;
    box-sizing: border-box;

    .flexperience-ticket-popup-close {
      position: absolute;
      top: rems(-20);
      right: @top;
      color: rgba(82, 82, 82, 0.8);
      width: rems(40);
      height: @width;
      text-align: center;
      line-height: @width;
      border: 1px solid @color;
      background-color: #fff;
      border-radius: 50%;
      box-sizing: border-box;
      font-size: rems(38);
    }

    .experience-ticket-popup-main {
      .experience-ticket-popup-container {
        .experience-ticket-popup-content {
          height: rems(430);
        }

        .experience-ticket-popup-custom-indicator {
          position: absolute;
          right: 5px;
          bottom: 5px;
          padding: 2px 5px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
