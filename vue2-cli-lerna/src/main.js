import Vue from 'vue'
import App from './App.vue'
import demoComponent from '../packages/demoComponent/src'
console.log({demoComponent})
Vue.use(demoComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
