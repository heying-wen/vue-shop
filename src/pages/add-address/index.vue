<template>
<div class="page">
    <common-header :title="'编辑地址'" :back="backUrl"></common-header>
    <div class="add-address">
        <div class="row border-bottom">
            <label class="title">收货人</label>
            <input type="text" placeholder="姓名" class="input">
        </div>
        <div class="row border-bottom">
            <label class="title">联系电话</label>
            <input type="text" placeholder="电话" class="input">
        </div>
        <div class="row border-bottom">
            <label class="title">选择地区</label>
            <div class="input region-input">
                地区信息
                <span class="iconfont">&#xe601;</span>
            </div>
        </div>
        <div class="row border-bottom">
            <label class="title">详细地址</label>
            <textarea placeholder="街道门牌信息" class="textarea"></textarea>
        </div>
        <div class="row border-bottom">
            <label class="title">设置为默认地址</label>
            <div class="switch-container">
                <input type="checkbox" id="user-switch">
                <label for="user-switch"></label>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
// import {Token} from '@/utils/token'
// const USER_TOKEN =Token.getToken()
// const MAX_ADDRESS_NUM = 10
export default {
    components:{
        CommonHeader
    },
    beforeRouteEnter (to,from,next) {
        next(vm => {
            vm.backUrl = from.path
        })
    },
    data(){
        return{
            backUrl:'',
        }
    },
    mounted(){
        
    },
    methods:{
        
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    padding: $Header-H 0 0.9rem;
    box-sizing: border-box;
    background: $color-F;
    .add-address{
        width: 100%;
        .row{
            width: 100%;
            height: .9rem;
            padding: .2rem;
            box-sizing: border-box;
            @include layout-flex;
            font-size: .32rem;
            .title{
                width: 0;
                flex: 1;
                color: $color-B;
            }
            .input{
                width: 5.2rem;
                line-height: .4rem;
                font-size: .28rem;
            }
            .textarea{
                width: 5.2rem;
                font-size: .28rem;
                line-height: .4rem;
                resize: none;
            }
            .region-input{
                @include layout-flex($justify:space-between);
                color: $color-D;
            }
        }
    }
}

.switch-container{
    height: .5rem;
    width: 1rem;
    display: inline-block;
    overflow: hidden;
}
.switch-container input{
    display: none
}
.switch-container label{
    display: block;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,.25);
    cursor: pointer;
    border-radius: .5rem;
    transition: all .4s ease;
}
.switch-container label:before{
    content:'';
    display: block;
    border-radius: .5rem;
    height: .42rem;
    width: .42rem;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    transition: all .4s ease;
    background-color: #fff;
    position: relative;
    right: -2px;
    top: 2px;
}

.switch-container input:checked~label:before{
    right: -.5rem;
    background-color: #fff;
}

.switch-container input:checked~label{
    background-color: #ff5e46;
}
</style>