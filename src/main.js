import Vue from "vue";
import axios from "axios"
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";

axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 8000
axios.defaults.headers.appKey ='f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'

//响应拦截
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.error_code === 0){
    return res.data || ''
  }else{
    return Promise.reject(new Error(res.error_smg || '获取失败'))
  }
}, function (error) {
  console.log('error' , error)
  return Promise.reject(error);
});
Vue.use(VueAxios,axios)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
