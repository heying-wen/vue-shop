const formatPrice = function(price){
    const arr=price.toString().split('.')
    let num = parseInt(arr[1])
    if(isNaN(num)||num === 0){
        return arr[0]
    }else{
        return arr[0]+ num/100
    }
}

export{
    formatPrice
}