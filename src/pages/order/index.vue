<template>
<div class="page" ref="page">
    <common-header :title="'确认订单'" back="/cart"></common-header>
    <order-address :address="address"></order-address>
    <div class="cart-container">
        <div class="cart-item" v-for="item of cart" :key="item.id">
            <img :src="item.img" class="cart-img">
            <div class="cart-desc">
                <div class="name">{{item.name}}</div>
                <div class="price">{{item.price}}</div>
                <div class="number">&times;{{item.buyNumber}}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import OrderAddress from './Address'
import {Token} from '@/utils/token'
import {Storage} from '@/utils/storage'
const USER_TOKEN =Token.getToken()
export default {
    components:{
        CommonHeader,
        OrderAddress
    },
    data(){
        return {
            address:{},
            cart:[],
            coupon:[],
            addressId: 0,
            loadAddress:false
        }
    },
    // watch:{
    //     async addressId(){
    //         this.$showLoading()
    //         await this.getUserAddress()
    //         this.$hideLoading()
    //     }
    // },
    async mounted (){
        this.addressId = this.$route.query.selectAddressId || 0
        this.initCart()
        try{
            this.$showLoading()
            // const address =Storage.getItem('address')||{}
            // if(Object.keys(address).length === 0){
            //      await this.getUserAddress()
            // }else{
            //     if(this.addressId === address.id){
            //         this.address = address
            //     }else{
            //         await this.getUserAddress()
            //     }
            // }
            // if(this.address === 0 && Object.keys(address).length === 0){
            //     await this.getUserAddress()
            // } else{
            //     this.address = address
            // }
            await this.getUserAddress()
            await this.getUserCoupon()
        }catch(err){
            console.log(err)
        }finally{
            this.$hideLoading()
        }
        
        // Promise.all([this.getUserAddress(),this.getUserCoupon()]).finally(()=>{
            
        // })
    },
    methods:{
        initCart(){
            let cart = Storage.getItem('cart')
            cart = cart.filter( item => item.selected)
            if(cart.length === 0){
                this.$showToast({
                    message:'至少有一个商品',
                    callback: () =>{
                        this.$router.push('./cart')
                    }
                })
                return
            }
            this.cart = cart
        },
        async getUserAddress (){
            const address = await this.axios.get('shose/address/default',{
                headers:{
                    token:USER_TOKEN 
                },
                params:{
                    id: this.addressId
                }
            })
            this.address = address || {} 
            Storage.setItem('address',this.address)
        },
        async getUserCoupon (){
             const coupon = await this.axios.get('shose/coupon/get',{
                headers:{
                    token:USER_TOKEN 
                }
            }).then(res=>res.coupon)
            this.coupon = coupon.filter(item => {
                let result
                if(item.is_use === 1){
                    result = false
                }else{
                    result = item.expires_time*1000 > Date.now()
                }
                return result
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding: $Header-H .2rem .9rem;
    box-sizing: border-box;
    background: $color-E;
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
            }
        }
    }
}
</style>