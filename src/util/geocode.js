const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicnViaWtzbWFuMTAwIiwiYSI6ImNrM29xYzlxbTFpYzEzbHFudjAweTF4d3gifQ.LZ9EPRD00uaR37knNinLTw&limit=1'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('there is an error', undefined)
        }else if (body.features.length === 0){
            callback('This does not exist',undefined)
        }else{
            callback(undefined,{
                lat : body.features[0].center[1],
                long:body.features[0].center[0],
                loc:body.features[0].place_name
            })
        }
    })
}


module.exports = geocode