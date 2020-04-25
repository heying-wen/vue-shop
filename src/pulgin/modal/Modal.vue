<template>
<transition name="dade">
    <div class="container" v-if="visible">
        <div class="modal">
            <div class="modal-title border-bottom" v-if="title !== ''">{{title}}</div>
            <div class="modal-content"  v-if="content !== ''">{{content}}</div>
            <div class="modal-btn border-top">
                <div @click="cancelModal">{{btn.cancel}}</div>
                <div @click="confrimModal">{{btn.confrim}}</div>
            </div> 
        </div>
    </div>
</transition>
</template>
<script>
export default {
    data(){
        return {
            visible:false,
            title:'',
            content: '',
            btn:{
                confrim: '确定',
                cancel:'取消',
            }
        }
    },
    methods:{
        cancelModal(){
            this.visible =false
            const result = {
                confrim:false,
                cancel: true,
            }
            this.$emit('modal',result)
        },
        confrimModal(){
            this.visible =false
            const result = {
                confrim:true,
                cancel: false,
            }
            this.$emit('modal',result)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba($color: #000000, $alpha: .3);
    @include layout-flex;
    .modal{
        background: $color-F;
        color: $color-B;
        border-radius: .1rem;
        max-width: 100%;
        min-width: 50%;
        box-sizing: border-box;
        font-size: .32rem;
        @include layout-flex(column);
        .modal-title{
            width: 100%;
            height: .4rem;
            padding: .2rem;
            @include layout-flex;
        }
        .modal-content{
            width: 100%;
            height: .4rem;
            padding: .2rem;
            @include layout-flex;
        }
        .modal-btn{
            width: 100%;
            height: .8rem;
            @include layout-flex($justify:space-between);
            div{
                width: 50%;
                 @include layout-flex
            }
        }
    }
}
</style>