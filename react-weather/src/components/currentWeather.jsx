import CurrentWeatherDetails from "./currentWeatherDetails";
import CurrentWeatherHeader from "./currentWeatherHeader";
import { Fragment } from "react";

export default function CurrentWeather(props) {
    //const iconURL = props.urlPromise.then((value) => value);
    return (
        (
            <Fragment key='current'>
                <CurrentWeatherHeader city={props.city} currentWeather={props.currentWeather} urlPromise={props.urlPromise} />
                <CurrentWeatherDetails currentWeather={props.currentWeather} />
            </Fragment>
        )

    );
}