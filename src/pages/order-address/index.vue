<template>
<div class="page">
    <common-header :title="'选择地址'" :back="backUrl"></common-header>
    <div class="address-list">
        <div class="address-item border-bottom" :class="{selected: item.selected}" v-for="item of address" :key="item.id" @click="chooseAddress(item.id)">
            <div class="address-content">
                <div class="address-name">
                    <span>收货人：{{item.name}}</span>
                    <span>{{item.phone}}</span>
                </div> 
                <div class="address-detail">
                    收货地址：{{item.detail
                    }}
                </div>
            </div>
            <span class="iconfont">&#xe62a;</span>
        </div>
    </div>
    <div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?url=${backUrl}`)">
        <span class="iconfont">&#xe624;</span> 
        添加新地址
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {Storage} from '@/utils/storage'
const MAX_ADDRESS_NUM = 10
export default {
    components:{
        CommonHeader
    },
    beforeRouteEnter (to,from,next) {
        next(vm => {
            vm.backUrl =to.query.url || from.path
            vm.addressId =parseInt(to.query.id) 
        })
    },
    data(){
        return{
            backUrl:'',
            address:0,
            addressId:[],
            showAddAddress:true,
        }
    },
    mounted(){
        this.getUserAddress()
    },
    methods:{
        chooseAddress (selectAddressId){
            // this.$router.push('/order?selectAddressId='+selectAddressId)
            const index = this.address.findIndex(item => item.id === selectAddressId)
            if(index >-1){
                Storage.setItem('address',this.address[index])
                this.$router.push('/order')
            }
        },
        async getUserAddress(){
            const token = Token.getToken()
            this.address = await this.axios.get('shose/address',{
                headers:{
                    token
                }
            }).then(res => res.address.map(item =>{
                    item.detail = `${item.province}${item.city}${item.area}${item.address}`
                    item.selected = item.id === this.addressId
                    return item
                })) 
            this.showAddAddress = (MAX_ADDRESS_NUM -this.address.length) > 0
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding: $Header-H 0 .9rem;
    box-sizing: border-box;
    background: $color-E;
    .address-list{
        width: 100%;
        margin-top: .2rem;
        background: $color-F;
        .address-item{
            width: 100%;
            height: 1.48rem;
            padding: .4rem .32rem;
            box-sizing: border-box;
            @include layout-flex;
            .iconfont{
                color: $color-F;
                font-size: .4rem;
                @include layout-flex;
                width: .5rem;
                height: 100%;
            }
            .address-content{
                width: 0;
                flex: 1;
                height: 100%;
                margin-right: .2rem;
                .address-name{
                    width: 100%;
                    height: .42rem;
                    @include layout-flex($justify:space-between);
                    font-size: .32rem;
                }
                .address-detail{
                    font-size: .24rem;
                    margin-top: .1rem;
                    line-height: 1.5em;
                }
            }
            &.selected{
                background: #5e6b85;
                .address-content{
                    color: $color-F;
                }
            }
        }
    }
    .add-address{
        width: 100%;
        height: .9rem;
        background: $color-A;
        font-size: .36rem;
        color: $color-F;
        @include layout-flex;
        position: fixed;
        left: 0;
        bottom: 0;
        .iconfont{
            padding-right: .1rem;
        }
    }
}
</style>