<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
  }
}
</script>

<style lang="stylus">
body
  font-size:100%
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  max-width rems(750)
  margin 0 auto
</style>
