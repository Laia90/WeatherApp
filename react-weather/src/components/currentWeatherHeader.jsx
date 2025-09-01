import WeatherIcon from "./weatherIcon";

/*
 * Component showing a quick overview of the current weather according to DWD, temperature and weather condition based on wmo codes (as an image). 
 *
 * @param {object} props
 * @property city - a String representing the city to show the weather for          
 * @property currentWeather - an object with the current weather data as fetched by useWeatherData
 * @property urlPromise - a String for the url of the weather condition image, once the api call is resolved
 */
export default function CurrentWeatherHeader(props) {
    return (
        <div className='header'>
            <h1 className='city'>{props.city}</h1>
            <p className='temperature'>{props.currentWeather.temperature_2m}&deg;C</p>
            <p className='condition'>
                <WeatherIcon _key="currentIcon" wmoCode={props.currentWeather.weather_code} url={props.urlPromise} />
            </p>
        </div>
    );
}