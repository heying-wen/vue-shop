<template>
<detail-header></detail-header>
</template>
    
<script>
import DetailHeader from "./Header"
export default {
    props:{
        id:Number
    },
    components:{
        DetailHeader
    },
    data(){
        return {
            comment: {},
            gallery: [],
            goods: {}
        }
    },
    mounted() {
        this.getGoods()
    },
    methods:{
        getGoods(){
            this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
                const {comment: commentList,commenTotal,gallery,goods} = result
                this.comment = {
                    list: commentList,
                    count: commenTotal
                }
                this.gallery = gallery
                this.goods = goods
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
</style>