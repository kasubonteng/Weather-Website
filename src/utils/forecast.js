const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=b1480b65b77b4cf0af4152459200609&q=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Could not reach weather service API', undefined)
        } else if (body.error) {
            callback('Could not find location. Please input different search results', undefined)
        } else {
            callback(undefined, `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. There is ${body.forecast.forecastday[0].day.daily_chance_of_rain}% chance of rain`)
        }
    })
}

module.exports = forecast