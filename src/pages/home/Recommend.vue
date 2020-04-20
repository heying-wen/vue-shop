<template>
<div class="recommend-container">
    <div class="title">
        <span>精品推荐</span>
        <span class="iconfont more">更多 &#xe60b;</span>
    </div>
    <div class="goods-list-container" ref="wrapper">
        <div class="goods-list" ref="recommend" v-if="show">
            <div class="goods-item" v-for="item of recommendList" :key="item.id">
                <img :src="item.img" class="goods-img">
                <div class="goods-fote">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">{{item.price}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props:{
        recommendList:Array
    },
    computed:{
        show (){
        return !!this.recommendList.length
        }
    },
    watch:{

    },
    mounted (){
        this.$nextTick(() =>{
            this.initScroll()
        })
    },
    
    data(){
        return {
            scroll:null,
            scrollOptions:{
                startX: 0,
                click: true,
                scrollX: true,
                scrollY: false,
                eventPassthrough: 'vertical' // 忽略竖直方向的滚动
            }
        }
    },
    methods:{
        initScroll(){
            const goodsListWidth = this.recommendList.length * 2.2
            this.$refs.recommend.style.width = goodsListWidth + 'rem'
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.wrapper, this.scrollOptions)
            } else {
            this.scroll.refresh() // 重新属性BScroll状态
            }
        }
    }
}
</script>

<style lang="scss" scopeds>
@import "~@/assets/scss/global";
.recommend-container{
    @include container-layout (4.1rem);
    .title{
        width:100%;
        @include layout-flex( $justify:space-between);
        height: .4rem;
        border-left: .08rem solid $color-A;
        text-indent: .2rem;
        box-sizing: border-box;
        font-weight: 600;
        font-size: .32rem;
        color: $color-B;
        .more{
            font-weight: 400;
            color: $color-C;
            font-size: .24rem;
        }
    }
    .goods-list-container{
        width: 100%;
        height: 3.2rem;
        margin-top: .2rem;
        overflow: hidden;
        .goods-list{
            display: flex;
            .goods-item{
                width: 2rem;
                height: 100%;
                margin-right: .2rem;
                border-radius: .1rem;
                box-sizing: border-box;
                @include layout-flex (column);
                overflow: hidden;
                .goods-img{
                    width: 100%;
                    height: 2.1rem;
                }
                .goods-fote{
                    height: 0;
                    flex: 1;
                    width: 90%;
                    margin-bottom: .2rem;
                    @include layout-flex (column ,space-between,flex-start);
                    .goods-name{
                        width: 100%;
                        height: .3rem;
                        line-height: .3rem;
                        font-size: .2rem;
                        color:$color-C;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
            }
        }
        
    }
}
</style>