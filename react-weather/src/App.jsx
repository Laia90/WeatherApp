import { Fragment, useEffect, useRef, useState } from 'react'
import './App.css'
import CurrentWeather from './components/currentWeather';
import FiveDayForecast from './components/fiveDayForecast';
import useCoordinates from './hooks/useCoordinates';
import useWeatherData from './hooks/useWeatherData';
import useIcons from './hooks/useIcons';

function App() {
  const [city, setCity] = useState("Hamburg");
  const coordinates = useCoordinates(city);
  const weatherData = useWeatherData(coordinates);
  const { current, forecast, currentLoaded, forecastLoaded } = useIcons(weatherData);

  /*  useEffect(() => { console.log(`icon ${forecastLoaded.length} loaded`) }, [forecastLoaded]);
   console.log(forecast); */

  return (
    <div className='wrapper'>
      {currentLoaded &&
        <CurrentWeather city={city} currentWeather={weatherData.weatherData.current} urlPromise={current} />
      }
      {!weatherData.loadingW &&
        <FiveDayForecast weatherForecast={weatherData.weatherData.daily} urlPromises={forecast} forecastLoaded={forecastLoaded} />

      }
    </div >
  );
}

export default App
