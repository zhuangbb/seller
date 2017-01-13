<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" :src="seller.avatar" alt="" />
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%" />
        </div>
        <div v-show="detailShow" class="detail" transition="fade">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wraper">
                        <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li v-for="item in seller.supports" class="support-item">
                            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                            <span class="text">{{seller.supports[$index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家公告</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="content">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import star from 'components/star/star';

    export default{
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false
            };
        },
        methods: {
            showDetail() {
                this.detailShow = true;
            },
            hideDetail() {
                this.detailShow = false;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            star
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
@import "../../common/stylus/base.styl";
.header
    color:#fff
    background:rgba(7,17,27,0.5)
    position: relative
    overflow:hidden
    .content-wrapper
        position: relative
        padding:24px 12px 18px 24px
        font-size:0
        .avatar
            display:inline-block
            vertical-align:top
            img
                border-radius:2px
        .content
            display:inline-block
            font-size:14px
            margin-left:16px
            .title
                margin:2px 0 8px 0
                .brand
                    display:inline-block
                    width:30px
                    height:18px
                    vertical-align:top
                    bg-image('brand')
                    background-size: 30px 18px
                    background-repeat:no-repeat
                .name
                    margin-left:6px
                    font-size:16px
                    line-height:18px
                    font-weight:bold
            .description
                margin-bottom:10px
                line-height:12px
                font-size:12px
            .support
                .icon
                    display:inline-block
                    vertical-align:top
                    width:12px
                    height:12px
                    background-size:12px 12px
                    background-repeat:no-repeat
                    margin-right:4px
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    vertical-align:top
                    line-height:12px
                    font-size:10px
        .support-count
            position: absolute
            right:12px
            bottom:14px
            padding:0 8px
            height:24px
            line-height:24px
            border-radius:14px
            color:#fff
            background:rgba(0,0,0,0.2)
            text-align:center
            .count
                vertical-align:top
                font-size:10px
            .icon-keyboard_arrow_right
                font-size:10px
                line-height:24px
                margin-left:2px
    .bulletin-wrapper
        position: relative
        height:28px
        line-height:28px
        padding:0 28px 0 12px
        background:rgba(7,17,27,0.2)
        white-space:nowrap //设置文本不换行
        overflow:hidden  //文本溢出隐藏
        text-overflow:ellipsis //让多余的文本以...代替
        .bulletin-title
            vertical-align:top
            margin-top:8px
            width:22px
            height:12px
            display:inline-block
            bg-image('bulletin')
            background-size:22px 12px
            background-repeat:no-repeat
        .bulletin-text
            vertical-align:top
            margin:0 4px
            font-size:10px
        .icon-keyboard_arrow_right
            position: absolute
            font-size:10px
            right:12px
            top:9px
    .background
        position: absolute
        width:100%
        height:100%
        top:0
        left:0
        z-index:-1
        filter:blur(10px) //滤镜效果
    .detail
        position: fixed
        top:0
        left: 0
        width:100%
        height:100%
        overflow:auto
        transition:all 0.5s
        z-index:9
        backdrop-filter:blur(10px)//兼容苹果手机透明度
        &.fade-transition
            opacity:1
            background:rgba(7,17,27,0.8)
        &.fade-enter,&.fade-leave
            opacity:0
            background:rgba(7,17,27,0)
        .detail-wrapper
            min-height:100%
            width:100%
            .detail-main
                margin-top:64px
                padding-bottom:64px
                .name
                    line-height:16px
                    text-align:center
                    font-size:16px
                    font-weight:700px
                .star-wraper
                    margin-top:18px
                    padding:2px 0
                    text-align:center
                .title
                    display:flex
                    width:80%
                    margin:28px auto 24px auto
                    .line
                        position: relative
                        flex:1
                        top:-6px
                        border-bottom:1px solid rgba(255,255,255,0.2)
                    .text
                        padding:0 12px
                        font-size:14px
                        font-weight:700
                .supports
                    width:80%
                    margin:0 auto
                    .support-item
                        padding:0 12px
                        margin-bottom:12px
                        font-size:0
                        &:last-child
                            margin-bottom:0
                        .icon
                            display:inline-block;
                            width:16px
                            height:16px
                            vertical-align:top
                            margin-right:6px
                            background-size:16px 16px
                            background-repeat:no-repeat
                            &.decrease
                                bg-image('decrease_2')
                            &.discount
                                bg-image('discount_2')
                            &.guarantee
                                bg-image('guarantee_2')
                            &.invoice
                                bg-image('invoice_2')
                            &.special
                                bg-image('special_2')
                        .text
                            line-height: 16px
                            font-size:12px
                .bulletin
                    width:80%
                    margin:0 auto
                    .content
                        padding:0 12px
                        font-size:12px
                        line-height: 24px       
        .detail-close
            position: relative
            width:32px
            height:32px
            margin:-64px auto
            clear:both
            font-size:32px
                   
        
            
            
</style>

