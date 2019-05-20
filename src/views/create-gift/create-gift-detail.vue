<!-- 创建礼品详情 -->
<template>
  <div class="create-gift-detail">
    <div>
      <van-cell
        title="所属商家"
        :value="giftDetail.brand_name"
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
          :value="giftMachineType[giftDetail.machine_type]"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="适用爪子"
          :value="clawType[giftDetail.claws_type]"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="预设毛利率"
          :value="giftDetail.default_earn_rate"
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
          :value="craneSpeed[giftDetail.car_speed_front_back]"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="天车左右速度L"
          :value="craneSpeed[giftDetail.car_speed_left_right]"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="天车上下速度U"
          :value="craneSpeed[giftDetail.car_speed_up_down]"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="绳长"
          :value="giftDetail.line_length"
        />
      </div>
    </div>
    <div class="margin-top-20 bgcolor-f">
      <h5 class="margin-0 size-30 padding-20-30">抓力参数</h5>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="C1抓力"
          :value="giftDetail.grab_voltage"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="C2抓力"
          :value="giftDetail.fall_voltage"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="C3抓力"
          :value="giftDetail.after_fall_voltage"
        />
      </div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="C4抓力"
          :value="giftDetail.vigorously_voltage"
        />
      </div>
    </div>
    <div class="margin-top-20 bgcolor-f">
      <h5 class="margin-0 size-30 padding-20-30">预警参数</h5>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="最大可抓取量"
          :value="giftDetail.max_gift_num"
        />
      </div>
      <div class="size-22 color-7 create-gift-detail-tip">该礼品可抓取区允许摆放的最大数</div>
      <div class="border border-ebedf0"></div>
      <div>
        <van-cell
          title="可抓取安全量"
          :value="giftDetail.min_gift_num"
        />
      </div>
      <div class="size-22 color-7 create-gift-detail-tip">抓取区预警值，低于此值触发预警</div>
    </div>
    <!-- 按钮 -->
    <div class="height-100">
    <div class="fixed-max-width bottom-0 size-0 zindex-2">
        <HhfButton type="info" size="large" @trigger-click="$router.push({ name: 'add_edit_gift', query: {
          id: giftDetail.gift_id
        }})">编辑</HhfButton>
    </div>
    </div>
  </div>
</template>

<script>
import GiftList from '@yun/gift-list'
import HhfButton from '@hhf/hhf-button'
import { GIFT_MACHINE_TYPE, CLAW_TYPE, CRANE_SPEED } from '@l/judge'
import { mapState, mapActions } from 'vuex'
export default {
  name: '',

  data () {
    return {
      giftMachineType: GIFT_MACHINE_TYPE,
      clawType: CLAW_TYPE,
      craneSpeed: CRANE_SPEED
    }
  },

  components: {
    GiftList,
    HhfButton
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
