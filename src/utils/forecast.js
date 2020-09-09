const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c293e3b4d9df84e23a80ae2239d32667&query=${longitude},${latitude}&units=m`

    request({url, json:true}, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to the Api server', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another coordonate', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ` there is ${body.current.temperature} degrees and ${body.current.precip}% of rainy`)
        }
    })
    
}

module.exports = forecast