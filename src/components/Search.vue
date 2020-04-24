<template>
<div class="search">
    <div class="search-bac">
        <span class="iconfont">&#xe60d;</span>
        {{placeHolder}}
    </div>
</div>
</template>
<script>
export default {
    props:{
        placeHolder:{
            type:String,
            default:'搜索商品名称'
        }
    }
}
</script>
<style lang="scss" scopeds>
@import "~@/assets/scss/global";
.search{
    width:100%;
    height: $Search-H;
    padding: 0 .2rem;
    box-sizing: border-box;
    background-color: $color-A;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: $Search-H;
    left: 0;
    z-index: 99;
    .search-bac{
        height: .6rem;
        width: 100%;
        padding: 0 0.2rem;
        border-radius: .3rem;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.26rem;
        color: #b2b2b2;
    }
}

</style>