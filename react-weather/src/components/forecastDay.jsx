import WeatherIcon from "./weatherIcon";
import { Fragment } from "react";

/*
 * Component showing the 5-day weather forecast according to DWD for a specific day. 
 *
 * @param {object} props   
 * @index the index of the day to be shown     
 * @property weatherForecast - an object with the 5-day weather forecast data as fetched by useWeatherData
 * @property url - a String with the url of the weather condition image, once the api call is resolved
 * @property iconLoaded - contains 'true' if the image url has been fetched 
 */
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
                    <WeatherIcon _key={`forecastImg${props.index}`} wmoCode={props.weatherForecast.weather_code[props.index]} url={props.url} iconLoaded={props.iconLoaded} />
                </p>
                <p className='forecast-temp'>{props.weatherForecast.temperature_2m_max[props.index]}&deg;C</p>
            </div>
        </Fragment>
    );
}