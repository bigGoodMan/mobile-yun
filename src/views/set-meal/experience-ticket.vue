<!-- 体验券 -->
<template>
  <div class="experience-ticket">
    <div class="header bgcolor-f">
      <div class="fixed top-0 left-0 width-2half bgcolor-f" style="z-index: 10">
      <MyStore @trigger-click="handleConfirm" :store-id="storeId" :default-index="0">
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
    </div>
      </div>
    <div ckass="main">
      <div class="contaienr padding-20-30">
        <ul class="no-ul">
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
          <li class="padding-bottom-30"><ExperienceTicketItem/></li>
        </ul>
      </div>
      <HhfButton type="info" size="large" :bottom-z-index="10" radius="0.1rem">新增券包</HhfButton>
      <ExperienceTicketPopup v-model="show" />
    </div>
  </div>
</template>

<script>
import ExperienceTicketPopup from './components/experience-ticket-popup'
import MyStore from '@yun/my-store'
import HhfButton from '@hhf/hhf-button'
import ExperienceTicketItem from './components/experience-ticket-item.vue'
export default {
  name: 'ExperienceTicket',

  data () {
    return {
      storeId: null,
      show: true
    }
  },

  components: {
    MyStore,
    HhfButton,
    ExperienceTicketItem,
    ExperienceTicketPopup
  },

  computed: {},

  methods: {
    // 选择门店回调
    handleConfirm (data) {
      this.storeId = data.value.store_id
      // this.handleSort({})
    },
    // 查看版本更新说明
    handleRouter () {
      this.$router.push({
        name: 'Article'
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.experience-ticket
  .header
    height rems(106)
//   .main
//     .container
//       padding
</style>
