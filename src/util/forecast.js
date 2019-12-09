const request = require('request')

const forecast = (long , lat, callback)=> {
    const url = 'https://api.darksky.net/forecast/cea1a0170dc1e36773795098540ef1e7/'+long+','+lat

    request({url,json:true},(error, {body})=>{
        if(!error && !body.error){
            //console.log(response.body.currently)
            callback(undefined, body.daily.data[0].summary+" It is currently "+ body.currently.temperature +"  degrees out.There is a "+ body.currently.precipProbability+"% chance of rain")
        }else if(response.body.error){
            callback('unable to find location',undefined)
        }else{
            callback('there is error',undefined)
        }
    })
}

module.exports = forecast