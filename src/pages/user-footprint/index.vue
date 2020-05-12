<template>
<div class="page">
     <common-header title="我的足迹" back="/user"></common-header>
     <div class="history-time-container">
        <div class="history-time">
            <div class="history-time-cell" v-for="item of historyDays" :key="item.day">
                <div class="week" >{{item.week}}</div>
                <div class="day" :class="{active:item.active ===1}">{{item.day}}</div>
                <div class="dist" :class="{active:item.number>0}"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
export default {
    components:{
        CommonHeader,
    },
    data () {
        return {
            historyDays:[]
        }
    },
    mounted () {
        this.getHistoryTime()
    },
    methods: {
        async getHistoryTime (){
            const token = Token.getToken()
            const res = await this.axios.get('shose/history/time',{
                headers:{
                    token
                }
            })
            this.historyDays = res
            console.log(res)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    margin-top: $Header-H;
    .history-time-container{
        width: 100%;
        height: 1.3rem;
        padding-top: .2rem;
        box-sizing: border-box;
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
                    height: 50%;
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
}
</style>