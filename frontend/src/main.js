import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window.requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(f){return setTimeout(f, 1000/60)}

new Vue({
  render: h => h(App)
}).$mount('#app')
