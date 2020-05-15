<template>
<div class="goods-list">
    <div class="list-item" v-for="item of list" :key="item.id">
        <img class="goods-img" :src="item.img">
        <div class="list-container">
            <span class="goods-name">{{item.name}}</span>
            <span class="goods-price">￥{{item.price|formatPrice}} <span class="market-price">￥{{item.market_price|formatPrice}}</span></span>
            <span class="goods">{{item.sale_num}}人购买</span>
            <cart-btn :goods="item"></cart-btn>
        </div>
    </div>
</div>
</template>
<script>
import {filters} from "@/utils/mixins"
import CartBtn from '@/components/CartBtn'
export default {
    props:{
        list:Array
    },
    mixins:[filters],
    components:{
        CartBtn
    },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.list-item{
    width: 100%;
    height: 2.6rem;
    display: flex;
    padding: .2rem;
    box-sizing: border-box;
    .goods-img{
        width: 2.2rem;
        height: 2.2rem;
        border-radius: .1rem;
    }
    .list-container{
        box-sizing: border-box;
        padding: .2rem 0;
        margin-left: .2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 0;
        flex: 1;
        position: relative;
        .goods-price{
            font-size: .36rem;
            color: $color-A;
            font-weight: 700;
            margin-top: .4rem;
        }
        .goods-name{
            font-size: .28rem;
            color: $color-B;
            font-weight: 700;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .market-price{
            font-size: .26rem;
            color: $color-D;
            font-weight: 400;
            text-decoration: line-through;
        }
        .goods{
            font-size: .22rem;
            color: $color-C;
        }
    }
}

</style> 