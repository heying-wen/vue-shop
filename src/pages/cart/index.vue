<template>
<div class="page">
    <common-header :title="'购物车'"></common-header>
    <div class="cart-list">
        <div v-for="item of cart" :key="item.id" :class="{'delete-style':item.delete}" class="cart-item border-bottom" :data-goods-id="item.id" @touchstart="touchStart" @touchend="touchEnd">
            <input type="checkbox" class="checkbox" :checked="item.selected"  onclick="toggleSelect(${item.id})">
            <img class="goods-img" :src="item.img" >
            <div class="goods-item">
                <div class="goods-name">{{item.name}}</div>
                <div class="goods-price">￥{{item.price}}</div>
                <div class="number-container">
                    <span class="iconfont " :class="{disabled:item.number===1}" @click="reduceCart(item.id)">&#xe60e;</span>
                    <span class="goods-number">{{item.buyNumber}}</span>
                    <span class="iconfont" @click="addCart(item.id)">&#xe624;</span>
                </div>
            </div>
            <div class="delete" @click="deleteCart(item.id)">删除</div>
        </div>
    </div>
    <div class="settlement-container">
        <div class="settlement-list">
            <span class="checkboxAll">
                <input type="checkbox" class="checkbox" :checked="selectAll"  @click="toggleSelectAll"> 全选
            </span>
            <span class="total-price-container">
                合计 :<span class="total-price">￥{{total.toFixed(2)}}</span>
            </span>
            <div class="settlement" onclick="submitCart()">去结算({{cartNum}})</div>
        </div>
    </div>
    <common-footer></common-footer>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import { Storage } from '@/utils/storage'
let touchStartX= 0,touchStartTime=0
export default {
    components:{
        CommonHeader, 
        CommonFooter,
    },
    data(){
        return {
            cart: [],
            selectAll:false,
            total:0,
            cartNum:0,
        }
    },
    mounted (){
        const cart = Storage.getItem('cart') || []
        if(cart.length > 0){
            this.cart = cart.map(item =>{
                if(!Reflect.has(item,'delete')){
                    item.delete = false
                }
                return item
            })
            console.log(this.cart)
        }
    },
    methods :{
        touchStart(event){
            touchStartX = event.changedTouches[0].clientX
            touchStartTime = event.timeStamp
        },
        touchEnd(event){
            const distance = event.changedTouches[0].clientX - touchStartX
            const time = event.timeStamp - touchStartTime
            const goodsId = parseInt(event.currentTarget.dataset.goodsId)
            const index = this.cart.findIndex(item => item.id === goodsId)
            if(distance < -100 && time < 500){
                this.cart.forEach((item, key) => {
                    if(key !== index){
                        item.delete = false
                    }else{
                        item.delete = true
                    }
                } )
            }
            if(distance > 100 && time < 500){ 
                this.cart[index].delete = false
            }
        },
        toggleSelectAll(){

        },
        countCart(){
            let selectAll = true
            let total = 0
            let cartNum = 0
            this.cart.forEach(item => {
                if(item.selected){
                    total += item.price * item.buyNumber
                    cartNum++
                }else{
                    selectAll = false
                }
            })
            if(this.cart.length === 0){
                selectAll = false
            }
            this.selectAll = selectAll
            this.total = total
            this.cartNum = cartNum
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    min-height: 100%;
    background: $color-E;
    margin-top: $Header-H;
    margin-bottom: $Footer-H +.9rem;
    background: $color-F;
}
.cart-item{
    height: 2.4rem;
    padding: .2rem ;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    
    .goods-img{
        width: 2rem;
        height: 2rem;
        border-radius: .1rem;
        margin: 0 .2rem;
    }
    .goods-item{
        height: 100%;
        padding: .2rem 0;
        box-sizing: border-box;
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        .goods-name{
            font-size: .28rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .goods-price{
            font-size: .32rem;
            color: #ff5e46;
        }
        .number-container{
            position: absolute;
            bottom: .2rem;
            right: .2rem;
            width: 1.6rem;
            height: .4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                width: .4rem;
                height: .4rem;
                border:  1px solid #f5f5f5;
                box-sizing: border-box;
                color: #999;
            }
            .disabled{
                color:#f5f5f5
            }
            .goods-number{
                font-weight: 700;
                color: #333;
                font-size: .32rem;
                flex: 1;
                text-align: center;
                line-height: .4rem;
            }
        }
    }
    .delete{
        width: 1.6rem;
        height: 100%;
        font-size: .36rem;
        color: #fff;
        text-align: center;
        line-height: 2.4rem;
        background: #f51f24;position: absolute;
        right: -1.6rem;
        top: 0;
    }
}
.checkbox{
    width: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: .3rem;
    height: .3rem;
    background: url(/images/checkbox.png) no-repeat;
    outline: none;
    background-size: contain;
}


.checkbox:checked{
    background: url(/images/checkbox@selected.png) no-repeat left bottom;
    background-size: contain;
}
.checkbox img{
    width: .3rem;
}


.cart-item.delete-style{
    left: -1.6rem;
}


.settlement-container{
    width: 100%;
    height: .9rem;
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: .2rem;
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    left: 0;
    bottom: $Footer-H;
}
.checkboxAll{
    @include layout-flex;

}
.settlement-list{
    width: 100%;
    @include layout-flex;
}
.settlement-container span{
    font-size: .32rem;
    color: #333;
}
.total-price-container{
    padding: .6rem;
    flex: 1;
    box-sizing: border-box;
}
.settlement-container .total-price{
    color: #ff5e46;
    font-weight: 700;
}
.settlement{
    width: 2.2rem;
    height: 100%;
    background: #ff5e46;
    color: #fff;
    font-size: .32rem;
    text-align: center;
    line-height: .9rem;
}
</style>