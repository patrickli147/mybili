import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import state from './state/index';
import Vant from 'vant';
import 'vant/lib/index.css';

import http from './utils/http';
Vue.prototype.$http = http;

import {Toast} from 'vant';
Vue.prototype.$toast = Toast;

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  state
}).$mount('#app')
