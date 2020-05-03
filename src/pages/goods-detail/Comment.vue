<template>
<div class="comment-container">
    <div class="comment-header border-bottom">
        <div>商品评价({{count}})</div>
        <div class="iconfont" v-if="showMore">查看全部&#xe601;</div>
    </div>
    <div class="comment" v-for="item of list" :key="item.id">
        <div class="information">
            <div>{{item.username}}</div>
            <div>{{item.add_time}}</div>
        </div>
        <div>{{item.content}}</div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        goodsId:Number,
        list:Array,
        count:Number,
    },
    computed:{
        
        showMore(){
            if(!this.list){
                return false
            }
            return !!this.list.length
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.comment-container{
    width: 100%;
    background: $color-F;
    padding: .2rem;
    box-sizing: border-box;
    margin-top: .2rem;
    .comment-header{
        width: 100%;
        height: .6rem;
        color: $color-C;
        @include layout-flex($justify:space-between);
        .iconfont{
            color: #ff0036;
        }
    }
    .comment{
        width: 100%;
        color:$color-D;
        line-height: .8rem;
        .information{
            color: $color-B;
            @include layout-flex($justify:space-between);
        }
    }
}
</style>