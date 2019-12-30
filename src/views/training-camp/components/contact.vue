<!-- 联系 -->
<template>
  <div class="contact bgcolor-f">
    <h5 class="contact-title size-28">还有疑问？</h5>
    <ul class="no-ul flex-row flex-center contact-list-ul">
      <li class="contact-list flex-row flex-center">
        <van-icon :name="phoneIcon" class="contact-phone" />
        <span class="size-24">{{info.mobile}}</span>
      </li>
      <li class="contact-list flex-row flex-center">
        <van-icon :name="emailIcon" class="contact-email"/>
        <span class="size-24">{{info.email}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TrainingCampContact',
  props: {
    info: Object
  },
  data () {
    return {
      phoneIcon: require('../img/phone.png'),
      emailIcon: require('../img/email.png')
    }
  },

  components: {},

  computed: {},

  methods: {
    handlePhone () {
      window.location.href = `tel:${this.info.mobile}`
    },
    handleEmail () {
      window.location.href = `mailto:${this.info.email}`
    }
  },

  mounted () {}
}
</script>
<style lang="stylus" scoped>
.contact
  padding rems(20)
  .contact-title
    margin 0
  .contact-list-ul
    padding rems(20) 0
    .contact-list
      font-size 0
      &:first-child
        padding-right rems(40)
        border-right 2px solid #e3e3e3
      &:last-child
        padding-left rems(40)
      .contact-phone
        font-size rems(44)
        padding-right rems(20)
      .contact-email
        font-size rems(44)
        padding-right rems(20)
</style>
