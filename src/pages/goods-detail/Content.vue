<template>
<div>
    <div class="content-container">
        <div class="goods-price">￥
            <span>{{goods.goods_price}}</span>
        </div>
        <div class="market-price">价格：￥
            <span>{{goods.market_price}}</span>
        </div>
        <div class="goods-name">{{goods.goods_name}}</div>
        <div class="sale-container">
            <div class="sale-num">月销量：{{goods.sale_num}}</div>
            <div class="stock">库存：{{goods.stock}}</div>
        </div>
    </div>
    <div class="discount-container">
        <div class="dic border-bottom" @click="getCoupon">
            <span>优惠</span>
            <div class="discount">领取优惠券</div>
            <span class="iconfont">领取&#xe601;</span>
        </div>
        <div class="dic border-bottom">
            <span>促销</span>
            <span class="iconfont">&#xe601;</span>
        </div>
        <div class="dic border-bottom">
            <span>服务</span>
            <div class="service">
                <span>假一赔四</span>
                <span>30天质保+</span>
                <span>极速退款</span>
            </div>
            <span class="iconfont">&#xe601;</span>
        </div>
    </div>
</div>
</template>

<script>
// import { Token } from '@/utils/token'
export default {
    props:{
        goods:Object
    },
    methods:{
        getCoupon(){ 
            //判断是否登录
            // const token  = Token.getToken()
            // if(token === ''){//没有登录， 登录跳转至登录页面
            //     const url= encodeURIComponent('/goods-detail/'+ this.goods.goods_id)
            //     this.$router.push(`/login?url=${url}`)
            //     return
            // }
            const url= encodeURIComponent('/goods-detail/'+ this.goods.goods_id)
            this.$router.push(`/coupon?url=${url}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.content-container{
    width: 100%;
    padding: .2rem;
    background: $color-F;
    color: $color-D;
    box-sizing: border-box;
    line-height: .5rem;
    .goods-price{
        font-size: .28rem;
        color: $color-A;
        span{
            font-size: .4rem;
        }
    }
    .market-price{
        font-size: .28rem;
        span{
            font-size: .24rem;
            text-decoration: line-through;
        }
    }
    .goods-name{
        color: $color-B;
    }
    .sale-container{
        @include layout-flex($justify:space-between);
        font-size: .24rem;
    }
}
.discount-container{
    margin-top: .2rem;
    background: $color-F;
    width: 100%;
    .dic{
        @include layout-flex($justify:space-between);
        width: 100%;
        height: .84rem;
        padding: .2rem;
        box-sizing: border-box;
        font-size: .24rem;
        color: $color-D;
        div{
            width: 0;
            flex: 1;
            padding: 0 .3rem;
            color:$color-B;
            box-sizing: border-box;
        }
    }
    .service{
        @include layout-flex($justify:space-between);
        span{
            @include layout-flex($justify:flex-start);
            width: 33.33%;
        }
    }
}
</style>