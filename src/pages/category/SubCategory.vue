<template>
<div class="sub-category-container">
    <router-link tag="div" :to="{name:'GoodsList',query:{cname:item.cat_name,cid:item.cat_id}}" class="sub-catepory-item" v-for="item of content" :key="item.cat_id" >
        <img :src="item.img" class="sub-catepory-img">
        <span >{{item.cat_name}}</span>
    </router-link>
</div>
</template>

<script>
export default {
    props:{
        content:Array
    }
}
</script>

<style lang="scss" scopeds>
@import "~@/assets/scss/global";
.sub-category-container{
    width: 100%;
    @include layout-flex($justify:flex-start);
    flex-wrap: wrap;
    padding: 0 .2rem;
    .sub-catepory-item{
        width: 33.33%;
        height: 1.2rem;
        margin-top: .7rem;
        @include layout-flex(column);
        .sub-catepory-img{
            width: 1.1rem;
            height:.8rem;
        }
    }
}
</style>