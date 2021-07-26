import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/'
  // baseURL: 'https://52e25aa1f43b.ngrok.io'
})

Vue.prototype.$axios = axiosInstance
