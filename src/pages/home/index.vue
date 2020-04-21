<template>
<div class="page">
    <common-header></common-header>
    <search></search>
    <home-swiper :swiperList="swiperList"></home-swiper>
    <icon-nav :navList="navList"></icon-nav>
    <recommend :recommendList="recommendList"></recommend>
    <sales :salesList="salesList"></sales>
    <news-goods :newsGoodsList="newsGoodsList"></news-goods>
    <goods-list :goodsList="recommendList"></goods-list>
</div>
</template>
<script>

import CommonHeader from '@/components/Header';
import Search from '@/components/Search'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
import Sales from './Sales'
import NewsGoods from './NewsGoods'
import GoodsList from './GoodsList'

export default {
   components:{
       CommonHeader,
       Search,
       HomeSwiper,
       IconNav,
       Recommend,
       Sales,
       NewsGoods,
       GoodsList
    },
    data(){
       return {
           swiperList:[],
           navList:[],
           recommendList:[],
           salesList:[],
           newsGoodsList:[],
           goodsList:[],
           page:1, //为你推荐页码
           count:8 //为你推荐每次获取的数量
        }
    },
    mounted(){
        this.getSwiper(),
        this.getNavList(),
        this.getRecommend(),
        this.getSales(),
        this.getNewsGoods(),
        this.getGoodsList()
    },
    methods:{
        async getSwiper () {
            const res = await this.axios.get('api/swiper?type=1')
            this.swiperList = res.map(item => item.img)
        },
        async getNavList(){
            this.navList = await this.axios.get('api/navigate?type=1')
        },
        async getRecommend(){
            this.recommendList = await this.axios.get('api/goods/recommend?type=1')
        },
        async getSales(){
            this.salesList = await this.axios.get('api/goods/sales?type=1')
        },
        async getNewsGoods(){
            this.newsGoodsList = await this.axios.get('api/goods/new?type=1')
        },
        async getGoodsList(){
            const {goods,total} = await this.axios.get('api/goods_list?type=1',{
                params: {
                    page: this.page,
                    count: this.count
                }
            })
            console.log(goods,total)
        }
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