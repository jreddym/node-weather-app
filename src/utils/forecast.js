const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e509ba5cda01b1731f1e7fd921721f4e&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weatherstack server !', undefined);
    } else if (body.error) {
      callback('Unable to find location !', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}, The current temperature is ${body.current.temperature} degrees out and it feels like ${body.current.feelslike} degrees out and the Humidity is ${body.current.humidity}`
      );
    }
  });
};

module.exports = forecast;
