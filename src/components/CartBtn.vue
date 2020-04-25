<template>
<div>
    <span class="shopping-cart iconfont" :style="style" @click="addToCart">&#xe628;</span>
</div>
</template>
<script>
import {Storage} from '@/utils/storage'
export default {
    props:{
        fontSize:{
            type:String,
            default: '.4rem'
        },
        goods:{
            type:Object,
            default(){
                return {}
            }
        },
        buyNumber:{
            type:Number,
            default:1,
        }
    },
    computed:{
        style(){
            return {
                fontSize : this.fontSize
            }
        }
    },
    methods:{
        addToCart(){
            if(Object.keys(this.goods).length === 0){
                return
            }
            const goods = this.goods 
            const cart = Storage.getItem('cart') || []
            const index = cart.findIndex(item => item.id === goods.id)
            if(index === -1){
                const cartData = {
                    ...goods,
                    selected:true,
                    buyNumber : this.buyNumber
                }
                cart.push(cartData)
            }else{
                const buyNumber = cart[index].buyNumber
                const selected = cart[index].selected
                cart[index] = {
                    ...goods,
                    selected,
                    buyNumber : this.buyNumber + buyNumber
                }
            }
            Storage.setItem('cart',cart)
            alert('添加成功')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.shopping-cart{
    position: absolute;
    right: 0.2rem;
    bottom: .24rem;
    color:$color-A;
}
</style>