import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入reset.css
import 'reset-css';

//引入axios的index.js文件
import './axios/index';

//加载resize.js
import './assets/resize';

//引入Swiper的css文件
import 'swiper/css/swiper.css';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
