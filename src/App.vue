<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>

    </div>
    <!-- 路由外链  对应上面的 v-link -->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import {urlParse} from 'common/js/util';
import header from 'components/header/header.vue';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      // 成功的时候回调函数，可以有多个状态或者权限
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      }
    }, (response) => {
      response = response.body;
      // 失败的时候回调函数
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';
  @import './common/stylus/base.styl';
  .tab
    display:flex
    width:100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align:center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
