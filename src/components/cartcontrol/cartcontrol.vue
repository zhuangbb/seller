<template>
    <div class="cartcontrol">
       <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreasecart" transition="move">
            <span class="inner icon-remove_circle_outline"></span>
       </div>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
       <div class="cart-add icon-add_circle" @click.stop.prevent="addcart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
        props: {
          food: Object
        },
        methods: {
            addcart(event) {
                if (!event._constructed) {
                    return;
                }
                if (!this.food.count) {
                    // this.food.count = 1; vue不会对之前新建的对象派发事件，需要引用vue.set()API
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                // 派发点击+之后的事件
                this.$dispatch('cart.add', event.target);
            },
            decreasecart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count > 0) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size:0
    .cart-decrease
        padding:6px
        display:inline-block
        transition:all 0.4s linear
        &.move-transition
            opacity:1
            transform:translate3d(0,0,0)
            .inner
                display:inline-block;
                font-size:24px
                color:rgb(0,160,220)
                line-height: 24px
                transition:all 0.4s linear
                transform:rotate(0deg)
        &.move-enter,&.move-leave
            opacity:0
            transform:translate3d(24px,0,0)
            .inner
                transform:rotate(180deg)
    .cart-count
        display:inline-block
        font-size:10px
        color:rgb(147,153,159)
        line-height:24px
        vertical-align:top
        width:12px
        padding-top:6px
        text-align:center
    .cart-add
        display: inline-block
        font-size:24px
        color:rgb(0,160,220)
        line-height: 24px
        padding:6px
            
</style>