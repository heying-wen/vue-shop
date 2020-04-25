<template>
<container title="为你推荐">
    <template v-slot:content>
        <div class="good-list" >
            <div class="good-item border" v-for="item of goodsList" :key="item.id">
                <img v-lazy="item.img" class="good-img">
                <div class="good-fote">
                    <div class="good-name">{{item.name}}</div>
                    <div class="good-price">￥ {{item.price|formatPrice}}</div>
                    <cart-btn  :goods="item"></cart-btn>
                </div>
            </div>
        </div>
    </template>
</container>
</template>

<script>
import Container from './Container'
import { filters } from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
    props:{
        goodsList:Array
    },
    components:{
        Container,
        CartBtn
    },
    mixins:[filters],
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.good-list{
    width: 100%;
    @include layout-flex (row,space-between,flex-start);
    flex-wrap: wrap;
    height: auto;
    margin-top: .2rem;
    .good-item{
        width: 3.44rem;
        height: 4rem;
        border-radius: .1rem;
        box-sizing: border-box;
        @include layout-flex (column);
        overflow: hidden;
        position: relative;
        margin-bottom: .2rem;
        .good-img{
            width: 100%;
            height: 2.66rem;
        }
        .good-fote{
            height: 0;
            flex: 1;
            width: 90%;
            margin: 0.2rem;
            @include layout-flex (column,space-between,flex-start);
            
            .good-name{
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
            .good-price{
                font-weight: 600;
                font-size: .32rem;
                color:$color-A;
            }
        }
    }
}
</style>