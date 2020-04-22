<template>
<div class="container">
    <div class="title">
        <span>{{title}}</span>
        <span class="iconfont more" v-if="show">更多 &#xe60b;</span>
    </div>
    <slot name="content"></slot>
</div>
</template>
<script>
export default {
    props:{
        title:String,
        morePath:{
            type:String,
            default: ''
        }
    },
    computed:{
        show(){
            return this.morePath.trim() !== ""
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    @include container-layout ();
    .title{
        width:100%;
        @include layout-flex( $justify:space-between);
        height: .4rem;
        border-left: .08rem solid $color-A;
        text-indent: .2rem;
        box-sizing: border-box;
        font-weight: 600;
        font-size: .32rem;
        color: $color-B;
        .more{
            font-weight: 400;
            color: $color-C;
            font-size: .24rem;
        }
    }
}
</style>