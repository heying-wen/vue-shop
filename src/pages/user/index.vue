<template>
<div class="page">
    <common-header :title="'我的'"></common-header>
    <common-footer></common-footer>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
export default {
    components:{
        CommonHeader,
        CommonFooter,
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding: $Header-H 0 $Footer-H;
    box-sizing: border-box;
}
</style>