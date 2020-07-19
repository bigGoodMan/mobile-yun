<!-- 404页面 -->
<template>
  <div>这是404啊</div>
</template>

<script>
import { testApi } from "@/api";
export default {
  name: "Error404",

  components: {},

  data() {
    return {};
  },

  computed: {},

  mounted() {
    testApi()
      .then(r => console.log("r:", r))
      .catch(err => console.log(err));
  },

  methods: {}
};
</script>
<style lang="stylus" scoped></style>
