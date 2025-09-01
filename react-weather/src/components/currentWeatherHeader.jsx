import WeatherIcon from "./weatherIcon";

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