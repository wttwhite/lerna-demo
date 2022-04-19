import 'core-js/modules/es.function.name.js';

var demoComponent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("这是一个demo组件插件")])},
staticRenderFns: [],
  name: 'DemoComponent'
};

var index = {
  install: function install(Vue) {
    Vue.component(demoComponent.name, demoComponent);
  }
};

export { index as default };
