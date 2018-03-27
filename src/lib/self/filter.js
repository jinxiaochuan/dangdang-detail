swig.setFilter('json_parse', function(value){
    if(!value || value == window.location){
        return {"name":"","address":""}
    }
    return JSON.parse(value)
})

swig.setFilter('amount_convert', function(value){
    return (value/100).toFixed(2)
})
