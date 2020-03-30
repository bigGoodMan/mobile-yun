<!-- 体验券弹窗 -->
<template>
  <van-popup :value="show" :close-on-click-overlay="false" @click-overlay="handleClickOverlay">
    <div class="experience-ticket-popup">
      <div class="experience-ticket-popup-header">
        <!-- <h6 class="margin-0 size-30 padding-20-30">印象城10周年庆包</h6> -->
        <ul class="no-ul">
          <li class="padding-20-30">
            <HhfInput title="券包名字" type="text" v-model="experienceTicketItem.name" placeholder="券包名字"/>
          </li>
          <li><CellList title="开始时间" :value="getDate(experienceTicketItem.start_time)" rightIcon @trigger-click="handleOpenPackageDate('start_time', experienceTicketItem.start_time)" /></li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li><CellList title="结束时间" :value="getDate(experienceTicketItem.end_time)" rightIcon @trigger-click="handleOpenPackageDate('end_time', experienceTicketItem.end_time)" /></li>
          <li class="padding-0-30">
            <div class="border"></div>
          </li>
          <li class="padding-20-30">
            <HhfInput
              title="发放数量"
              v-model="experienceTicketItem.num"
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
            :loop="false"
            ref="swipeRef"
            @change="handleSwipe"
          >
            <van-swipe-item v-for="(items, index) of experienceTicketItem.card_info" :key="index">
              <div class="size-28 text-center">礼包{{ current + 1 }}</div>
              <ul class="no-ul">
                <li><CellList title="开始时间" :value="getDate(items.start)" rightIcon  @trigger-click="handleOpenCouponDate('start', items.start, index)" /></li>
                <li class="border"></li>
                <li><CellList title="结束时间" :value="getDate(items.end)" rightIcon  @trigger-click="handleOpenCouponDate('end', items.end, index)" /></li>
                <li class="border"></li>
                <li class="padding-20-30">
                  <HhfInput
                    title="面值"
                    type="tel"
                    v-model="items.coin"
                    placeholder="可填入面值"
                  />
                </li>
                <li class="border"></li>
                <li class="padding-20-30">
                  <HhfInput
                    title="发放数量"
                    type="tel"
                    v-model="items.num"
                    placeholder="可填入发放数量"
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
            <HhfButton type="info" radius="0.1rem" @trigger-click="handleAdd">添加卡券</HhfButton>
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
            v-model="currentDate"
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
import moment from 'moment'
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
      dateNameObj: {},
      experienceTicketItem: {
        card_info: [{}]
      }
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

  watch: {
    ticketData (currVal) {
      if (!currVal || !currVal.length) {
        this.experienceTicketItem = {
          card_info: [{}]
        }
      }
      const card = currVal.card_info.map(item => ({ ...item }))
      this.experienceTicketItem = {
        ...currVal,
        card_info: card
      }
    }
  },
  methods: {
    getDate (dt) {
      if (!dt) {
        return ''
      }
      return moment(dt * 1000).format('YYYY-MM-DD')
    },
    handleSwipe (index) {
      this.current = index
    },
    handleOpenPackageDate (key, dt) {
      this.dateNameObj = {
        type: 'package',
        name: key
      }
      if (dt) {
        this.currentDate = new Date(dt * 1000)
      } else {
        this.currentDate = new Date()
      }
      this.dateShow = true
    },
    handleOpenCouponDate (key, dt, index) {
      this.dateNameObj = {
        type: 'coupon',
        name: key,
        index
      }
      if (dt) {
        this.currentDate = new Date(dt * 1000)
      } else {
        this.currentDate = new Date()
      }
      this.dateShow = true
    },
    handleConfirm (value) {
      const {
        type,
        name,
        index
      } = this.dateNameObj
      const val = Date.parse(value) / 1000
      if (type === 'package') {
        this.experienceTicketItem = {
          ...this.experienceTicketItem,
          [name]: val
        }
      } else if (type === 'coupon') {
        const card = this.experienceTicketItem.card_info.map((v, i) => {
          if (index === i) {
            v[name] = val
          }
          return v
        })
        this.experienceTicketItem = {
          ...this.experienceTicketItem,
          card_info: card
        }
      }
      this.handleDateClose()
    },
    handleClickOverlay () {
      this.$emit('trigger-change', false)
    },
    handleCancel () {
      this.handleDateClose()
    },
    handleDateClose () {
      this.dateShow = false
    },
    handleAdd () {
      const card = this.experienceTicketItem.card_info
      card.push({})
      const index = card.length - 1
      this.experienceTicketItem = {
        ...this.experienceTicketItem,
        card_info: card
      }
      this.$refs.swipeRef.swipeTo(index)
    },
    handleSave () {
      this.$emit('trigger-save', this.experienceTicketItem)
    }
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
        height rems(430)
      .experience-ticket-popup-custom-indicator
        position absolute
        right 5px
        bottom 5px
        padding 2px 5px
        font-size 12px
        background rgba(0, 0, 0, 0.1)
</style>
