import WeatherIcon from "./weatherIcon";
import { Fragment } from "react";

export default function ForecastDay(props) {
    console.log("day ", props.index);
    return (
        <Fragment key={`day${props.index}`} >
            <div key={props.index}>
                <p className='forecast-day'>
                    {new Date(props.weatherForecast.time[props.index] * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                    })}
                </p>
                <p className='forecast-condition'>
                    <WeatherIcon _key={`forecastImg${props.index}`} wmoCode={props.weatherForecast.weather_code[props.index]} url={props.url} />
                </p>
                <p className='forecast-temp'>{props.weatherForecast.temperature_2m_max[props.index]}&deg;C</p>
            </div>
        </Fragment>
    );
}