<!-- 新增编辑礼品 -->
<template>
  <div class="add-edit-gift bgcolor-f2">
    <!-- 所属商家 -->
    <div class="add-edit-gift-margin">
      <template v-if="$route.query.id">
        <van-cell
          title="所属商家"
          :value="brandInfo.brand_name"
        />
      </template>
      <template v-else>
        <van-cell
          title="所属商家"
          :value="brandInfo.brand_name"
          @click="brandShow = true"
          is-link
        />
      </template>
    </div>
    <!-- 礼品信息 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <GiftInfo :result="giftInfo" @trigger-change="(obj) => giftInfo = obj" />
    </div>
    <!-- 基础参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">基础参数</h5>
      <div class="border border-ebedf0"></div>
      <GiftBasicParameters
        :result="basicParam"
        @trigger-change="(obj) => basicParam = obj"
      />
    </div>
    <!-- 天车参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">天车参数</h5>
      <div class="border border-ebedf0"></div>
      <GiftCrownBlockParameters
        :result="carParam"
        @trigger-change="(obj) => carParam = obj"
      />
    </div>
    <!-- 抓力参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">抓力参数</h5>
      <div class="border border-ebedf0"></div>
      <GraspingPowerParameters
        :result="grabParam"
        @trigger-change="(obj) => grabParam = obj"
      />
    </div>
    <!-- 预警参数 -->
    <div class="add-edit-gift-margin bgcolor-f">
      <h5 class="add-edit-gift-title size-30 padding-20-30">预警参数</h5>
      <div class="border border-ebedf0"></div>
      <GiftEarlyWarningParameters
        :result="warnParam"
        @trigger-change="(obj) => warnParam = obj"
      />
    </div>
    <div class="padding-20-30 size-0">
      <HhfButton
        size="large"
        type="info"
        :loading="loading"
        @trigger-click="handleSave"
        radius="0.05rem"
      >保存</HhfButton>
    </div>
    <BottomPopup
      :columns="brandColumn"
      :show="brandShow"
      @trigger-confirm="handleBrandConfirm"
      @trigger-close="brandShow = false"
    />
  </div>
</template>

