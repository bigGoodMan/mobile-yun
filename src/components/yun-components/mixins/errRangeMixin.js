export default {
  data() {
    return {
      errObj: {}
    };
  },
  methods: {
    showErrFunc(key, bool) {
      this.errObj = {
        ...this.errObj,
        [key]: bool
      };
    },
    judgeFunc({ key, value, range }) {
      const start = range[0];
      const end = range[1];
      this.showErrFunc(
        key,
        !(
          (/^[0-9]+$/.test(String(value)) && value >= start && value <= end) ||
          value === ""
        )
      );
    },
    judgeIntegerNotEmptyFunc({ key, value, range }) {
      const start = range[0];
      const end = range[1];
      this.showErrFunc(
        key,
        !(/^[0-9]+$/.test(String(value)) && value >= start && value <= end)
      );
    },
    judgeNumberNotEmptyFunc({ key, value, range }) {
      const start = range[0];
      const end = range[1];
      this.showErrFunc(
        key,
        !(
          /^[0-9]+(\.[0-9]{1,2})?$/.test(String(value)) &&
          value >= start &&
          value <= end
        )
      );
    }
  }
};
