import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import 'materialize-css/dist/css/materialize.min.css';
//import 'material-design-icons/iconfont/material-icons.css';
//import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
import "bootswatch/dist/solar/bootstrap.min.css"
//import 'bootstrap-dark-5/dist/css/bootstrap-night.min.css'
import 'bootstrap/dist/js/bootstrap.js'
//import VueCryptojs from 'vue-cryptojs'
//import VueCryptojs from 'vue-cryptojs' use(VueCryptojs)

//import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios';
import VueAxios from 'vue-axios';
//https://www.youtube.com/watch?v=6ESNnWJFrIM
//axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL = 'https://web-production-cc96.up.railway.app/api/recommendations/1.0';
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NDcwNTE3NCwianRpIjoiNzI1MTUwNmItODBkMS00NzdmLWJmMzUtNWIwZjcyNTJmZDkyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjEiLCJuYmYiOjE2ODQ3MDUxNzQsImV4cCI6MTcxMDYyNTE3NH0.42ODAvuEIbgmilOszio43hY6dvQ3AVGfRDPqTkE4Z4M';
createApp(App).use(router).use(VueAxios,axios).mount('#app')
