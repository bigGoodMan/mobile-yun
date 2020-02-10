<!-- 页面 -->
<template>
  <div>
    <ul class="size-28">
      <li v-for="items of childrenRoutes" :key="items.name"><span class="weight-bold">{{items.name}}：</span><span class="color-1e9fff text-pointer" @click="$router.push({name: items.name})">{{items.path}}</span></li>
    </ul>
  </div>
</template>

<script>
import { childrenRoutes } from '@/routes/router'
export default {
  name: 'Page1',

  data () {
    return {
      childrenRoutes
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted () {
    console.log(childrenRoutes)
  }
}
</script>
<style lang="stylus" scoped></style>
