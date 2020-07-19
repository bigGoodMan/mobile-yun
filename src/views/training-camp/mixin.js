import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: state => state.trainingCamp.userInfo,
      contactInfo: state => state.trainingCamp.contactInfo
    })
  },
  methods: {
    ...mapActions(["TRAININGCAMP_INFO_ACTION"]),
    getInfo() {
      if (Object.keys(this.userInfo).length === 0) {
        this.$Loading();
        this.TRAININGCAMP_INFO_ACTION().then(res => {
          this.$Loading.clear();
          if (res.return_code !== "0") {
            this.$Tip.warning(res.msg);
          }
        });
      }
    }
  },
  created() {
    this.getInfo();
  }
};
