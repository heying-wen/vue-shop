<template>
<div class="page" :v-loading="true"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    111111
</div>
</template>

<script>
// import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
export default {
    // mounted () {
    //     const loading = this.$loading({
    //         lock: true,
    //         text: 'Loading',
    //         spinner: 'el-icon-loading',
    //         background: 'rgba(0, 0, 0, 0.7)'
    //     });
    // }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 300px;
    background: #ff9900;
}
</style>