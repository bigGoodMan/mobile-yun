import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import app from "./modules/app";
import machine from "./modules/machine";
import common from "./modules/common";
import inventory from "./modules/inventory";
import gift from "./modules/gift";
import intelligentGrasp from "./modules/intelligent-grasp";
import switchgear from "./modules/switchgear";
import trainingCamp from "./modules/training-camp";
import setMeal from "./modules/set-meal";

Vue.use(Vuex);
// 数据初始化保存
const initData = {
  user: user.state,
  app: app.state,
  machine: machine.state,
  common: common.state,
  inventory: inventory.state,
  gift: gift.state,
  intelligentGrasp: intelligentGrasp.state,
  switchgear: switchgear.state,
  trainingCamp: trainingCamp.state,
  setMeal: setMeal.state
};
export default new Vuex.Store({
  state: {},
  mutations: {
    CLEARSTATE_MUTATE(state) {
      for (const key in state) {
        for (const name in state[key]) {
          state[key][name] = initData[key][name];
        }
      }
    }
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    machine,
    common,
    inventory,
    gift,
    intelligentGrasp,
    switchgear,
    trainingCamp,
    setMeal
  }
});
