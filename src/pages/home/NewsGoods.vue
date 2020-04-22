<template>
<container title="新品优选" morePath="/goods-list">
    <template v-slot:content>
        <div class="goods-list" >
            <div class="goods-item border" v-for="item of list" :key="item.id">
                <img v-lazy="item.img" class="goods-img">
                <div class="goods-fote">
                    <div class="goods-name">{{item.name}}</div>
                    <div class="goods-price">￥ {{item.price|formatPrice}}</div>
                </div>
            </div>
        </div>
    </template>
</container>
</template>

<script>

import Container from './Container'
import { filters } from '@/utils/mixins'
export default {
    props:{
        newsGoodsList:Array
    },
    components:{
        Container
    },
    mixins:[filters],
    watch:{
        newsGoodsList(newList){
            this.list = newList.slice(0,3)
        }
    },
    data(){
        return{
            list:[]
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
    width: 100%;
    @include layout-flex (row,space-between,flex-start);
    height: 3.2rem;
    margin-top: .2rem;
    .goods-item{
        width: 2.24rem;
        height: 100%;
        border-radius: .1rem;
        box-sizing: border-box;
        @include layout-flex (column);
        overflow: hidden;
        .goods-img{
            width: 100%;
            height: 2.1rem;
        }
        .goods-fote{
            height: 0;
            flex: 1;
            width: 90%;
            margin: 0.2rem;
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
</style>