<script>
import GiftInfo from '@yun/create-gift/gift-info'
import GiftBasicParameters from '@yun/create-gift/gift-basic-parameters'
import GraspingPowerParameters from '@yun/create-gift/grasping-power-parameters'
import GiftCrownBlockParameters from '@yun/create-gift/gift-crown-block-parameters'
import GiftEarlyWarningParameters from '@yun/create-gift/gift-early-warning-parameters'
import BottomPopup from '@yun/bottom-popup'
import HhfButton from '@hhf/hhf-button'
import { setTitle } from '@l/utils'
import { mapState } from 'vuex'
import { getChildBrandListApi, addGiftCreateApi, editGiftCreateApi } from '@/api'
export default {
  name: '',

  data () {
    return {
      storeName: '木马王国',
      loading: false,
      // 所属商家
      brandColumn: [],
      brandInfo: {
        brand_id: '',
        brand_name: ''
      },
      giftInfo: {
        gift_name: '',
        img: ''
      },
      brandShow: false,
      // 基础参数
      basicParam: {
        machine_type: '',
        claw_type: '',
        default_earn_rate: ''
      },
      // 天车参数
      carParam: {
        car_speed_front_back: '',
        car_speed_left_right: '',
        car_speed_up_down: '',
        line_length: ''
      },
      // 抓力参数
      grabParam: {
        grab_voltage: '',
        fall_voltage: '',
        after_fall_voltage: '',
        vigorously_voltage: ''
      },
      // 预警参数
      warnParam: {
        max_gift_num: '',
        min_gift_num: ''
      }
    }
  },

  components: {
    GiftInfo,
    GiftBasicParameters,
    GiftCrownBlockParameters,
    GraspingPowerParameters,
    GiftEarlyWarningParameters,
    HhfButton,
    BottomPopup
  },

  computed: {
    ...mapState({
      giftDetail: state => state.gift.giftDetail
    })
  },

  methods: {
    // 数据初始化
    giftDetailVoluationFunc () {
      const {
        giftDetail
      } = this
      // 商家
      this.brandInfo = {
        brand_id: giftDetail.brand_id, // 商家id
        brand_name: giftDetail.brand_name // 商家名字
      }
      // 礼品信息
      this.giftInfo = {
        gift_name: giftDetail.gift_name,
        img: giftDetail.img
      }
      // 基础信息
      this.basicParam = {
        machine_type: giftDetail.machine_type, // 机型
        claw_type: giftDetail.claws_type, // 爪型
        default_earn_rate: giftDetail.default_earn_rate // 利率
      }
      // 天车参数
      this.carParam = {
        car_speed_front_back: giftDetail.car_speed_front_back, // 天车前后速度F
        car_speed_left_right: giftDetail.car_speed_left_right, // 天车左右速度L
        car_speed_up_down: giftDetail.car_speed_up_down, // 天车上下速度U
        line_length: giftDetail.line_length // 绳长
      }
      // 抓力参数
      this.grabParam = {
        grab_voltage: giftDetail.grab_voltage, // 和抓电压C1
        fall_voltage: giftDetail.fall_voltage, // 落物电压C2
        after_fall_voltage: giftDetail.after_fall_voltage, // 落物后电压C3
        vigorously_voltage: giftDetail.vigorously_voltage // 大力电压C4
      }
      // 预警参数
      this.warnParam = {
        max_gift_num: giftDetail.max_gift_num, // 最大可抓取量
        min_gift_num: giftDetail.min_gift_num // 可抓取安全量
      }
    },
    handleChangeBasic (dt) {
      this.basicData = dt
    },
    // 获取商家列表
    getChildBrandListFunc () {
      getChildBrandListApi().then(res => {
        if (res.return_code === '0') {
          this.childBrandArrange(res.data)
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          })
        }
      })
    },
    // 商家列表数据整理
    childBrandArrange (data) {
      const values = []
      let defaultIndex = 0
      data.forEach((v, i) => {
        if (this.brandId === v.id) {
          defaultIndex = i
        }
        values.push({
          text: v.name,
          id: v.id
        })
      })
      this.brandColumn = [{
        values,
        defaultIndex
      }]
    },
    // 选中商家
    handleBrandConfirm (obj) {
      const value = obj.value[0]
      this.brandInfo = {
        brand_id: value.id,
        brand_name: value.text
      }
    },
    // 格式判断
    judgeFormatFunc (value, range) {
      const start = range[0]
      const end = range[1]
      return ((/^[0-9]+$/.test(String(value)) && value >= start && value <= end) || value === '')
    },
    // 保存
    handleSave () {
      let {
        brandInfo: { brand_id: brandId },
        giftInfo: { gift_name: giftName, img },
        basicParam: {
          machine_type: machineType,
          claw_type: clawType,
          default_earn_rate: defaultEarnRate
        },
        carParam: {
          car_speed_front_back: carSpeedFrontBack,
          car_speed_left_right: carSpeedLeftRight,
          car_speed_up_down: carSpeedUpDown,
          line_length: lineLength
        },
        grabParam: {
          grab_voltage: grabVoltage,
          fall_voltage: fallVoltage,
          after_fall_voltage: afterFallVoltage,
          vigorously_voltage: vigorouslyVoltage
        },
        warnParam: {
          max_gift_num: maxGiftNum,
          min_gift_num: minGiftNum
        }
      } = this
      let {
        id
      } = this.$route.query
      if (!brandId) {
        this.$Tip.warning('请选择商家')
        return
      }
      if (!giftName) {
        this.$Tip.warning('请填写礼品名称')
        return
      }
      if (!img) {
        this.$Tip.warning('请添加礼品图片')
        return
      }
      if (!machineType) {
        this.$Tip.warning('请选择适用机型')
        return
      }
      if (!clawType) {
        this.$Tip.warning('请选择适用爪子')
        return
      }
      if (!this.judgeFormatFunc(defaultEarnRate, [1, 100])) {
        this.$Tip.warning('预设毛利率格式不正确')
        return
      }
      if (!carSpeedFrontBack) {
        this.$Tip.warning('请选择天车前后速度F')
        return
      }
      if (!carSpeedLeftRight) {
        this.$Tip.warning('天车左右速度L')
        return
      }
      if (!carSpeedUpDown) {
        this.$Tip.warning('天车上下速度U')
        return
      }
      if (!this.judgeFormatFunc(lineLength, [1, 100])) {
        this.$Tip.warning('绳长格式不正确')
        return
      }
      if (!this.judgeFormatFunc(grabVoltage, [1, 100])) {
        this.$Tip.warning('C1抓力格式不正确')
        return
      }
      if (!this.judgeFormatFunc(fallVoltage, [1, 100])) {
        this.$Tip.warning('C2抓力格式不正确')
        return
      }
      if (!this.judgeFormatFunc(afterFallVoltage, [1, 100])) {
        this.$Tip.warning('C3抓力格式不正确')
        return
      }
      if (!this.judgeFormatFunc(vigorouslyVoltage, [1, 100])) {
        this.$Tip.warning('C4抓力格式不正确')
        return
      }
      if (!this.judgeFormatFunc(maxGiftNum, [1, 99])) {
        this.$Tip.warning('最大可抓取量格式不正确')
        return
      }
      if (!this.judgeFormatFunc(minGiftNum, [1, 99])) {
        this.$Tip.warning('可抓取安全量格式不正确')
        return
      }
      defaultEarnRate = defaultEarnRate || 75
      lineLength = lineLength || 18
      grabVoltage = grabVoltage || 48
      fallVoltage = fallVoltage || 10
      afterFallVoltage = afterFallVoltage || 8
      vigorouslyVoltage = vigorouslyVoltage || 48
      maxGiftNum = maxGiftNum || 6
      minGiftNum = minGiftNum || 3
      if (maxGiftNum < minGiftNum) {
        this.$Tip.warning('最大可抓取量必须大于等于可抓取安全量')
        return
      }
      this.loading = true
      const jsons = {
        name: giftName, // 礼品名称
        claws_type: clawType, // 适用抓型
        machine_type: machineType, // 适用机型
        default_earn_rate: defaultEarnRate, // 预设盈利率
        img: img.replace(/^(http.*com\/)/, ''), // 图片地址
        car_speed_front_back: carSpeedFrontBack, // 天车前后速度
        car_speed_left_right: carSpeedLeftRight, // 天车左右速度
        car_speed_up_down: carSpeedUpDown, // 天车上下速度
        line_length: lineLength, // 绳长
        grab_voltage: grabVoltage, // C1
        fall_voltage: fallVoltage, // C2
        after_fall_voltage: afterFallVoltage, // C3
        vigorously_voltage: vigorouslyVoltage, // C4
        max_gift_num: maxGiftNum, // 最大可抓取量
        min_gift_num: minGiftNum // 可抓取安全量
      }
      if (id) { // 编辑修改礼品
        jsons.gift_id = id
        this.editGiftCreate(jsons)
      } else { // 增加礼品
        jsons.brand_id = brandId // 子品牌id
        this.addGiftCreate(jsons)
      }
    },
    //  增加礼品
    addGiftCreate (data) {
      const $this = this
      const {
        url
      } = $this.$route.query
      addGiftCreateApi(data).then(res => {
        this.loading = false
        if (res.return_code === '0') {
          this.$Tip.success({
            message: '保存成功',
            mask: true,
            close () {
              if (url) {
                // $this.$router.push({
                //   ...JSON.parse(decodeURIComponent(decodeURIComponent(url)))
                // })
                $this.$router.go(-1)
              } else {
                $this.$router.push({
                  name: 'create_gift_list'
                })
              }
            }
          })
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          })
        }
      })
    },
    // 编辑礼品
    editGiftCreate (data) {
      const $this = this
      editGiftCreateApi(data).then(res => {
        if (res.return_code === '0') {
          this.$Tip.success({
            message: '保存成功',
            mask: true,
            close () {
              $this.$router.go(-1)
            }
          })
        } else if (res.msg) {
          this.$Tip.warning({
            message: res.msg,
            mask: true
          })
        }
      })
    }
  },
  created () {
    const { id } = this.$route.query
    if (id) {
      this.giftDetailVoluationFunc()
      setTitle('编辑礼品')
      if (this.giftDetail.gift_id !== id) {
        this.$router.go(-1)
        return
      }
    } else {
      setTitle('新增礼品')
    }
    this.getChildBrandListFunc()
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.add-edit-gift
  .add-edit-gift-margin
    margin-top rems(20)
  .add-edit-gift-title
    margin 0
</style>
