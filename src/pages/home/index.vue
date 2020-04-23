<template>
<div class="page" ref="page">
    <common-header></common-header>
    <search></search>
    <home-swiper :swiperList="swiperList"></home-swiper>
    <icon-nav :navList="navList"></icon-nav>
    <recommend :recommendList="recommendList"></recommend>
    <sales :salesList="salesList"></sales>
    <news-goods :newsGoodsList="newsGoodsList"></news-goods>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
        <goods-list :goodsList="goodsList"></goods-list>
    </div>
    <common-footer></common-footer>
    <Loading :show="showLoading"></Loading>
</div>
</template>
<script>

import infiniteScroll from 'vue-infinite-scroll'
import Loading from '@/components/Loading'
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import Search from '@/components/Search'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
import Sales from './Sales'
import NewsGoods from './NewsGoods'
import GoodsList from './GoodsList'
import { Storage } from '@/utils/storage'

export default {
    directives: {infiniteScroll},
    components:{
        Loading,
        CommonHeader,
        CommonFooter,
        Search,
        HomeSwiper,
        IconNav,
        Recommend,
        Sales,
        NewsGoods,
        GoodsList,
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
           count:8, //为你推荐每次获取的数量
           totalPage:0,//为你推荐总页数
           busy:false,
           scrollDistance:0,
           showLoading:false,
        }
    },
    async mounted(){
        const footerHeight = document.querySelector('.footer-container').offsetHeight
        this.$refs.page.style.paddingBottom = footerHeight +'px'
        this.scrollDistance = footerHeight
        this.showLoading = true
        await this.getSwiper()
        await this.getNavList()
        await this.getRecommend()
        await this.getSales()
        await this.getNewsGoods()
        this.showLoading = false
    },
    methods:{
        async getSwiper () {
            const swiper = Storage.getItem('swiper')
            if(swiper){
                this.swiperList = swiper
            }else{
                const res = await this.axios.get('api/swiper?type=1')
                const swiperList = res.map(item => item.img)
                this.swiperList = swiperList
                Storage.setItem('swiper',swiperList)
            }
        },
        async getNavList(){
            const getNav = Storage.getItem('getNav')
            if(getNav){
                this.navList = getNav
            }else{
                const navList = await this.axios.get('api/navigate?type=1')
                this.navList = navList
                Storage.setItem('getNav',navList)
            }
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
            this.goodsList = this.goodsList.concat(goods)
            if(this.page === 1){
                this.totalPage = Math.ceil(total/this.count)
            }
            this.page++
        },
        async loadMore(){
            this.busy = true
            if(this.page <= this.totalPage || this.totalPage === 0){
                await this.getGoodsList()
                this.busy =false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    min-height: 100%;
    background: $color-E;
}
</style>