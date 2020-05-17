<template>
<div class="page">
    <common-header title="我的"></common-header>
    <div class="user-container">
        <div class="user-wrappar">
            <div class="user-avatar">
                <img :src="user.avatar">
                <input type="file" accept="images/*" @change="chooseAvatar">
            </div>
            
            <div class="user">
                <div class="user-nickname" @click="$router.push('/user/info')">{{user.nickname}} <span class="level">lv{{user.level}}</span></div>
                <div>积分：<span class="points">{{user.points}}</span></div>
            </div>
            <div class="user-sign iconfont" @click="$router.push('/user/sign')"><span>&#xe609;</span>签到</div>
        </div>
        <div class="order-menu-wrapper">
            <div class="order-menu">
                <div class="title"> 
                    我的订单
                    <span  @click="toUserOrder()" class="iconfont">查看更多&#xe601;</span> 
                </div>
                <div class="menu-list">
                    <div class="menu-cell" @click="toUserOrder(1)">
                        <span class="iconfont">&#xe63e;</span>
                        待付款
                    </div>
                    <div class="menu-cell" @click="toUserOrder(2)">
                        <span class="iconfont">&#xe629;</span>
                        待发货
                    </div>
                    <div class="menu-cell" @click="toUserOrder(3)">
                        <span class="iconfont">&#xe661;</span>
                        待收货
                    </div>
                    <div class="menu-cell" @click="toUserOrder(4)">
                        <span class="iconfont">&#xe754;</span>
                        已完成
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="navigate-wrapper">
        <div class="navigate">
            <div class="navigate-cell border-bottom" @click="$router.push('/user/notice')">
                <span class="iconfont icon">&#xe608;</span>
                <div class="navigate-text">我的消息</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="$router.push('/user/collect')">
                <span class="iconfont icon">&#xe662;</span>
                <div class="navigate-text">我的收藏</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="$router.push('/user/address')">
                <span class="iconfont icon">&#xe64e;</span>
                <div class="navigate-text">我的地址</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="$router.push('/user/footprint')">
                <span class="iconfont icon">&#xe655;</span>
                <div class="navigate-text">我的足迹</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="$router.push('/user/coupon')">
                <span class="iconfont icon">&#xe60a;</span>
                <div class="navigate-text">我的卡券</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="$router.push('/user/points')">
                <span class="iconfont icon">&#xe64b;</span>
                <div class="navigate-text">我的积分</div>
                <span class="iconfont">&#xe601;</span>
            </div>
            <div class="navigate-cell border-bottom" @click="logout">
                <span class="iconfont icon">&#xe623;</span>
                <div class="navigate-text">退出系统</div>
                <span class="iconfont">&#xe601;</span>
            </div>
        </div>
    </div>
    <common-footer></common-footer>
</div>
</template>
<script>
import { mapState ,mapActions} from 'vuex'
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import { Token } from '@/utils/token'
export default {
    components:{
        CommonHeader,
        CommonFooter,
    },
    computed:{
        ...mapState(['user'])
    },
    mounted(){
        this.getUser(this.axios)
    },
    methods:{
        ...mapActions(['getUser']),
        toUserOrder(status = -1){
            this.$router.push('/user/order?status='+ status)
        },
        chooseAvatar(e){
            if(e.target.files.length > 0){
                const file = e.target.files[0]
                const allowType = ['image/jpeg','image/gif','image/png','image/jpg']
                if(!allowType.includes(file.type)){
                    this.$showToast({
                        message:'类型不允许'
                    })
                    return
                }
                const maxSize = 1024*1024
                if(file.size > maxSize){
                    this.$showToast({
                        message:'图片过大'
                    })
                    return
                }
                const token = Token.getToken()
                const data = new FormData()
                data.append('image',file)
                this.$showLoading()
                this.axios.post('api/user/avatar',data,{
                    headers:{
                        token,
                        'Content-Type':'multipart/form-data'
                    }
                }).then(res =>{
                    this.user.avatar = res.src
                }).catch(err =>{
                    this.$showToast({
                        message:err.message
                    })
                }).finally(()=>{
                    this.$hideLoading()
                })
            }
        },
        logout(){
            Token.deleteToken()
            this.$router.replace('/')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    padding: $Header-H 0 $Footer-H;
    box-sizing: border-box;
    .user-container{
        width: 100%;
        height: 3.86rem;
        background: $color-A;
        border-radius:  0 0 13rem 13rem/2.6rem;
        .user-wrappar{
            width: 100%;
            height: 1.8rem;
            padding: 0 .4rem 0 .2rem;
            box-sizing: border-box;
            @include layout-flex;
            color: $color-F;
            .user-avatar{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 50%;
                border: .02rem solid $color-F;
                position: relative;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    
                }
                input{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    opacity: 0;
                }
            }
            .user{
                width: 0;
                flex: 1;
                padding: 0 .4rem;
                height: 50%;
                box-sizing: border-box;
                @include layout-flex(column,space-around,flex-start);
                font-size: .28rem;
                .user-nickname{
                    font-size: .32rem;
                    height: .6rem;
                     @include layout-flex;
                    .level{
                         @include layout-flex;
                        width: .4rem;
                        height: .4rem;
                        border-radius: 50%;
                        background: #eecf8d;
                        font-size: .2rem;
                        margin-left: .1rem;
                    }
                }
                .points{
                    font-weight: 600;
                }
            }
            .user-sign{
                font-size: .32rem;
            }
        }
        .order-menu-wrapper{
            width: 100%;
            height: 2.06rem;
            padding:  0 .2rem;
            box-sizing: border-box;
            .order-menu{
                width: 100%;
                height: 100%;
                background: $color-F;
                border-radius: .1rem;
                box-shadow: 0 .1rem .3rem 0 #f9d8d5 ;
                padding:  .2rem;
                box-sizing: border-box;
                .title{
                    width: 100%;
                    height: .4rem;
                    @include layout-flex(row, space-between);
                    font-size: .28rem;
                    color: $color-B;
                    .iconfont{
                        color: $color-D;
                        font-size: .28rem;
                    }
                }
                .menu-list{
                    width: 100%;
                    height: 1.2rem;
                    @include layout-flex(row, space-between);
                    .menu-cell{
                        width: 25%;
                        height: 100%;
                        @include layout-flex(column);
                        font-size: .24rem;
                        color: $color-C;
                        .iconfont{
                        color: $color-A;
                        font-size: .4rem;
                        margin-bottom: .2rem;
                        }
                    }
                }
            }
        }
    }
    .navigate-wrapper{
        width: 100%;
        padding:  0 .2rem;
        margin-top: .2rem;
        box-sizing: border-box;
        .navigate{
            width: 100%;
            height: 100%;
            background: $color-F;
            border-radius: .1rem;
            box-shadow: 0 0 .3rem 0 #f9d8d5 ;
            padding:  .2rem;
            box-sizing: border-box;
            font-size: .28rem;
            color: $color-C;
            .navigate-cell{
                width: 100%;
                height: .9rem;
                @include layout-flex(row, space-between);
                
                .navigate-text{
                    width: 0;
                    flex: 1;
                    height: 100%;
                    margin: 0 .2rem;
                    @include layout-flex(row,flex-start);
                }
                .iconfont {
                    font-size: .32rem;
                }
            }
        }
    }
}
</style>