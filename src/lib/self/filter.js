swig.setFilter('json_parse',function(value){
    if(!value || value == window.location){
        return {"name":"","address":""}
    }
    return JSON.parse(value)
})
