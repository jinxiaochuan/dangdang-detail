swig.setFilter('json_parse',function(value){
    if(!value){
        return "{}"
    }
    return JSON.parse(value)
})
