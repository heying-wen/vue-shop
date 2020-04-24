<template>
<div>
    <common-header title="分类" :back="backUrl"></common-header>
    <search></search>
    <div class="content">
        <div class="content-left" ref="left">
            <category :content="category" @change="loadSubCategory"></category>
        </div>
        <div class="content-content">
            <sub-category :content="subCategory"></sub-category>
        </div>
    </div>
    <common-footer></common-footer>
</div>
</template>
    
<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import Search from '@/components/Search'
import Category from './Category'
import SubCategory from './SubCategory'
export default {
    components:{
        CommonHeader,
        CommonFooter,
        Search,
        Category,
        SubCategory
    },
    data(){
        return {
            backUrl :'',
            category:[],
            subCategory:[],
            catId:0,
        }
    },
    beforeRouteEnter (to,from,next) {
        next(vm => {
            vm.backUrl = from.path
        })
    },
    mounted (){
        this.getCategory()
        const categoryHeight = document.querySelector('.content-left')
        const subCategoryHeight = document.querySelector('.content-content')
        const headerHeight = document.querySelector('.header').offsetHeight
        const footerHeight = document.querySelector('.footer-container').offsetHeight
        const searchHeight = document.querySelector('.search').offsetHeight
        const windowHeight = document.documentElement.offsetHeight
        categoryHeight.style.height = windowHeight - headerHeight - footerHeight - searchHeight  + 'px'
        subCategoryHeight.style.height = windowHeight - headerHeight - footerHeight - searchHeight  + 'px'
    },
    methods:{
        //获取一级分类
        
        async getCategory (){
            this.$showLoading()
            const category = await this.axios.get('api/goods_category?type=1')
            this.$hideLoading()
            if(category.length>0){
                this.category = category
                this.getSubCategory(category[0].cat_id)
            }
            
        },
        //获取二级分类
        async getSubCategory (catId){
            this.$showLoading()
            this.subCategory = await this.axios.get('api/goods_category?type=1&cat_id='+catId)
            this.$hideLoading()
        },
        loadSubCategory(catId){
            this.getSubCategory(catId)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.content{
    margin-top: $Header-H+$Search-H;
    width: 100%;
    height: 100%;
    @include layout-flex;
    .content-left{
        width: 2rem;
        background: $color-E;
        color: $color-C;
    }
    .content-content{
        width: 0;
        flex: 1;
        margin-bottom: .1rem;
    }
}
</style>