import Vue from 'vue'
import axios from 'axios'
import Particles from "particles.vue"
import http from '../http-common'
import store from '../store/index'


Vue.use(Particles)
Vue.prototype.$http = http;


http.interceptors.request.use((config) => {
  const token = store().state.auth.user.token;

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

Vue.use(require('vue-moment'));


