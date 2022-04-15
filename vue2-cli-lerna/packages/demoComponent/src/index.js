import demoComponent from './index.vue'
export default {
  install(Vue) {
    Vue.component(demoComponent.name, demoComponent)
  }
}