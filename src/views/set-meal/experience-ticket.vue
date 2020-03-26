<!-- 体验券 -->
<template>
  <div>
    <div class="header bgcolor-f">
      <MyStore @trigger-click="handleConfirm" :store-id="store_id" :default-index="0">
        <div class="flex-row flex-end-center flex-1">
          <van-icon @click="handleRouter" name="question-o" size="0.4rem" />
        </div>
      </MyStore>
    </div>
  </div>
</template>

<script>
import MyStore from '@yun/my-store'
export default {
  name: 'ExperienceTicket',

  data () {
    return {
    }
  },

  components: {
    MyStore
  },

  computed: {},

  methods: {},

  mounted () {}
}
</script>
<style lang="stylus" scoped>
</style>
