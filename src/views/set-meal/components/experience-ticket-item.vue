<!--  -->
<template>
  <dl class="experience-ticket-item">
    <dt class="title flex-row flex-between-stretch">
      <div class="flex-column flex-center-start">
        <span class="size-30">{{itemData.name}}</span>
        <span class="size-24 color-9">{{getDateInterval(itemData.start_time, itemData.end_time)}}</span>
      </div>
      <div class="flex-column flex-between-start">
        <span class="size-26">发放数量<i class="color-error">{{itemData.num}}</i></span>
        <span class="size-26">合计嗨币<i class="color-error">{{itemData.total_coin}}</i></span>
      </div>
    </dt>
    <dd class="border margin-0"></dd>
    <dd class="content" v-for="(items, index) of itemData.card_info" :key="index">
      <div class="flex-row flex-between-center size-26 padding-30-0">
        <span>{{items.coin}}币</span>
        <span class="color-9">{{getDateInterval(items.start, items.end)}}</span>
        <span>数量<i class="padding-left-10 no-style">{{items.num}}</i></span>
      </div>
      <div class="border"></div>
    </dd>
    <dd class="border margin-0"></dd>
    <dd class="footer">
      <ul class="no-ul flex-row flex-between-center">
        <li><van-button type="info" size="small" radius="0.1rem" @click="handleEdit" :disabled="itemData.status !== '0'">编辑</van-button></li>
        <li><van-button type="info" size="small" radius="0.1rem" @click="handleTakeEffect" :disabled="itemData.status!=='0'">{{itemData.status === '0' ? '生效' : '已生效'}}</van-button></li>
        <li><van-button type="info" size="small" radius="0.1rem" @click="handleLink(itemData.url)" :disabled="itemData.status !== '1'">链接</van-button></li>
        <li><van-button type="danger" size="small" radius="0.1rem" @click="handleDiscontinue" :disabled="itemData.status === '2'">{{itemData.status === '2' ? '已停用' : '停用'}}</van-button></li>
      </ul>
    </dd>
    <dd style="display:none" ref="selectRef">{{itemData.url}}</dd>
    <dd><van-popup v-model="show"><div class="size-24 padding-20-30">{{itemData.url}}</div></van-popup></dd>
  </dl>
</template>

<script>
// import HhfButton from '@hhf/hhf-button'
import { takeEffectExperienceTicket, discontinueExperienceTicket } from '@/api'
import moment from 'moment'
export default {
  name: 'ExperienceTicketItem',

  data () {
    return {
      show: false
    }
  },
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    // HhfButton
  },

  computed: {
  },

  methods: {
    selectText (element) {
      if (document.body.createTextRange) {
        const range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
        return true
      } else if (window.getSelection) {
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
        document.execCommand('Copy')
        return true
      }
      return false
    },
    getDateInterval (start, end) {
      return `${moment(start * 1000).format('YYYY-MM-DD')}~${moment(end * 1000).format('YYYY-MM-DD')}`
    },
    handleLink (url) {
      this.show = true
      var oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      document.body.removeChild(oInput)
      this.$Tip.success('复制成功')
    },
    handleEdit () {
      this.$emit('trigger-edit')
    },
    handleTakeEffect () {
      this.$Loading('正在操作……')
      takeEffectExperienceTicket({ id: this.itemData.id }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.$Tip.success(res.msg)
          this.$emit('trigger-take-effect', { ...this.itemData, status: '1' })
          return
        }
        this.$Tip.warning(res.msg)
      })
    },
    handleDiscontinue () {
      this.$Loading('正在操作……')
      discontinueExperienceTicket({ id: this.itemData.id }).then(res => {
        this.$Loading.clear()
        if (res.return_code === '0') {
          this.$Tip.success(res.msg)
          this.$emit('trigger-discontinue', { ...this.itemData, status: '2' })
          return
        }
        this.$Tip.warning(res.msg)
      })
    }
  },

  mounted () {}
}
</script>
<style lang="stylus">
.experience-ticket-item
  margin 0
  background-color #ffffff
  border 1px solid #dddddd
  .title
    padding rems(30) rems(10)
    box-sizing border-box
    height rems(150)
    i
      font-style normal
      padding-left rems(20)
  .content
    margin-left 0
    padding 0 rems(30)
  .footer
    margin-left 0
    padding rems(30) rems(20)
</style>
