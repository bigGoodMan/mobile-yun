<!-- 创建礼品详情 -->
<template>
  <div class="create-gift-detail">
    <div>
      <van-cell
        title="所属商家"
        value="内容"
      />
    </div>
      <div class="border border-ebedf0"></div>
    <div v-if="giftDetail.img">
      <GiftList :result="giftDetail" />
    </div>
    <div class="margin-top-20 bgcolor-f">
      <h5 class="margin-0 size-30 padding-20-30">基础参数</h5>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="适用机型"
          value="内容"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="适用爪子"
          value="内容"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="预设毛利率"
          value="内容"
        />
      </div>
      <div class="size-22 color-7 create-gift-detail-tip">该礼品配置到机台上时，系统会根据此值计算出合理的获奖局数</div>
    </div>
    <div class="margin-top-20 bgcolor-f">
      <h5 class="margin-0 size-30 padding-20-30">天车参数</h5>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="天车前后速度F"
          value="内容"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="天车前后速度L"
          value="内容"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="天车前后速度U"
          value="内容"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="绳长"
          value="内容"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GiftList from '@yun/gift-list'
import { mapState, mapActions } from 'vuex'
export default {
  name: '',

  data () {
    return {
    }
  },

  components: {
    GiftList
  },

  computed: {
    ...mapState({
      giftDetail: state => state.gift.giftDetail
    })
  },

  methods: {
    ...mapActions(['GIFT_GETGIFTCREATEINFO_ACTION']),
    getGiftCreateInfo () {
      const {
        id // gift_id
      } = this.$route.query
      if (id) {
        this.$Loading('加载中……')
        this.GIFT_GETGIFTCREATEINFO_ACTION({ id }).then(res => {
          this.$Loading.clear()
          if (res.return_code !== '0' && res.msg) {
            this.$Tip.warning({
              mask: true,
              message: res.msg
            })
          }
        })
      }
    }
  },
  created () {
    this.getGiftCreateInfo()
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.create-gift-detail-tip
  padding 0 rems(30) rems(20)
</style>
