<template>
    <div class="ratings" v-el:ratings>
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
                        <div class="avatar">
                            <img width="28" :src="rating.avatar" alt="" />
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="item" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import star from 'components/star/star';
    import split from 'components/split/split';
    import {formatDate} from 'common/js/date';
    import ratingselect from 'components/ratingselect/ratingselect';

    const ALL = 2;
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: true
            };
        },
        methods: {
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
        created() {
            this.$http.get('/api/ratings').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.ratings = response.data;
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$els.ratings, {
                            click: true
                        });
                    });
                }
            }, (response) => {
                // 失败回调函数
            });
        },
        components: {
            star,
            split,
            ratingselect
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
    
    .ratings
        position: absolute
        width:100%
        top:174px
        left:0px
        bottom:0
        overflow:hidden
        .overview
            display:flex
            padding:18px 0
            .overview-left
                flex:0 0 137px
                width:137px
                padding:6px 0
                text-align:center
                border-right:1px solid rgba(7,17,27,0.1)
                @media only screen and (max-width: 320px)
                    flex:0 0 120px
                    width:120px
                .score
                    font-size:24px
                    color:rgb(255,153,0)
                    line-height: 28px
                .title
                    font-size:12px
                    color:rgb(7,17,27)
                    line-height: 12px
                    margin:6px 0 8px 0
                .rank
                    font-size:10px
                    line-height: 10px
                    color:rgb(147,153,159)
            .overview-right
                flex:1
                padding:6px 0 6px 24px
                @media only screen and (max-width: 320px)
                    padding-left:6px
                .score-wrapper
                    line-height: 18px
                    margin-bottom:8px
                    font-size:0px
                    .title
                        font-size:12px
                        color:rgb(7,17,27)
                        display:inline-block
                        vertical-align:top
                    .star
                        margin:0 12px
                        display:inline-block
                        vertical-align:top
                    .score
                        font-size:12px
                        color:rgb(250,153,0)
                        line-height: 18px
                        display:inline-block
                        vertical-align:top
                .delivery-wrapper
                    .title
                        font-size:12px
                        color:rgb(7,17,27)
                    .deliveryTime
                        font-size:12px
                        color:rgb(147,153,159)
                        margin-left:12px
        .rating-wrapper
            padding:0 18px
            .rating-item
                display:flex
                padding:18px 0
                border-1px(rgba(7,17,27,0.1))
                .avatar
                    flex:0 0 28px
                    width:28px
                    margin-right:12px
                    img
                        border-radius:50%
                .content
                    position: relative
                    flex:1
                    .name
                        font-size:10px
                        line-height: 12px
                        color:rgb(7,17,27)
                        margin-bottom:4px
                    .star-wrapper
                        margin-bottom:6px
                        font-size:0
                        .star
                            display:inline-block;
                            vertical-align:top
                            margin-right:6px
                        .delivery
                            font-size:10px
                            line-height: 12px
                            color:rgb(147,153,159)
                    .text
                        font-size:12px
                        color:rgb(7,17,27)
                        line-height: 18px
                        margin-bottom:8px
                    .recommend
                        line-height: 16px
                        font-size:0px
                        .icon-thumb_up,.item
                            display:inline-block;
                            margin-right:8px
                            margin-bottom:4px
                            font-size:9px
                        .icon-thumb_up
                            color:rgb(0,160,220)
                        .item
                            padding:0 6px
                            border:1px solid rgba(7,17,27,0.1)
                            border-radius:1px
                            color:rgb(147,153,159)
                            background:#fff
                    .time
                        position: absolute
                        top:0
                        right:0
                        line-height: 12px
                        font-size:10px
                        color:rgb(147,153,159)   
</style>