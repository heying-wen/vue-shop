import {config} from '../config/config'
const formatPrice = function(price){
    const arr=price.toString().split('.')
    let num = parseInt(arr[1])
    if(isNaN(num)||num === 0){
        return arr[0]
    }else{
        return parseInt(arr[0]) + num/100
    }
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
    };
    return fmt;
}

const validate = function(data,vaildateObject){
  for(let key in data){
  if(Reflect.has(vaildateObject,key)){
    const res = vaildateObject[key](data[key],data.password)
    if(res.error !== 0){
     return res
    }
  }
}
return {error: 0}
}

const getOrderStatus = function(status){
  const statusOptions = getConfig('order.status')
  return statusOptions[status] || ''
}

// const getConfig = function (name){
//   if(name.includes('.')){
//     const k1 = name.slice(0,name.indexOf('.'))
//     const s1 = name.slice(name.indexOf('.')+1)
//     const r1 = config[k1]
//     const k2 = s1.slice(0,s1.indexOf('.'))
//     const s2 = s1.slice(s1.indexOf('.')+1)
//     const r2 = r1[k2]
//     const r3 = r2[s2]
//     console.log(k1,s1,r1,k2,s2,r2,r3)
//   }else{
//     return config[name]
//   }
// }
const getConfig = function (name, arr = config) {
  if (name.includes('.')) {
    const k1 = name.slice(0,name.indexOf('.'))
    const s1 = name.slice(name.indexOf('.')+1)
    return getConfig(s1, arr[k1]) 
  } else {
    return arr[name]
  }
}

export{
    formatPrice,
    dateFormat,
    validate,
    getOrderStatus,
    getConfig
}