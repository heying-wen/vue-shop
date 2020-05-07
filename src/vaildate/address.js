
export default {
    name (val) {
        if(val === ''){
            return {error:1,message: "收货人为空"}
        }
        return {error:0}
    },
    phone (val) {
        if(val === ''){
            return {error:1,message: "手机号为空"}
        }
        if(!/^1[3-9]\d{9}$/.test(val)){
            return {error:1,message:"手机号不正确"}
        }
        return {error:0}
    },
    province(val){
        if(val === ''){
            return {error:1,message: "请选择地区（省）"}
        }
        return {error:0}
    },
    city(val){
        if(val === ''){
            return {error:1,message: "请选择地区（市）"}
        }
        return {error:0}
    },
    area(val){
        if(val === ''){
            return {error:1,message: "请选择地区（区）"}
        }
        return {error:0}
    },
    address(val){
        if(val === ''){
            return {error:1,message: "请填写详细地址"}
        }
        return {error:0}
    }
}