<template>
<div class="page">
    <div class="search-header">
        <span class="iconfont back" @click="$router.push('./search')">&#xe604;</span>
        <div class="input" @click="$router.push('./search?q=' +keyword)">{{keyword}}</div>
        <span class="iconfont home" @click="$router.push('./')">&#xe600;</span>
    </div>
    <div class="sort-container border-bottom">
        <div class="sort-item" :class="{active: sortField==='goods_id'}" @click="sortGoodsList('goods_id')">
            综合
        </div>
        <div class="sort-item" :class="{active: sortField==='sale_num'}" @click="sortGoodsList('sale_num')">
            最热
        </div>
        <div class="sort-item" :class="{active: sortField==='is_new'}" @click="sortGoodsList('is_new')">
            新品
        </div>
        <div class="sort-item" :class="{active: sortField==='goods_price'}" @click="sortGoodsList('goods_price')">
            价格
            <span class="iconfont">&#xe6b7;</span>
        </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="50">
        <list :list="goodsList"></list>
    </div>
</div>
</template>

<script>
import List from './List'
import infiniteScroll from 'vue-infinite-scroll'
export default {
    directives: {infiniteScroll},
    components: {
        List
    },
    data () {
        return {
            keyword: '',
            sortField: 'goods_id',
            sortType:'',
            goodsList:[],
            page:1, //为你推荐页码
            count:8, //为你推荐每次获取的数量
            totalPage:0,//为你推荐总页数
            busy:false,
            scrollDistance:50,
        }
    },
    mounted () {
        this.keyword = this.$route.query.q
    },
    methods: {
        sortGoodsList(sortField){
            this.sortField = sortField
            this.resetDate()
        },
        resetDate(){
            this.goodsList = [],
            this.page = 1,
            this.totalPage = 0,
            this.busy = false
            if(this.sortField !== 'goods_price'){
                this.sortType = ''
            }else{
                if(this.sortType === ''){
                    this.sortType = 'asc'
                }else{
                    this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'
                }
            }
        },
        async getGoodsList(){
            this.$showLoading()
            const {goods,total} = await this.axios.get('api/goods_list?type=1',{
                params: {
                    page: this.page,
                    count: this.count,
                    keyword:this.keyword,
                    sortField: this.sortField,
                    sortType: this.sortType
                }
            })
            this.$hideLoading()
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
    margin-top: 1.68rem;
}
.search-header{
    width: 100%;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include layout-flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 333;
    background: $color-F;
    .back ,.home{
        display: block;
        width: .6rem;
        font-size: .4rem;
    }
    .back{
        @include layout-flex(row,flex-start);
    }
    .home{
        @include layout-flex(row,flex-end);
    }
    .input{
        width: 0;
        flex: 1;
        height: .6rem;
        border: 1px solid #f1f1f1;
        border-radius: .3rem;
        background: #f3f4f5;
        font-size: .3rem;
        @include layout-flex(row,flex-start);
        padding-left: .2rem;
    }
}
.sort-container{ 
    width: 100%;
    height: .8rem;
    @include layout-flex;
    position: fixed;
    left: 0;
    top:$Header-H;
    z-index: 99;
    background: $color-F;
    .sort-item{
        @include layout-flex;
        width: 25%;
        height: 100%;
        font-size: .32rem;
        color:$color-D;
        &.active{
            color: $color-A;
        }
    }
}
</style>