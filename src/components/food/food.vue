<template>
    <div class="food" v-show="showFlag" transition="move" v-el:food>
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="" />
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                    <span class="now">{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count === 0" transition="fade">加入购物车</div>
            </div>
            <split v-show="food.info"></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品介绍</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">商品评价</h1>
                <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img class="avatar" :src="rating.avatar" width="12" />
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <span class="icon" :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}</p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import {formatDate} from 'common/js/date';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$els.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$dispatch('cart.add', event.target);
                Vue.set(this.food, 'count', 1);
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        },
        events: {
            'ratingtype.select'(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            'toggle.content'(onlyContent) {
                this.onlyContent = onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            }
        },
        components: {
            cartcontrol, split, ratingselect
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl';
    
    .food
        position: fixed
        top:0
        left:0
        width:100%
        background:#fff
        bottom:48px
        z-index:6
        &.move-transition
            transform:translate3d(0,0,0)
            transition:all 0.3s linear
        &.move-enter,&.move-leave
            transform:translate3d(100%,0,0)
        .image-header
            position: relative
            width:100%
            height:0
            padding-top:100%
            img
                position: absolute
                top:0
                left:0
                width:100%
                height:100%
            .back
                position: absolute
                top:10px
                left:0
                .icon-arrow_lift
                    font-size:20px
                    display:block
                    padding:10px
                    color:#fff
        .content
            padding:18px
            position: relative
            .title
                line-height: 14px
                margin-bottom:8px
                font-size:14px
                font-weight:700
                color:rgb(7,17,27)
            .detail
                margin-bottom:18px
                line-height:10px
                font-size:0
                height:10px
                .sell-count,.rating
                    font-size:10px
                    color:rgb(147,153,159)
                .sell-count
                    margin-right:12px
            .price
                font-weight:700
                line-height:24px
                .now
                    margin-right:8px
                    font-size:14px
                    color:rgb(240,20,20)
                .old
                    text-decoration:line-through
                    font-size:10px
                    color:rgb(147,153,159)
            .cartcontrol-wrapper
                position: absolute
                right:12px
                bottom:12px
            .buy
                position: absolute
                right:18px
                bottom:18px
                z-index:10
                height:24px
                line-height:24px
                text-align:center
                padding:0 12px
                box-sizing:border-box
                font-size:10px
                border-radius:12px
                color:#fff
                background:rgb(0,160,220)
                &.fade-transition
                    opacity:1
                    transition:all 0.2s
                &.fade-enter,&.fade-leave
                    opacity:0
        .info
            padding:18px
            .title
                font-size:14px
                line-height:14px
                color:rgb(7,17,27)
                margin-bottom:6px
            .text
                font-size:12px
                color:rgb(77,85,93)
                line-height:24px
                padding:0 8px
        .rating
            padding-top:18px
            .title
                font-size:14px
                line-height:14px
                color:rgb(7,17,27)
                margin-left:18px
            .rating-wrapper
                padding:0 18px
                .rating-item
                    padding:16px 0
                    position: relative
                    border-1px(rgba(7,17,27,0.1))
                    .user
                        position: absolute
                        top:16px
                        right:0px
                        font-size:0
                        line-height: 12px
                        .name
                            display:inline-block
                            vertical-align:top
                            font-size:10px
                            color:rgb(147,153,159)
                            line-height: 12px
                            margin-right:6px
                        .avatar
                            border-radius:50%
                    .time
                        font-size:10px
                        color:rgb(147,153,159)
                        line-height: 12px
                        margin-bottom:6px
                    .text
                        line-height: 16px
                        font-size:12px
                        color:rgb(7,17,27)
                        .icon-thumb_up,.icon-thumb_down
                            line-height: 16px
                            margin-right:4px
                            font-size:12px
                            color:rgb(0,160,220)
                        .icon-thumb_down
                            color:rgb(147,153,159)
                .no-rating
                    padding:16px 0
                    font-size:12px
                    color:rgb(147,153,159)
                    text-align:center
                            
                    
                
</style>

