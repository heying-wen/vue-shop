<template>
<div class="address-container" @click="editAddress">
    <span class="iconfont position-icon">&#xe64e;</span>
    <div class="address" >
        <div v-if="showAddress">地址显示</div>
        <div v-else class="empty-address">
            <span class="iconfont">&#xe624;</span> 添加收获地址 
        </div>
    </div>
    <span class="iconfont right">&#xe601;</span>
</div>
</template>
<script>
export default {
    props:{
        address:Object
    },
    computed:{
        showAddress() {
            return !!Object.keys(this.address).length
        }
    },
    methods:{
        editAddress (){
            const id = this.address.id || 0
            const url = encodeURIComponent('/order')
            this.$router.push(`/user/address?id=${id}&url=${url}`)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.address-container{
    width: 100%;
    height: 1.8rem;
    margin-top: .2rem;
    background: $color-F;
    border-radius: .1rem;
    padding: .2rem;
    box-sizing: border-box;
    @include layout-flex;
    .position-icon{
        color: $color-A;
        font-size: .7rem;
    }
    .address{
        width: 0;
        flex: 1;
        height: 100%;
        
        .empty-address{
            width: 100%;
            height: 100%;
            color: $color-D;
            @include layout-flex;
            .iconfont{
                margin-right: .1rem;
            }
        }
    }
    .right{
        color: $color-D;
        font-size: .32rem;
    }
}
</style>