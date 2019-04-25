import {
  getMachineDetailApi, // 获取机台详情
  saveEarlyParamApi, // 保存预警参数
  savePlayPriceApi, // 保存游玩单价
  getOperateParamApi, // 获取运营参数
  setOperateParamApi // 下发运营参数
} from '@/api'
import { CRANE_SPEED, CRANE_DELAY, PAW_POSITION_C2 } from '@l/judge'
export default {
  state: {
    store_name: '', // 门店
    no: '', // 编号
    machine_id: '', // 资产id
    type_name: '', // 机型
    claw_type: '', // 爪型
    coins_sell: '', // 游玩单价
    is_online: '', // 1在线 0不在线
    gift_info: [], // 在售礼品
    can_claw_num: '', // 可抓取量
    can_claw_safe_num: '', // 可抓取安全量

    key22: '', // 游玩模式 0固定 1随机(武马行主板)
    key29: '', // 游玩模式 0固定 1随机(花花世界主板)
    main_board: '', // 主板类型 1为武马行主板 2为花花世界
    key32: '', // 获奖局数（花花世界主板）
    award_count: '', // 获奖局数（武马行主板）
    money_cost: '', // 礼品成本
    coins_value: '', // 平台币值
    // 天车参数
    car_speed_front_back: '', // 天车前后速度F 0 最快 1快 2中 3慢 4最慢
    car_speed_front_back_value: '', // 天车前后速度F 0 最快 1快 2中 3慢 4最慢
    car_speed_left_right: '', // 天车前后速度L 0 最快 1快 2中 3慢 4最慢
    car_speed_left_right_value: '', // 天车前后速度L 0 最快 1快 2中 3慢 4最慢
    car_speed_up_down: '', // 天车上下速度U 0 最快 1快 2中 3慢 4最慢
    car_speed_up_down_value: '', // 天车上下速度U 0 最快 1快 2中 3慢 4最慢
    key20: '', // 碰上停DELAY 0 0秒 1 0.2秒 2 0.4秒 3 0.6秒
    key20_value: '', // 碰上停DELAY 0 0秒 1 0.2秒 2 0.4秒 3 0.6秒
    line_length: '', // 绳长
    // 抓力参数
    grab_voltage: '', // 和抓电压C1
    fall_voltage: '', // 落物电压C2
    after_fall_voltage: '', // 落物后电压C3
    vigorously_voltage: '', // 大力电压C4
    key21: '', // 变c2点 0 上停 1 6/10 2 7/10 3 8/10 4 9/10
    key21_value: '', // 变c2点 0 上停 1 6/10 2 7/10 3 8/10 4 9/10
    // 游玩参数
    game_time: '', // 游戏时间
    game_times_shutdown: '', // 投币局数开机恢复 0否 1是
    key16: '', // 一局几脉冲
    power_times: '', // 出奖局数开机恢复 0否 1是
    sky_grab_thing: '', // 空中取物 0否 1是
    // 音乐参数
    await_music: '', // 待机音乐 0否 1是
    key23: '', // 背景音乐
    key24: '', // 下抓音乐
    key25: '', // 中奖音乐
    key26: '', // 投币音乐
    key27: '', // 报警音乐
    key28: '' // 音量
  },
  mutations: {
    // 获取机器详情
    MACHINE_MACHINEDETAIL_MUTATE (state, { machineInfo, giftInfo }) {
      state.store_name = machineInfo.store_name
      state.no = machineInfo.no
      state.is_online = machineInfo.is_online
      state.machine_id = machineInfo.machine_id
      state.type_name = machineInfo.type_name
      state.claw_type = machineInfo.claw_type
      state.coins_sell = machineInfo.coins_sell
      state.can_claw_num = machineInfo.can_claw_num
      state.can_claw_safe_num = machineInfo.can_claw_safe_num
      state.gift_info = giftInfo
    },
    // 保存预警参数
    MACHINE_SAVEEARLYPARAM_MUTATE (state, { canClawNum, canClawSafeNum }) {
      state.can_claw_num = canClawNum
      state.can_claw_safe_num = canClawSafeNum
    },
    // 保存游玩单价
    MACHINE_SAVEPLAYPRICE_MUTATE (state, { coinsSell }) {
      state.coins_sell = coinsSell
    },
    // 获取运营参数
    MACHINE_GETOPERATEPARAM_MUTATE (state, data) {
      state.key22 = data.key22 // 游玩模式 0固定 1随机(武马行主板)
      state.key29 = data.key29 // 游玩模式 0固定 1随机(花花世界主板)
      state.main_board = data.main_board // 主板类型 1为武马行主板 2为花花世界
      state.key32 = data.key32 // 获奖局数（花花世界主板）
      state.award_count = data.award_count // 获奖局数（武马行主板）
      state.coins_sell = data.coins_sell // 游玩单价
      state.money_cost = data.money_cost // 礼品成本
      state.coins_value = data.coins_value // 平台币值
      // 天车参数
      state.car_speed_front_back = data.car_speed_front_back // 天车前后速度F 0 最快 1快 2中 3慢 4最慢
      state.car_speed_front_back_value = CRANE_SPEED[data.car_speed_front_back] // 天车前后速度F 0 最快 1快 2中 3慢 4最慢
      state.car_speed_left_right = data.car_speed_left_right // 天车前后速度L 0 最快 1快 2中 3慢 4最慢
      state.car_speed_left_right_value = CRANE_SPEED[data.car_speed_left_right] // 天车前后速度L 0 最快 1快 2中 3慢 4最慢
      state.car_speed_up_down = data.car_speed_up_down // 天车上下速度U 0 最快 1快 2中 3慢 4最慢
      state.car_speed_up_down_value = CRANE_SPEED[data.car_speed_up_down] // 天车上下速度U 0 最快 1快 2中 3慢 4最慢
      state.key20 = data.key20 // 碰上停DELAY 0 0秒 1 0.2秒 2 0.4秒 3 0.6秒
      state.key20_value = CRANE_DELAY[data.key20] // 碰上停DELAY 0 0秒 1 0.2秒 2 0.4秒 3 0.6秒
      state.line_length = data.line_length // 绳长
      // 抓力参数
      state.grab_voltage = data.grab_voltage // 和抓电压C1
      state.fall_voltage = data.fall_voltage // 落物电压C2
      state.after_fall_voltage = data.after_fall_voltage // 落物后电压C3
      state.vigorously_voltage = data.vigorously_voltage // 大力电压C4
      state.key21 = data.key21 // 变c2点 0 上停 1 6/10 2 7/10 3 8/10 4 9/10
      state.key21_value = PAW_POSITION_C2[data.key21] // 变c2点 0 上停 1 6/10 2 7/10 3 8/10 4 9/10
      // 游玩参数
      state.game_time = data.game_time // 游戏时间
      state.game_times_shutdown = data.game_times_shutdown // 投币局数开机恢复 0否 1是
      state.key16 = data.key16 // 一局几脉冲
      state.power_times = data.power_times // 出奖局数开机恢复 0否 1是
      state.sky_grab_thing = data.sky_grab_thing // 空中取物 0否 1是
      // 音乐参数
      state.await_music = data.await_music // 待机音乐 0否 1是
      state.key23 = data.key23 // 背景音乐
      state.key24 = data.key24 // 下抓音乐
      state.key25 = data.key25 // 中奖音乐
      state.key26 = data.key26 // 投币音乐
      state.key27 = data.key27 // 报警音乐
      state.key28 = data.key28 // 音量
    },
    // 下发运营参数
    MACHINE_SETOPERATEPARAM_MUTATE (state, data) {
      state.key22 = data.key22
      state.award_count = data.award_count
      state.await_music = data.await_music
      state.key29 = data.key29
      state.key32 = data.key32
      state.game_time = data.game_time
      state.game_times_shutdown = data.game_times_shutdown
      state.power_times = data.power_times
      state.sky_grab_thing = data.sky_grab_thing
    }
  },
  actions: {
    // 获取机器详情
    async MACHINE_MACHINEDETAIL_ACTION ({ commit }, { id }) {
      let res = await getMachineDetailApi({ machine_id: id })
      if (res.return_code === '0') {
        commit('MACHINE_MACHINEDETAIL_MUTATE', {
          machineInfo: res.data.machine_info,
          giftInfo: res.data.gift_info
        })
      }
      return res
    },
    // 保存预警参数
    async MACHINE_SAVEEARLYPARAM_ACTION ({ commit }, { machineId, canClawNum, canClawSafeNum }) {
      const res = await saveEarlyParamApi({
        machine_id: machineId,
        can_claw_num: canClawNum,
        can_claw_safe_num: canClawSafeNum
      })
      if (res.return_code === '0') {
        commit('MACHINE_SAVEEARLYPARAM_MUTATE', { canClawNum, canClawSafeNum })
      }
      return res
    },
    // 保存游玩单价
    async MACHINE_SAVEPLAYPRICE_ACTION ({ commit }, { machineId, coinsSell }) {
      const res = await savePlayPriceApi({
        machine_id: machineId,
        coins_sell: coinsSell
      })
      if (res.return_code === '0') {
        commit('MACHINE_SAVEPLAYPRICE_MUTATE', { coinsSell })
      }
      return res
    },
    // 获取运营参数
    async MACHINE_GETOPERATEPARAM_ACTION ({ commit }, { machineId }) {
      const res = await getOperateParamApi({
        machine_id: machineId
      })
      if (res.return_code === '0') {
        commit('MACHINE_GETOPERATEPARAM_MUTATE', res.data)
      }
      return res
    },
    // 下发运营参数
    async MACHINE_SETOPERATEPARAM_ACTION ({ commit, state }, { machineId, data }) {
      data = {
        ...data,
        car_speed_front_back: state.car_speed_front_back,
        car_speed_left_right: state.car_speed_left_right,
        car_speed_up_down: state.car_speed_up_down,
        key20: state.key20,
        line_length: state.line_length,
        grab_voltage: state.grab_voltage,
        fall_voltage: state.fall_voltage,
        vigorously_voltage: state.vigorously_voltage,
        key21: state.key21
      }
      if (state.main_board === '2') {
        data = {
          ...data,
          key23: state.key23,
          key24: state.key24,
          key25: state.key25,
          key26: state.key26,
          key27: state.key27,
          key28: state.key28
        }
      }
      const res = await setOperateParamApi({
        machine_id: machineId,
        data
      })
      if (res.return_code === '0') {
        commit('MACHINE_SETOPERATEPARAM_MUTATE', data)
      }
      return res
    }
  }
}
