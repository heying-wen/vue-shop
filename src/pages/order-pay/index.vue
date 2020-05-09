<template>
<div class="page" v-if="show">
    <common-header :title="'订单支付'" back="/"></common-header>
    <div class="order-status">
        <span class="iconfont">&#xe607;</span>
        <span>买家{{order.statusInfo}}</span>
        <span>您的包裹已蓄势待发~</span>
    </div>
    <div class="order-total">
        实付款：<span>￥{{order.orderTotal}}</span>
    </div>
    <div class="order-goods">
        <div class="falg">
            <span class="iconfont icon-list" @click="showGoods=!showGoods">{{showGoods?'&#xe60e;':'&#xe624;'}}</span>
        </div>
        <div class="cart-container" v-if="showGoods">
            <div class="cart-item" v-for="item of order.goods" :key="item.goods_id">
                <img :src="item.goods_img" class="cart-img">
                <div class="cart-desc">
                    <div class="name">{{item.goods_name}}</div>
                    <div class="price">{{item.goods_price}}</div>
                    <div class="number">&times;{{item.buy_number}}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="order-address">
        <div class="row">
            <span>收件人：</span>
            <p>{{order.address.name}}</p>
        </div>
        <div class="row">
            <span>手机号：</span>
            <p>{{order.address.phone}}</p>
        </div>
        <div class="row">
            <span>收货地址：</span>
            <p>{{order.address.province}}{{order.address.city}}{{order.address.area}}{{order.address.address}}</p>
        </div>
    </div>
    <div class="chose-pay" v-if="order.status <= 1">
        <div class="pay-cell" :class="{active:payType === 1}" @click="payType = 1">
            <img src="@/assets/images/wepay.svg">
        </div>
        <div class="pay-cell" :class="{active:payType === 2}" @click="payType = 2">
            <img :src="alipayImg">
        </div>
    </div>
    <div class="operation">
        <span class="operation-btn" v-if="order.status <= 1">支付订单</span>
        <span class="operation-btn" v-else>查看订单</span>
        <router-link to='/' class="operation-btn">返回首页</router-link>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import { Token} from '@/utils/token'
import {getOrderStatus,formatPrice} from '@/utils/function'
export default {
    components:{
        CommonHeader,
    },
    computed:{
        show(){
            return !!Object.keys(this.order).length
        }
    },
    data(){
        return{
            orderId :0,
            order:{},
            alipayImg: require('@/assets/images/alipay.svg'),
            payType:1,
            showGoods:false,
        }
    },
    mounted(){
        this.orderId = parseInt(this.$route.query.id)
        this.getOrder()
    },
    methods:{
        async getOrder (){
            const token = Token.getToken()
            const order = await this.axios.get('shose/order',{
                params:{
                    id:this.orderId
                },
                headers:{
                    token
                }
            }).then(res=>res.order)
            order.statusInfo = getOrderStatus(order.status)
            order.orderTotal = formatPrice(order.total_price)
            this.order = order
        }
         
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding-top: $Header-H;
    box-sizing: border-box;
    .order-status{
        width: 100%;
        height: 3.3rem;
        background: $color-A;
        @include layout-flex(column);
        color: $color-F;
        font-size: .36rem;
        line-height: 1.3em;
        .iconfont{
            font-size: .9rem;
            margin-bottom: .2rem;
        }
    }
    .order-total{
        width: 100%;
        height: 1rem;
        font-size: .32rem;
        @include layout-flex;
        color: $color-B;
        span{
            color: $color-A;
        }
    }
    .order-address{
        width: 100%;
        padding: 0 .4rem;
        box-sizing: border-box;
        .row{
            width: 100%;
            margin-bottom: .2rem;
            @include layout-flex;
            color: $color-D;
            font-size: .28rem;
            span{
                width: 1.5rem;
                height: 100%;
            }
            p{
                width: 0;
                flex: 1;
                height: 100%;
            }
        }
    }
    .chose-pay{
        width: 100%;
        height: 1rem;
        margin-top: .4rem;
        @include layout-flex($justify:space-around);
        padding: 0  .8rem;
        box-sizing: border-box;
        .pay-cell{
            width: 40%;
            height: 100%;
            @include layout-flex;
            border: 1px solid $color-F;
            border-radius: .1rem;
            box-sizing: border-box;
            img{
                width: .8rem;
                height: .8rem;
            }
            &.active{
                border:1px solid $color-A;
            }
        }
    }
    .operation{
        width: 100%;
        height: .6rem;
        margin-top: 1rem;
        padding: 0  .8rem;
        box-sizing: border-box;
        @include layout-flex($justify:space-around);
        .operation-btn{
            width: 1.56rem;
            height: 100%;
            box-sizing: border-box;
            border-radius: .3rem;
            border: 1px solid $color-A;
            color: $color-A;
            @include layout-flex;
            font-size: .28rem;
        }
    }
    .order-goods{
        width: 100%;
        padding: 0 .4rem;
        box-sizing: border-box;
        margin-top: .6rem;
        .flag{
            width: 100%;
            height: .6rem;
        }
        .icon-list{
            float: right;
            display: block;
            width: .4rem;
            height: .4rem;
            border: 1px solid $color-D;
            border-radius: 50%;
            @include layout-flex;
            color: $color-C;
            font-size: .24rem;
        }
        .cart-container{
            width: 100%;
            background: $color-F;
            padding: .2rem;
            box-sizing: border-box;
            border-radius:  .1rem;
            margin-top: .2rem;
            .cart-item{
                width: 100%;
                height: 1.8rem;
                @include layout-flex;
                margin-bottom: .2rem;
                .cart-img{
                    width: 1.8rem;
                    height: 1.8rem;
                }
                .cart-desc{
                    width: 0;
                    flex: 1;
                    margin-left: .2rem;
                    height: 80%;
                    @include layout-flex(column,space-between,flex-start);
                    font-size: .28rem;
                    color: $color-C;
                    margin-top: .2rem; 
                    .number{
                        font-size: .24rem;
                        color: $color-D;
                    }
                }
            }
        }
    }
}

</style>