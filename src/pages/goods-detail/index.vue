<template>
<div>
    <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity" :scrollTab="scrollTab" @tab="changeTab"></detail-header>
    <div class="page" ref="page">
        <div style="height:1000px">
            <div id="goods">
                <detail-Gallery :gallery="gallery"></detail-Gallery>
            </div>
            <div style="height:200px" >
                <div class="goods-name">{{goods.goods_name}}</div>
            </div>
            <div style="height:200px" id="comment">评论</div>
            <div id="detail">详情</div>
        </div>
    </div>
</div>

</template>
    
<script>
import BScroll from 'better-scroll'
import DetailHeader from "./Header"
import DetailGallery from "./Gallery"
export default {
    props:{
        id:Number
    },
    components:{
        DetailHeader,
        DetailGallery,
    },
    data(){
        return {
            scrollTab:'goods',
            showIconMenu:true,
            comment: {}, 
            headerOpacity:0,
            gallery: [],
            goods: {},
            scroll: null,
            scrollOptions: {
                startY: 0,
                click: true,
                scrollX: false,
                scrollY: true,
                // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
                probeType: 3,
                scrollbar: false
            }
        }
    },
    mounted() {
        this.getGoods()
        this.initScroll()
    },
    methods:{
        changeTab(tabName){
            this.scrollTab = tabName
            this.scroll.scrollToElement('#'+tabName,1000,0 ,-50)
        },
        initScroll(){
            this.$nextTick( ()=>{
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.page, this.scrollOptions)
                } else {
                    this.scroll.refresh() // 重新属性BScroll状态
                }
                 this.scroll.on('scroll',position => {
                    const y = Math.abs(position.y)
                    const headerOpacity = y / 150
                    this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity
                    if(y > 50){
                        this.showIconMenu = false
                        this.headerOpacity = headerOpacity
                    }else{
                        this.showIconMenu = true
                    }
                })
            }) 
        },
        getGoods(){
            this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
                const {comment: commentList,commenTotal,gallery,goods} = result
                this.comment = {
                    list: commentList,
                    count: commenTotal
                }
                this.gallery = gallery
                this.goods = goods
                console.log(goods,commentList)
            }).catch(err =>{
                console.log(err)
                this.$router.push('/goods-notfound')
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: $color-E;
}
</style>