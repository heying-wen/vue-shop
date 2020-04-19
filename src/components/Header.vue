<template>
<div class="header">
    <span class="iconfont back" v-if="back" @click="toBack">&#xe604;</span>
    <span class="title">{{title}}</span>
</div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'QianQian左右鞋包'
        },
        back:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
        toBack(){

        }
    }
}
</script>
<style lang="scss" scopeds>
// @import "~@/assets/cscc/global";
@import "~@/assets/scss/global";
.header{
    width:100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    height: .88rem;
    background-color:$color-A;
    font-size:0.36rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .back{
        display: block;
        width: 1rem;
        position: absolute;
        left: .2rem;
        font-size: .4rem;
        text-align: left;
        line-height: .88rem;
    }
}
</style> 