<template>
<swiper :options="swiperOptions" class="swiper-container" v-if="show">
    <swiper-slide v-for="item of gallery" :key="item">
        <img :data-src="item" class="swiper-lazy swiper-img">
        <div class="swiper-lazy-preloader"></div>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
export default {
    props:{
        gallery:Array
    },
    computed:{
        show (){
            return !!this.gallery.length
        }
    },
    data(){
    return {
        swiperOptions:{
            pagination:{
                el: '.swiper-pagination',
                type: "fraction"
            },
            autoplay:true,
            loop : true,
            lazy : {
                loadPrevNext:true,
            }
        }
    }
    },
    components:{
        Swiper,
        SwiperSlide
    },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swiper-container{
    width: 100%;
    // height: 0;
    // overflow: hidden;
    // padding-bottom: 100%;//相当于100vw，要注意此时高度为0，子集不能用高100%
    height: 100vw;//不适用IE低版本
    .swiper-img{
        width: 100%;
        height: 100%;
    }
    /deep/ .swiper-pagination-fraction{
        background: rgba($color: #000000, $alpha: .5);
        width: .8rem;
        height: .4rem;
        border-radius: .2rem;
        @include layout-flex;
        color: $color-F;
        letter-spacing: 1px;
        font-size: .24rem;
        left: 85%;
    }
     
}
</style>