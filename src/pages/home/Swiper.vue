<template>
<swiper :options="swiperOptions" class="swiper-container" v-if="show">
  <swiper-slide v-for="item of swiperList" :key="item">
    <img :data-src="item" class="swiper-lazy swiper-img">
    <div class="swiper-lazy-preloader"></div>
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { Swiper, SwiperSlide} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  props:{
    swiperList:Array
  },
  computed:{
    show (){
      return !!this.swiperList.length
    }
  },
  data(){
    return {
      swiperOptions:{
        pagination:{
          el: '.swiper-pagination',
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
  height: 3rem;
  .swiper-img{
    width: 100%;
    height: 100%;
  }
  /deep/ .swiper-pagination-bullet-active{
    background: #ffffff;
  }
}
</style>