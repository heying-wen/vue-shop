<template>
<div class="page">
    
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">内容</van-popup> -->
    <!-- <van-icon name="cross" />
    <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" /> -->
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="onConfirm" />
    <van-radio-group v-model="radio">
        <van-radio name="1">单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
    </van-radio-group>
    <van-dialog v-model="show" title="标题" show-cancel-button>
        <img src="https://img.yzcdn.cn/vant/apple-3.jpg" />
    </van-dialog>
    
    111111
</div>
</template>

<script>

import { Calendar,Radio,RadioGroup,Dialog } from 'vant';
export default {
    components: {
        // vanButton:Button,
        // vanIcon:Icon,
        // vanPopup:Popup,
        vanCalendar:Calendar,
        vanRadio:Radio,
        vanRadioGroup:RadioGroup,
        vanDialog:Dialog,
        [Dialog.Component.name]: Dialog.Component,
    },
    data() {
        return {
        date: '',
        show: false,
        radio: '1',
        };
    },
    methods: {
        formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
        },
        onConfirm(date) {
        this.show = false;
        this.date = this.formatDate(date);
        },
    },
    
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
    width: 100%;
    height: 110px;
}
</style>