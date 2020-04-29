<template>
    <container title="特惠清仓" v-if="show" morePath="/goods-list">
        <template v-slot:content v-if="show">
            <swiper :options="swiperOptions" class="swipers-container" v-if="show">
                <swiper-slide v-for="(item,index) of pages" :key="index" class="swipers-page">
                    <router-link tag="div" :to="`/goods-detail/${val.id}`" class="swipers-goods border" v-for="val of item" :key="val.id">
                        <img v-lazy="val.img" class="goods-img">
                        <div class="goods-fote">
                            <div class="goods-name">{{val.name}}</div>
                            <div class="goods-price">￥{{val.price|formatPrice}}</div>
                            <cart-btn font-size=".34rem" :goods="val"></cart-btn>
                        </div>
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </template>
    </container>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Container from './Container'
import { filters } from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'

export default {
    props:{
        salesList:Array
    },
    components:{
        Container,
        Swiper,
        SwiperSlide,
        CartBtn
    },
    computed:{
        show (){
            return !!this.salesList.length
        }
    },
    mixins:[filters],
    watch:{
        salesList(newVal){
            const pages= []
            newVal.forEach((val,index)=>{
                let page = Math.floor(index/2)
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(val)
            })
            this.pages = pages
        }
    },
    data(){
        return {
            pages:[],
            swiperOptions:{
                pagination:{
                el: '.swiper-pagination'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swipers-container{
    width: 100%;
    height: 4.4rem;
    margin-top: .2rem;
    .swipers-page{
        width: 100%;
        height: 4rem;
        @include layout-flex (row,space-between,flex-start);
        .swipers-goods{
            width: 3.44rem;
            height: 100%;
            @include layout-flex(column);
            .goods-img{
                width: 100%;
                height: 2.6rem;
            }
            .goods-fote{
                height: 0;
                flex: 1;
                width: 90%;
                margin:  0.2rem;
                position: relative;
                @include layout-flex (column,space-between,flex-start);
                .goods-name{
                    width: 100%;
                    height: .3rem;
                    line-height: .3rem;
                    font-size: .28rem;
                    color:$color-C;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-weight: 600;
                }
                .goods-price{
                    font-weight: 600;
                    font-size: .32rem;
                    color:$color-A;
                }
            }
        }
    }
    /deep/ .swiper-pagination-bullet-active{
        background: $color-A;
    }
    /deep/  .swiper-pagination-bullets{
        bottom: 0;
    }
    
}
</style>