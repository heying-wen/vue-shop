<template>
<div class="page">
    <common-header :title="'领取优惠卷'" :back="backUrl"></common-header>
    <div class="user-points">
        <div class="title">当前积分</div>
        <div class="points">{{points}}</div>
    </div>
    <div class="coupon-list">
        <div v-for="item of couponList" :key="item.id" class="coupon-item">
            <div class="coupon-money">
                ￥ <span class="money">{{item.money|formatPrice}}</span>
            </div>
            <div class="coupon-desc">
                <div class="coupon-name">{{item.money |formatPrice}}元优惠卷</div>
                <div class="coupon-time">有效期到{{item.time|handleTime}}</div> 
                <div class="coupon-condtion">{{item.limit_total > 0 ? `订单满${parseInt(item.limit_total)}元可用`:"无门槛使用"}}</div>
                <div class="coupon-points" v-show="item.points> 0">{{item.points}}积分</div>
            </div>
            <div class="exchange" :class="{'not-exchange':item.canExchange}" @click="exchange(item.id)">{{item.text}}</div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import { Token } from '@/utils/token'
import { filters } from '@/utils/mixins'
import { dateFormat,formatPrice } from '@/utils/function'
import {Storage} from '@/utils/storage'
const USER_TOKEN =Token.getToken()
export default {
    components:{
        CommonHeader
    },
    data(){
        return {
            backUrl:'',
            couponList:[],
            points:0
        }
    },
    mixins:[filters],
    filters:{
        handleTime(days){
            const time = Date.now() + days * 24 * 3600 * 1000
            return dateFormat('YYYY.mm.dd',new Date(time))
        }
    },
    async mounted (){
        this.backUrl = this.$route.query.url || '/'
        await this.getUserPoints()
        await this.getCouponList()
    },
    methods:{
        async getCouponList() {
            const couponList = await this.axios.get('shose/coupon')
            this.couponList = couponList.map(item =>{
                if(item.is_use === 1){
                    item.limit_total === formatPrice('item.limit_total ')
                    let text = ''
                    let canExchange = false
                    if(item.points === 0){
                         text = '立即领取'
                    }else{
                        if(item.points > this.points){
                            text = '积分不足'
                            canExchange = true
                        }else{
                            text = '立即兑换'
                        }
                    }
                    item.text = text
                    item.canExchange = canExchange
                    return item
                }
            } )
            console.log(this.couponList)
        },
        async getUserPoints(){
            this.points = await this.axios.get('shose/user-points',{
               headers:{
                    token:USER_TOKEN
                }
            }).then(res => res.points)
        },
        exchange (couponId) {
            const index = this.couponList.findIndex(item => item.id === couponId)
            if(index > -1){
                const coupon = this.couponList[index]
                if(coupon.points > 0&& coupon.points > this.points){
                    this.$showToast('积分不足')
                    return
                }
                this.$showLoading()
                this.axios.post('shose/coupon/get',{
                    coupon_id:couponId
                },{
                    headers:{
                        token:USER_TOKEN
                    }
                }).then(()=>{
                    this.$showToast({
                        message:'兑换成功'
                    })
                    Storage.deleteItem('userCoupon')
                }).catch(err=>{
                    this.$showToast({
                        message: err.message || '兑换失败'
                    })
                }).finally( ()=>{
                    this.$hideLoading()
                }) 
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    margin-top: $Header-H;
    min-height: 100%;
    background: $color-F;
    .user-points{
        width: 100%;
        height: 1.6rem;
        .title{
            width: 100%;
            line-height: .7rem;
            text-align: center;
            color: $color-C;
            font-size: .32rem;
        }
        .points{
            width: 100%;
            line-height: .9rem;
            text-align: center;
            color: $color-A;
            font-size: .84rem;
            font-weight: 700;
        }
    }
    .coupon-list{
        width: 100%;
        height: auto;
        padding: 0 .2rem;
        box-sizing: border-box;
        margin-top: .9rem;
        .coupon-item{
        width: 100%;
        height: 1.4rem;
        margin-bottom: .2rem;
        @include layout-flex;
        position: relative;
        .exchange{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 1.4rem;
            height: .58rem;
            box-sizing: border-box;
            border: 1px solid $color-A;
            color: $color-A;
            border-radius: .3rem;
            @include layout-flex;
            font-size: .26;
            font-weight: 600;
            &.not-exchange{
                color: $color-D;
                border-color: $color-D;
            }
        }
        .coupon-money{
            width: 2.3rem;
            height: 100%;
            background: $color-A;
            color: $color-F;
            @include layout-flex($align: baseline);
            line-height: 1.4rem;
            font-size: .5rem;
            .money{
                font-size: .84rem;
            }
        }
        .coupon-desc{
            width: 0;
            height: 95%;
            flex: 1;
            margin-left: .2rem;
            @include layout-flex(column, space-between, flex-start);
            font-size: .28rem;
            color: $color-C;
            .coupon-points{
                color: $color-A;
                }
            }
        }
    }
}
</style>