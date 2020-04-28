<template>
<div class="header-container">
    <div  v-if="showIconMenu" class="icon-heder">
        <span class="iconfont cell">&#xe604;</span>
        <span class="iconfont cell">&#xe628;</span>
    </div>
    <div v-else></div>
</div>
</template>

<script>
export default {
    props:{
        showIconMenu:{
            type:Boolean,
            default:true
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
    width: 100%;
    height: $Header-H;
    position: fixed;
    left: 0;
    top: 0;
    .icon-heder{
        width: 100%;
        height: 100%;
        padding: .2rem;
        box-sizing: border-box;
        @include layout-flex($justify: space-between);
        background:linear-gradient(0,0,0,.15,transparent);
        .cell{
            width: .6rem;
            height: .6rem;
            border-radius: 50%;
            background: rgba($color: #000000, $alpha: .3);
            @include layout-flex;
            color:$color-F;
            font-size: .4rem;
        }
    }
}
</style>