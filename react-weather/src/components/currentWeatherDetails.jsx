/*
 * Component showing the details of the current weather, humidity and wind speed.  
 *
 * @param {object} props
 * @property city - a String representing the city to show the weather for          
 * @property currentWeather - an object with the current weather data as fetched by useWeatherData
 * @property urlPromise - a String for the url of the weather condition image, once the api call is resolved
 */

export default function CurrentWeatherDetails(props) {
    return (
        <div className='weather-details'>
            <div>
                <p>Humidity</p>
                <p> {props.currentWeather.relative_humidity_2m}%</p>
            </div>
            <div>
                <p>Wind Speed</p>
                <p>{props.currentWeather.wind_speed_10m} km/h</p>
            </div>
        </div>
    );
}