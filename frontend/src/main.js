import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (f) { return setTimeout(f, 1000 / 60) }

new Vue({
  render: h => h(App)
}).$mount('#app')
