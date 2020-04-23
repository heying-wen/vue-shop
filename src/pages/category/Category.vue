<template>
<div class="category-container">
    <div v-for="item of content" :key="item.cat_id" :class="{active:item.cat_id === catId}" class="catepory-item">
        <div class="catepory-name">{{item.cat_name}}</div>
    </div>
</div>
</template>
<script>
export default {
    props:{
        content:Array
    },
    watch:{
        content(newList){
            this.catId = newList.length > 0 ?newList[0].cat_id : 0 
        }
    },
    data(){
        return {
            catId : 0
        }
    }
}
</script>
<style lang="scss" scopeds>
@import "~@/assets/scss/global";
.category-container{
    width: 100%;
    height: 100%;
    .catepory-item{
        width: 100%;
        height: .9rem;
        padding: .2rem ;
        box-sizing: border-box;
        color: $color-C;
        font-size: .32rem;
        &.active{
            background: $color-F;
            .catepory-name{
                width: 100%;
                height: 100%;
                @include layout-flex;
                border-left: 0.08rem solid $color-A;
            }
        }
    }
}
</style>