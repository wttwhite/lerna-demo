import Vue from 'vue'
import App from './App.vue'
// import demoComponent from '../packages/demoComponent/src'
// 测试打包之后的文件引用
import demoComponent from '../packages/demoComponent/lib/demoComponent'
console.log({demoComponent})
Vue.use(demoComponent)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
