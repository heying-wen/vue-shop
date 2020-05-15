<template>
<div class="page">
    <common-header title="我的订单" back="/user"></common-header>
    <div class="tab border-bottom">
        <div class="tab-wrapper">
            <div class="tab-cell">
                <span class="tab-text">全部</span>
            </div>
            <div class="tab-cell">
                <span class="tab-text">待付款</span>
            </div>
            <div class="tab-cell">
                <span class="tab-text">待发货</span>
            </div>
            <div class="tab-cell">
                <span class="tab-text">待收货</span>
            </div>
            <div class="tab-cell">
                <span class="tab-text">已完成</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
export default {
    components: {
        CommonHeader
    },
    data () {
        return {
            status: -1,
        }
    },
    mounted () {
        this.status = parseInt(this.$route.query.status || -1)

    }
}
</script>
<style lang="scss" scoped> 
@import "~@/assets/scss/global";
.page{
    width: 100%;
    padding-top: $Header-H;
    .tab{
        width: 100%;
        height: .8rem;
        .tab-wrapper{
            width: 100%;
            height: 100%;
            padding: 0 .2rem;
            box-sizing: border-box; 
            @include layout-flex;
            .tab-cell{
                width: 20%;
                height: 100%;
                @include layout-flex;
                .tab-text{
                    height: 100%;
                    font-size: .32rem;
                    color: $color-B;
                    @include layout-flex;
                    border-bottom:1px solid $color-F;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>