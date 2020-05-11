import Vue from "vue";
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,//不能处理异步代码
  actions,//异步代码在这里处理
  getters,
});
