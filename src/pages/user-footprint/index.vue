<template>
<div class="page" ref="page">
     <common-header title="我的足迹" back="/user"></common-header>
     <div class="history-time-container">
        <div class="history-time">
            <div class="history-time-cell" v-for="(item,index) of historyDays" :key="item.day">
                <div class="week" >{{item.week}}</div>
                <div class="day" @click="ChangeTime" :data-index="index" :data-time="item.time" :class="{active:item.active ===1}">{{item.day}}</div>
                <div class="dist" :class="{active:item.number > 0}"></div>
            </div>
        </div>
        <div class="show-btn iconfont" v-html="showIcon" @click="showList = !showList"></div>
    </div>
    <div class="history-list" v-show="showList" v-infinite-scroll="loadHistory" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div v-for="(item,index) of history" :key="index" class="history-item">
            <div class="title">{{item.time}}</div>
            <div class="goods-list">
                <div class="goods-cell" v-for="val of item.list" :key="val.id">
                    <img :src="val.img">
                    <span class="goods-price">￥{{val.price|formatPrice}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {dateFormat} from '@/utils/function'
import { filters } from '@/utils/mixins'
export default {
    directives: {infiniteScroll},
    components:{
        CommonHeader,
    },
    mixins: [filters],
    data () {
        return {
            historyDays:[],
            showList:true,
            busy:false,
            page:1,
            hasMore:true,
            list:[],
            time:0,
        }
    },
    mounted () {
        let bodyHeight = document.documentElement.offsetHeight
        let headerHeight = document.querySelector('.header').offsetHeight
        this.$refs.page.style.height = bodyHeight - headerHeight + 'px'
        this.getHistoryTime()
    },
    computed: {
        showIcon(){
            return this.showList ? '&#xe658;' : '&#xe682;'
        },
        history(){
            const res= []
            this.list.forEach(item =>{
                let index = res.findIndex(val =>val.day === item.day)
                const goods={
                    id:item.goods_id,
                    img:item.goods_img,
                    price:item.price
                }
                if(index > -1){
                    res[index].list.push(goods)
                }else{
                    const time = item.day.toString()
                    const y = time.substr(0,4)
                    const m = time.substr(4,2)
                    const d = time.substr(-2)
                    res.unshift({
                        day:item.day,
                        time:dateFormat('m月d日',new Date(`${y}-${m}-${d}`)),
                        list: [goods]
                    })
                }
            })
            console.log(res)
            return res
        }
    },
    methods: {
        ChangeTime(e){
            console.log(e)
            this.time = parseInt(e.target.dataset.time)
            console.log(this.time)
            const currentIndex = parseInt(e.target.dataset.index) 
            this.historyDays.forEach((item,index) =>{
                if(index === currentIndex){
                    item.active = 1
                }else{
                    item.active = 0
                }
            })
            this.list = []
            this.busy = false,
            this.page = 1,
            this.hasMore = true
            this.loadHistory()
        },
        async getHistoryTime (){
            const token = Token.getToken()
            const res = await this.axios.get('shose/history/time',{
                headers:{
                    token
                }
            })
            this.historyDays = res
            console.log(res)
        },
        async loadHistory(){
            this.busy = true
            if(this.hasMore){
                const token = Token.getToken()
                const res = await this.axios.get('shose/history/get',{
                    params:{
                        page:this.page,
                        time:this.time
                    },
                    headers:{
                        token
                    }
                })
                this.page =res.page + 1
                if(res.list.length>0){
                    this.list = this.list.concat(res.list)
                    this.busy = false
                }else{
                    this.hasMore = false
                }
                console.log(res)
            }
        },
        
    },
    
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    margin-top: $Header-H;
    background: $color-E;
    .history-time-container{
        width: 100%;
        height: 1.3rem;
        padding-top: .2rem;
        box-sizing: border-box;
        position: relative;
        background: $color-F;
        .show-btn{
            width: .4rem;
            height: .4rem;
            @include layout-flex;
            color: $color-B;
            border: 1px solid $color-E;
            border-radius: 50%;
            box-sizing: border-box ;
            position: absolute;
            right: .3rem;
            bottom: 0;
            transform: translateY(50%);
            font-size: .3rem;
            background: $color-F;
        }
        .history-time{
            width: 100%;
            height: 100%;
            padding: 0 .3rem;
            box-sizing: border-box;
            @include layout-flex;
            .history-time-cell{
                width: 14.2857%;
                height: 100%;
                color: $color-D;
                @include layout-flex(column,space-between);
                .week{
                    width: 100%;
                    height: 45%;
                    @include layout-flex;
                    font-size: .32rem;
                }
                .day{
                    width: .4rem;
                    height: .4rem;
                    @include layout-flex;
                    font-size: .26rem;
                    border-radius: 50%;
                    &.active{
                        background: $color-A;
                        color: $color-F;
                    }
                }
                .dist{
                    width: .1rem;
                    height: .1rem;
                    border-radius: 50%;
                    background:$color-F;
                    &.active{
                        background: $color-A;
                    }
                }
            }
        }
    }
    .history-list{
        width: 100%;
        padding: 0 .2rem;
        box-sizing: border-box;
        background: $color-E;
        .title{
            line-height: .6rem;
            font-size: .26rem;
            color:$color-C;
        }
        .goods-list{
            width: 100%;
            @include layout-flex(row,flex-start);
            flex-wrap: wrap;
            .goods-cell{
                width: 2.23rem;
                height: 2.6rem;
                background: $color-F;
                margin-bottom: .2rem;
                @include layout-flex(column);
                &:nth-child(3n+2){
                    margin:  0 .2rem .2rem;
                }
                img{
                    width: 100%;
                    height: 2rem;
                }
                .goods-price{
                    width: 100%;
                    height: .6rem;
                    text-indent: .3rem;
                    line-height: .6rem;
                    color: $color-A;
                    font-size: .28rem;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>