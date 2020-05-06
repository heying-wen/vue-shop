<template>
<div class="page">
    <common-header :title="'选择地址'" :back="backUrl"></common-header>
    <div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?url=${backUrl}`)">
        <span class="iconfont">&#xe624;</span> 
        添加新地址
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
const USER_TOKEN =Token.getToken()
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
        async getUserAddress(){
            this.address = await this.axios.get('shose/address',{
                headers:{
                    token:USER_TOKEN
                }
            }).then(res => res.address)
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
    padding: $Header-H .2rem 0.9rem;
    box-sizing: border-box;
    background: $color-F;
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