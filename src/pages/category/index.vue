<template>
<div>
    <common-header title="分类" :back="backUrl"></common-header>
    <search></search>
    <common-footer></common-footer>
</div>
</template>
    
<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import Search from '@/components/Search'
export default {
    components:{
        CommonHeader,
        CommonFooter,
        Search
    },
    data(){
        return {
            backUrl :'',
            categroy:[],
            subCategroy:[],
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
    },
    methods:{
        //获取一级分类
        async getCategory (){
            const category = await this.axios.get('api/goods_category?type=1')
            console.log(category)
            if(category.length>0){
                this.getSubCategory(category[0].cat_id)
            }
        },
        //获取二级分类
        async getSubCategory (catId){
            const category = await this.axios.get('api/goods_category?type=1&cat_id'+catId)
            console.log('sub', category)
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
</style>