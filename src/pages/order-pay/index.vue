<template>
<div class="page">
    <common-header :title="'订单支付'" back="/"></common-header>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import { Token} from '@/utils/token'
import {getOrderStatus} from '@/utils/function'
export default {
    components:{
        CommonHeader,
    },
    data(){
        return{
            orderId :0,
            order:{}
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
            console.log(order)
            this.order = order
        }
         
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
</style>