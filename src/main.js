import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';

import 'common/stylus/index.styl';

// 注册模块
Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
    linkActiveClass: 'active'
});

router.map({
    'goods': {
        component: goods
    },
    'seller': {
        component: seller
    },
    'ratings': {
        component: ratings
    }
});

router.start(app, '#app');
// 默认进入goods页面
router.go('/seller');
