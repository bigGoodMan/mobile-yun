<!--  -->
<template>
  <dl class="experience-ticket-item">
    <dt class="title flex-row flex-between-stretch">
      <div class="flex-column flex-center-start">
        <span class="size-30">印象城10周年店庆包</span>
        <span class="size-24 color-9">2019-10-11~2012-12-12</span>
      </div>
      <div class="flex-column flex-between-start">
        <span class="size-26">发放数量<i class="color-error">999</i></span>
        <span class="size-26">合计嗨币<i class="color-error">66</i></span>
      </div>
    </dt>
    <dd class="border margin-0"></dd>
    <dd class="content">
      <div class="flex-row flex-between-center size-26 padding-30-0">
        <span>666币</span>
        <span class="color-9">2019-10-11~2012-12-12</span>
        <span>数量<i class="padding-left-10 no-style">10</i></span>
      </div>
      <div class="border"></div>
    </dd>
    <dd class="content">
      <div class="flex-row flex-between-center size-26 padding-30-0">
        <span>666币</span>
        <span class="color-9">2019-10-11~2012-12-12</span>
        <span>数量<i class="padding-left-10 no-style">10</i></span>
      </div>
      <!-- <div class="border"></div> -->
    </dd>
    <dd class="border margin-0"></dd>
    <dd class="footer">
      <ul class="no-ul flex-row flex-between-center">
        <li><HhfButton type="info" size="small" radius="0.1rem">编辑</HhfButton></li>
        <li><HhfButton type="info" size="small" radius="0.1rem">生效</HhfButton></li>
        <li><HhfButton type="info" size="small" radius="0.1rem">链接</HhfButton></li>
        <li><HhfButton type="danger" size="small" radius="0.1rem">停用</HhfButton></li>
      </ul>
    </dd>
  </dl>
</template>

<script>
import HhfButton from '@hhf/hhf-button'
export default {
  name: 'ExperienceTicketItem',

  data () {
    return {
    }
  },

  components: {
    HhfButton
  },

  computed: {},

  methods: {},

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
