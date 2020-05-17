<template>
<div class="page">
    <common-header :title="'我的收藏'" :back="'/user'"></common-header>
    <div class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
        <div class="goods-item" v-for="item of list" :key="item.goods_id">
            <img class="goods-img" :src="item.goods_img">
            <div class="list-container">
                <span class="goods-name">{{item.goods_name}}</span>
                <span class="goods-price">￥{{item.goods_price|formatPrice}}</span>
            </div>
            <div class="goods-oper">
                <div class="show-goods" @click="$router.push(`/goods-detail/${item.goods_id}`)">去看看</div>
                <div class="cancel" @click="cancelCollect(item.goods_id)">取消收藏</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import { Token } from '@/utils/token'
import {filters} from "@/utils/mixins"
export default {
    directives: {infiniteScroll},
    components:{
        CommonHeader
    },
    mixins:[filters],
    data(){
        return{
            list:[],
            page:1, //为你推荐页码
            count:8, //为你推荐每次获取的数量
            totalPage:0,//为你推荐总页数
            busy:false,
            scrollDistance:20,
        }
    },
    methods:{
        async getUserCollect(){
            this.$showLoading()
            const token = Token.getToken()
            const {list,total} = await this.axios.get('shose/user/getCollect',{
                params: {
                    page: this.page,
                    count: this.count,
                },
                headers:{
                    token
                }
            })
            this.$hideLoading()
            this.list = this.list.concat(list)
            console.log(this.list)
            if(this.list.length === 0){
                this.totalPage = -1
            }else{
                if(this.page === 1){
                    this.totalPage = Math.ceil(total/this.count)
                }
                this.page++
            }
            
        },
        async loadMore(){
            this.busy = true
            if(this.page <= this.totalPage || this.totalPage === 0){
                await this.getUserCollect()
                this.busy =false
            }
        },
        cancelCollect(goodsId){
            this.$showModal({
                content:'确定要取消收藏嘛？',
                success:res=>{
                    if(res.confrim){
                        const token = Token.getToken()
                        this.$showLoading() 
                        this.axios.post('shose/collect/cancel', {goods_id: goodsId},{
                            headers:{
                                token
                            }
                        }).then(()=>{
                            this.$showToast({
                                message:'取消成功',
                                callback:() =>{
                                    const index =this.list.findIndex(item => item.goods_id === goodsId)
                                    this.list.splice(index,1)
                                }
                            })
                        }).catch(err=>{
                            this.$showToast({
                                message:err.message
                            })
                        }).finally(()=>{
                            this.$hideLoading()
                        })
                        
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding-top: $Header-H;
    box-sizing: border-box;
    background: $color-F;
    .goods-item{
        width: 100%;
        height: 2.6rem;
        display: flex;
        padding: .2rem;
        box-sizing: border-box;
        border:  1px solid #f1f1f1;
        border-radius: .1rem;
        margin-top: .2rem;
        position: relative;
        .goods-oper{
            position: absolute;
            right: .2rem;
            bottom: .2rem;
            @include layout-flex(column);
            .show-goods{
                width: 1.4rem;
                font-size: .24rem;
                height: .5rem;
                background: $color-A;
                border-radius: .25rem;
                color: $color-F;
                @include layout-flex;
            }
            .cancel{
                width: 1.4rem;
                font-size: .24rem;
                height: .5rem;
                color: $color-D;
                @include layout-flex;
            }
        }
        .goods-img{
            width: 2.2rem;
            height: 2.2rem;
            border-radius: .1rem;
        }
        .list-container{
            box-sizing: border-box;
            padding: .2rem 0;
            margin-left: .2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 0;
            flex: 1;
            position: relative;
            .goods-price{
                font-size: .36rem;
                color: $color-A;
                font-weight: 700;
                margin-top: .4rem;
            }
            .goods-name{
                font-size: .28rem;
                color: $color-B;
                font-weight: 700;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>