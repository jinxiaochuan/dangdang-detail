swig.setFilter('json_parse',function(value){
    if(!value){
        return {"name":"","address":""}
    }
    return JSON.parse(value)
})
