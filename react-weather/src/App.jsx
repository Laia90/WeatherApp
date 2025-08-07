import { Fragment, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Hamburg");
  const [latitude, setLatitude] = useState(53.55);
  const [longitude, setLongitude] = useState(10);
  const [currentIconURL, setCurrentIconURL] = useState("./src/assets/01d@2x.png");
  const [forecastIconURLs, setForecastIconURLs] = useState([]);

  //Fetch the coordinates of the chosen city
  useEffect(() => {
    const fetchCityCoordinates = async (cityName) => {
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=de&format=json`;
        const response = await fetch(url);
        const coordinates = await response.json();
        setLatitude(coordinates.results[0].latitude);
        setLongitude(coordinates.results[0].longitude);
        console.log("Latitude: ", coordinates.results[0].latitude);
        console.log("Longitude: ", coordinates.results[0].longitude);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchCityCoordinates(city);
  }, [city]);

  //Fetch the weather data 
  useEffect(() => {
    const fetchWeatherData = async (cityLatitude, cityLongitude) => {
      try { //weather code interpretation aus DB
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLatitude}&longitude=${cityLongitude}&daily=weather_code,temperature_2m_max&models=icon_seamless&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&timezone=auto&forecast_days=5&timeformat=unixtime`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        console.log(data);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchWeatherData(latitude, longitude);
  }, [latitude, longitude])

  useEffect(() => {
    console.log("icon fetching");
    const fetchIcon = async (wmoCode) => {
      try {
        console.log(`fetching icon ${wmoCode}`);
        const url = `http://localhost:8080/icon/${wmoCode}`;
        const response = await fetch(url);
        const iconURL = await response.text();

        console.log(iconURL);
        return iconURL;
      }
      catch (error) {
        console.log(error);
        return null;
      }
    }
    const fetchForecastIcons = async (wmoCodes) => {
      try {
        let urls = [];
        wmoCodes.forEach(async (code) => {
          urls.push(await fetchIcon(code));
        })

        console.log(urls);
        setForecastIconURLs(urls);
      }
      catch (error) {
        console.log(error);
      }
    }

    if (weatherData && weatherData.current.weather_code) {
      let icon = fetchIcon(weatherData.current.weather_code);
      setCurrentIconURL(icon);
    }
    if (weatherData && weatherData.daily.weather_code) {
      fetchForecastIcons(weatherData.daily.weather_code);
    }
  }, [weatherData]);

  return (
    <div className='wrapper'>
      {weatherData && weatherData.current && (
        <Fragment key='current'>
          <div className='header'>
            <h1 className='city'>{city}</h1>
            <p className='temperature'>{weatherData.current.temperature_2m}&deg;C</p>
            <p className='condition'>
              {currentIconURL && (

                <Fragment key='currentImg'>
                  <img src={currentIconURL} alt={`wmo code ${weatherData.current.weather_code}`}></img>
                </Fragment>//change to local images?
              )}
            </p>
          </div>
          <div className='weather-details'>
            <div>
              <p>Humidity</p>
              <p> {weatherData.current.relative_humidity_2m}%</p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p>{weatherData.current.wind_speed_10m} km/h</p>
            </div>
          </div>
        </Fragment>
      )}
      {weatherData && weatherData.daily && weatherData.daily.time.length > 0 && (
        <Fragment key='forecast'>
          <div className='forecast'>
            <h2 className='forecast-header'>5-Day Forecast</h2>
            <div className='forecast-days'>
              {weatherData.daily.time.map((time, index) => (
                <Fragment key={`day${index}`} >
                  <div key={index}>
                    <p className='forecast-day'>
                      {new Date(time * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                    </p>
                    <p className='forecast-condition'>{weatherData.daily.weather_code[index]}</p>
                    <p className='forecast-temp'>{weatherData.daily.temperature_2m_max[index]}&deg;C</p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </Fragment>
      )
      }
    </div >
  );
}

export default App
