<template>
<div class="page">
    <common-header :title="'编辑地址'" :back="backUrl"></common-header>
    <div class="add-address">
        <div class="row border-bottom">
            <label class="title">收货人</label>
            <input type="text" placeholder="姓名" class="input" v-model="name">
        </div>
        <div class="row border-bottom">
            <label class="title">联系电话</label>
            <input type="text" placeholder="电话" class="input" v-model="phone">
        </div>
        <div class="row border-bottom">
            <label class="title">选择地区</label>
            <div class="input region-input" @click="showChooseAddress=true">
                {{region}}
                <span class="iconfont">&#xe601;</span>
            </div>
        </div>
        <div class="row border-bottom">
            <label class="title">详细地址</label>
            <textarea placeholder="街道门牌信息" class="textarea" v-model="address"></textarea>
        </div>
        <div class="row border-bottom">
            <label class="title">设置为默认地址</label>
            <div class="switch-container">
                <input type="checkbox" id="user-switch" v-model="isDefult">
                <label for="user-switch"></label>
            </div>
        </div>
    </div>
    <div class="choose-region" v-show="showChooseAddress">
        <div class="mask"  @click="showChooseAddress=false"></div>
        <v-distpicker :province="province" :city="city" :area="area" type="mobile" @selected="selectAddress"></v-distpicker>
    </div> 
    <div class="login-btn">
        <div class="submit" @click="saveAddress">提交</div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
import VDistpicker from 'v-distpicker'
import addressVaildate from '@/vaildate/address'
import { validate } from '@/utils/function'
import { Token } from '@/utils/token'
const USER_TOKEN =Token.getToken()
export default {
    components:{
        CommonHeader,
        VDistpicker
    },
    beforeRouteEnter (to,from,next) {
        next(vm => {
            vm.backUrl = to.query.url || from.path
        })
    },
    data(){
        return{
            backUrl:'',
            showChooseAddress:false,
            province:'',
            city:'',
            area:'',
            name:'',
            phone:'',
            address:'',
            isDefult:false,
        }
    },
    computed:{
        region(){
            if(this.province === ''){
                return '地区信息'
            }else{
                return `${this.province} ${this.city} ${this.area}`
            }
        }
    },
    methods:{
        saveAddress(){
             const data = {
                name :this.name,
                phone :this.phone,
                province :this.province,
                city :this.city,
                area :this.area,
                address :this.address,
                is_defalut :this.isDefult ? 1 : 0 
            }
            const res = validate(data,addressVaildate)
            if(res.error !== 0){
                this.$showToast({
                    message: res.message
                })
                return
            }
            this.$showLoading()
            this.axios.post('shose/address/add',data,{
                headers:{
                    token:USER_TOKEN
                }
            }).then((res)=>{
                const addressId = res.address_id
                this.$router.push(this.backUrl+'?selectAddressId='+addressId)
            }).catch(err =>{
                this.$showToast({
                    message:err.message
                })
            }).finally(()=>{
                this.$hideLoading()
            })
        },
        selectAddress(data){ 
            this.province = data.province.value
            this.city = data.city.value
            this.area = data.area.value
            this.showChooseAddress=false
        }
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
    .choose-region{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        .mask{
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 0;
            background: rgba($color: #000000, $alpha: .3);
        }
        /deep/ .distpicker-address-wrapper{
            width: 100%;
            height: 50%;
            position: fixed;
            left: 0;
            top: 50%;
            background: $color-F;
        }
    }
    .login-btn{
        width: 90%;
        height: .9rem;
        margin: .2rem 5% 0;
        background: $color-A;
        border-radius: .1rem;
        @include layout-flex;
        color: $color-F;
        font-size: .32rem;
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