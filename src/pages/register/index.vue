<template>
<div class="page"> 
    <common-header :title="'注册'" :back="`/login?url=${encodeURIComponent(loginRedirect)}`"></common-header>
    <div class="content" ref="content">
        <div class="login-contaiter">
            <div class="login-content">
                <div class="login-input border-bottom">
                    <span>账号</span>
                    <input type="text" v-model.trim="username" placeholder="请输入账号">
                </div>
                <div class="login-input">
                    <span>密码</span>
                    <input type="password" v-model.trim="password" placeholder="请输入登录密码">
                </div>
                <div class="login-input">
                    <span>确定密码</span>
                    <input type="password" v-model.trim="confirmPwd" placeholder="请确定登录密码">
                </div>
                <div class="login-input">
                    <span>昵称</span>
                    <input type="text" v-model.trim="nickname" placeholder="请输入昵称">
                </div>
            </div>
            <div class="login-btn">
                <div class="submit" @click="register">提交</div>
            </div>
            <div class="login-desc">
                 <router-link :to="`/login?url=${encodeURIComponent(loginRedirect)}`">去登录</router-link>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import CommonHeader from '@/components/Header'
export default {
    components:{
        CommonHeader,
    },
    data(){
        return {
            backUrl:'',
            username:'',
            password:'',
            confirmPwd:'',
            nickname:'',
            loginRedirect:'',
            forDataValidator:{
                username (val) {
                    if(val === ''){
                        return {error:1,message: "账号为空"}
                    }
                    if(val.length < 3){
                        return {error:1,message: "账号长度小于3"}
                    }
                    return {error:0}
                },
                password (val) {
                    if(val === ''){
                        return {error:1,message: "密码为空"}
                    }
                    if(val.length < 6){
                        return {error:1,message: "密码长度小于6"}
                    }
                    return {error:0}
                },
                confirmPwd (val,password) {
                    if(val === ''){
                        return {error:1,message: "确认密码为空"}
                    }
                    if(val !== password){
                        return {error:1,message: "两次密码不一致"}
                    }
                    return {error:0}
                },
                nickname (val) {
                    if(val === ''){
                        return {error:1,message: "昵称为空"}
                    }
                    if(val.length < 2){
                        return {error:1,message: "昵称长度小于2"}
                    }
                    return {error:0}
                }
            }
        }
    },
    mounted(){
        let bodyHeight = document.documentElement.offsetHeight
        this.$refs.content.style.height = bodyHeight + 'px'
        this.loginRedirect = decodeURIComponent(this.$route.query.url) || '/'
    },
    methods:{
        register(){
            const data = {
                username :this.username,
                password :this.password,
                confirmPwd :this.confirmPwd,
                nickname :this.nickname,
            }
            const validate = this.validate(data)
            if(!validate){
                return 
            }
            this.axios.post('shose/user/register',data).then(()=>{
                this.$router.push(`/login?url=${encodeURIComponent(this.loginRedirect)}`)
            }).catch(err =>{
                this.$showToast({
                    message:err.message
                })
            })
        },
        validate(data){
            for(let key in data){
                if(Reflect.has(this.forDataValidator,key)){
                    const res = this.forDataValidator[key](data[key],data.password)
                    if(res.error !== 0){
                        this.$showToast({
                            message:res.message
                        })
                        return false
                    }
                }
            }
            return true
        },
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 100%;
    margin-top: $Header-H;
    background: $color-E;
   .content{
        width: 100%;
        .login-contaiter{
            padding: .4rem 0 ;
            width: 100%;
            box-sizing: border-box;
            .login-input{
                width: 100%;
                height: 1rem;
                @include layout-flex;
                background: $color-F;
                span{
                    width: 2rem;
                    height: 100%;
                    @include layout-flex($justify:flex-start);
                    padding-left: .2rem;
                    box-sizing: border-box;
                }
                input{
                    flex: 1;
                    width: 0;
                    height: 100%;
                }
            }
            .login-btn{
                width: 90%;
                height: .9rem;
                margin: .2rem 5% 0;
                background: $color-A;
                border-radius: .3rem;
                @include layout-flex;
                color: $color-F;
            }
            .login-desc{
                width: 100%;
                height: .4rem;
                color: $color-A;
                font-size: .3rem;
                margin-top: .2rem;
                padding-right: .2rem;
                box-sizing: border-box;
                @include layout-flex($justify:flex-end);
            }
        }
    } 
}

</style>