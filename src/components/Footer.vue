<template>
<div class="footer-container border-top">
    <router-link tag="div" to="/" class="footer-nav">
        <span class="iconfont">&#xe600;</span>
        <span>首页</span>
    </router-link>
    <router-link tag="div" to="/category" class="footer-nav">
        <span class="iconfont">&#xe620;</span>
        <span>分类</span>
    </router-link>
    <router-link tag="div" to="/cart" class="footer-nav">
        <span class="iconfont">&#xe628;</span>
        <span>购物车</span>
    </router-link>
    <router-link tag="div" to="/user" class="footer-nav">
        <span class="iconfont">&#xe633;</span>
        <span>我的</span>
    </router-link>
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.footer-container{
    width: 100%;
    height: $Footer-H;
    @include layout-flex;
    background:  $color-F;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    .footer-nav{
        width:25%;
        height: 100%;
        @include layout-flex(column);
        color: #7f8389;
        font-size: .2rem;
        .iconfont{
            font-size: .4rem;
            margin-bottom: .1rem;
        }
        &.active{
            color:$color-A;
        }
    }
}
</style>