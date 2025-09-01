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