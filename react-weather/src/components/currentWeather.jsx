import CurrentWeatherDetails from "./currentWeatherDetails";
import CurrentWeatherHeader from "./currentWeatherHeader";
import { Fragment } from "react";

/*
 * Component showing the current weather according to DWD. 
 *
 * @param {object} props
 * @property city - a String representing the city to show the weather for          
 * @property currentWeather - an object with the current weather data as fetched by useWeatherData
 * @property urlPromise - a String for the url of the weather condition image, once the api call is resolved
 */
export default function CurrentWeather(props) {
    return (
        (
            <Fragment key='current'>
                <CurrentWeatherHeader city={props.city} currentWeather={props.currentWeather} urlPromise={props.urlPromise} />
                <CurrentWeatherDetails currentWeather={props.currentWeather} />
            </Fragment>
        )

    );
}