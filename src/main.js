import Vue from "vue";
import axios from "axios"
import VueAxios from 'vue-axios'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyload from 'vue-lazyload'
import AwesomePicker from 'vue-awesome-picker';
import Loading from './pulgin/loading'
import Modal from './pulgin/modal'
import Toast from './pulgin/toast'

import { Calendar  } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Dialog } from 'vant';

axios.defaults.baseURL = '/api/'
axios.defaults.timeout = 8000
axios.defaults.headers.appKey ='f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'

//响应拦截
axios.interceptors.response.use(function (response) {
  const res = response.data
  if(res.error_code === 0){
    return res.data || ''
  }else{
    return Promise.reject(new Error(res.error_msg || '获取失败'))
  }
}, function (error) {
  console.log('error' , error)
  return Promise.reject(error);
});
Vue.use(VueAxios,axios)

Vue.use(AwesomePicker)
//图片懒加载
Vue.use(VueLazyload,{
  loading:"./images/loading-svg/loading-spinning-bubbles.svg"
})

Vue.use(Loading)
Vue.use(Modal)
Vue.use(Toast)
Vue.config.productionTip = false

Vue.use(Calendar);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Dialog);

 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
