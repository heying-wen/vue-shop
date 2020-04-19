<template>
<div class="page">
    <common-header></common-header>
    <search></search>
    <home-swiper :swiperList="swiperList"></home-swiper>
    <icon-nav :navList="navList"></icon-nav>
</div>
</template>
<script>

import CommonHeader from '@/components/Header';
import Search from '@/components/Search'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'

export default {
   components:{
       CommonHeader,
       Search,
       HomeSwiper,
       IconNav
    },
    data(){
       return {
           swiperList:[],
           navList:[],
        }
    },
    methods:{
        async getSwiper () {
            const res = await this.axios.get('api/swiper?type=1')
            this.swiperList = res.map(item => item.img)
        },
        async getNavList(){
            this.navList = await this.axios.get('api/navigate?type=1')
        }
    },
    mounted(){
        this.getSwiper(),
        this.getNavList()
    }
}
</script>

<style lang="scss" scopeds>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    min-height: 100%;
    background: $color-E;
}
</style>