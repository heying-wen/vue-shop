<template>
<div class="header-container">
    <span class="iconfont back" @click="goBack">&#xe604;</span>
    <div class="input-bar">
        <input type="text" v-model.trim="keyword" placeholder="请输入关键词">
        <span class="iconfont clear" v-show="keyword !== ''" @click="keyword = ''">&#xe685;</span>
    </div>
    <div class="search-btn" @click="search()">搜索</div>
    <div class="quik-search" v-show="keyword !== ''">
        <div class="quik-search-item" v-for="item of quickSearch" :key="item" @click="search(item)">{{item}}</div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        query:String 
    },
    data () {
        return {
            keyword: '',
            quickSearch:[],
        }
    },
    watch: {
        keyword(){
            this.getQuickSearch()
        },
        query(val){
            if(val !== ''){
                this.keyword = val
            }
        }
    },
    methods: {
        goBack(){
            this.router.replace('/')
        },
        getQuickSearch(){
            if(this.keyword === ''){
                this.quikSearch = []
                return
            }
            this.axios.get('shose/search/quick',{
                params:{
                    keyword:this.keyword
                }
            }).then(res=>{ 
                this.quickSearch = res.list
            })
        },
        search(keyword = null){
            if(keyword === null){
                keyword = this.keyword
            }
            this.$emit('search',keyword)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
    width: 100%;
    height: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include layout-flex;
    .back{
        display: block;
        width: .6rem;
        font-size: .4rem;
        @include layout-flex(row,flex-start);
    }
    .input-bar{
        width: 0;
        flex: 1;
        height: .6rem;
        border: 1px solid #f1f1f1;
        border-radius: .3rem;
        background: #f3f4f5;
        font-size: .24rem;
        input{
            display: block;
            float: left;
            width: 80%;
            height: 100%;
            border: none;
            font-size: .24rem;
            border-radius: .3rem;
            text-indent: .2rem;
            background: transparent;
        }
        .clear{
            display: block;
            float: left;
            width: 20%;
            height: 100%;
            border-radius: .3rem;
            padding: .3rem;
            box-sizing: border-box;
            font-weight: bold;
            font-size: .28rem;
            color: $color-A;
            @include layout-flex(row,flex-end);
        }
    }
    .search-btn{
        display: block;
        width: .8rem;
        font-size: .24rem;
        @include layout-flex(row,flex-end);
    }
    .quik-search{
        width: 100%;
        height: 100%;
        background: $color-F;
        position: fixed;
        left: 0;
        top: .88rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        .quik-search-item{
            width: 100%;
            height: 1rem;
            @include layout-flex(row,flex-start);
            font-size: .24rem;
        }
    }
}
</style>