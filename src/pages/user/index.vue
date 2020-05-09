<template>
<div class="page">
    <common-header title="我的"></common-header>
    <div class="user-container">
        <div class="user-wrappar">
            <img src="" class="">
        </div>
    </div>
    <common-footer></common-footer>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import { Token } from '@/utils/token'
export default {
    components:{
        CommonHeader,
        CommonFooter,
    },
    data(){
        return {
            user:{}
        }
    },
    mounted(){
        this.getUser()
    },
    methods:{
        async getUser(){
            const token = Token.getToken()
            const user = await this.axios.get('api/user',{
                headers:{
                    token
                }
            })
            console.log(user)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    padding: $Header-H 0 $Footer-H;
    box-sizing: border-box;
    .user-container{
        width: 100%;
        height: 3rem;
        background: $color-A;
        border-radius:  0 0 13rem 13rem/2.6rem;
        .user-wrappar{
            width: 100%;
            height: 1.8rem;
            padding: 0 .4rem 0 .2rem;
            box-sizing: border-box;
            @include layout-flex;
        }
    }
}
</style>