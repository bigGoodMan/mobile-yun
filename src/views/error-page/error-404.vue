<!-- 404页面 -->
<template>
  <div>这是404啊</div>
</template>

<script>
import { testApi } from '@/api'
export default {
  name: 'error_404',

  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {
    testApi().then(r => console.log('r:', r)).catch(err => console.log(err))
  }
}
</script>
<style lang="stylus" scoped>
</style>
