swig.setFilter('json_parse', function(value){
    if(!value || value == window.location){
        return {"name":"","address":""}
    }
    return JSON.parse(value)
})

swig.setFilter('amount_convert', function(value){
    return (value/100).toFixed(2)
})

swig.setFilter('Numberal', function(num){
    if(!num || isNaN(parseFloat(num))) {
        return ''
    }
    if(num < 10000){
        return num
    }
    // 18900 -> 1.8w
    var numStr = (num/10000).toString();
    var numArr = numStr.split('.');
    return (numArr.length == 1 ? numStr + '.0' : numArr[0] + '.' + numArr[1].substr(0, 1)) + 'w'
})
