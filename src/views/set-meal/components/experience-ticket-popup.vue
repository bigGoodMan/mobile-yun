<!-- 体验券弹窗 -->
<template>
  <van-popup :value="show" :close-on-click-overlay="false">
    <div class="experience-ticket-popup">
      <div class="experience-ticket-popup-header">
        <h6 class="margin-0 size-30 padding-20-30">印象城10周年庆包</h6>
        <ul class="no-ul">
          <li><CellList title="开始时间" value="" rightIcon @trigger-click="handleOpenDate" /></li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li><CellList title="开始时间" value="" rightIcon @trigger-click="handleOpenDate" /></li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li class="padding-20-30">
            <HhfInput
              title="发放数量"
              value=""
              type="tel"
              placeholder="可填入发放数量"
            />
          </li>
        </ul>
        <div class="border"></div>
      </div>
      <div class="experience-ticket-popup-main">
        <div class="experience-ticket-popup-container padding-20-30">
          <van-swipe
            class="experience-ticket-popup-content"
            vertical
            @change="handleSwipe"
          >
            <van-swipe-item v-for="(items, index) of childrenData" :key="index">
              <div class="size-28 text-center">礼包{{ current + 1 }}</div>
              <ul class="no-ul">
                <li><CellList title="开始时间" value="" rightIcon  @trigger-click="handleOpenDate" /></li>
                <li class="border"></li>
                <li><CellList title="开始时间" value="" rightIcon  @trigger-click="handleOpenDate" /></li>
                <li class="border"></li>
                <li class="padding-20-30">
                  <HhfInput
                    title="发放数量"
                    type="tel"
                    value=""
                    placeholder="可填入发放数量"
                  />
                </li>
                <li class="border"></li>
              </ul>
            </van-swipe-item>
            <template #indicator>
              <div class="experience-ticket-popup-custom-indicator">
                {{ current + 1 }}/{{ childrenData.length }}
              </div>
            </template>
          </van-swipe>
          <div class="text-center">
            <HhfButton type="info" radius="0.1rem">添加卡券</HhfButton>
          </div>
          <div class="text-center margin-top-20">
            <HhfButton type="info" size="large" radius="0.1rem" @trigger-click="handleSave">保存</HhfButton>
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
            :value="currentDate"
            type="date"
            @confirm="handleConfirm"
            @cancel="handleCancel"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </van-popup>
      </div>
    </div>
  </van-popup>
</template>

<script>
import CellList from '@yun/cell-list'
import HhfButton from '@hhf/hhf-button'
import HhfInput from '@hhf/hhf-input'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'ExperienceTicketPopup',
  model: {
    prop: 'show',
    event: 'trigger-change'
  },
  data () {
    return {
      current: 0,
      dateShow: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      childrenData: Array(20).fill(1),
      experienceTicketItem: {}
    }
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
  components: {
    HhfInput,
    CellList,
    HhfButton
  },

  computed: {
    ...mapState({
      experienceTicketList: state => state.setMeal.experienceTicketList
    })
  },
  watch: {
    ticketData (currVal) {
      this.experienceTicketItem = { ...currVal }
    }
  },
  methods: {
    ...mapMutations({
      setTicket: 'experienceTicketList'
    }),
    handleSwipe (index) {
      this.current = index
    },
    handleOpenDate () {
      this.dateShow = true
    },
    handleConfirm (value) {
      this.currentDate = value
      console.log(value)
      this.handleDateClose()
    },
    handleCancel () {
      this.handleDateClose()
    },
    handleDateClose () {
      this.dateShow = false
    },
    handleSave () {}
  },

  mounted () {}
}
</script>
<style lang="stylus">
.experience-ticket-popup
  position relative
  min-width 90vw
  box-sizing border-box
  .experience-ticket-popup-main
    .experience-ticket-popup-container
      .experience-ticket-popup-content
        height rems(350)
      .experience-ticket-popup-custom-indicator
        position absolute
        right 5px
        bottom 5px
        padding 2px 5px
        font-size 12px
        background rgba(0, 0, 0, 0.1)
</style>
