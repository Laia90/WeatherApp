import ForecastDay from "./forecastDay";
import { Fragment, useEffect, useState } from "react";

/*
 * Component showing the 5-day weather forecast according to DWD. 
 *
 * @param {object} props         
 * @property weatherForecast - an object with the 5-day weather forecast data as fetched by useWeatherData
 * @property urlPromises - an array of Strings for the urls of the weather condition images, once the respective api calls are resolved
 * @property forecastLoaded - an array containing a boolean of 'true' for each image url that is fetched 
 */
export default function FiveDayForecast(props) {
    return (props.weatherForecast && props.weatherForecast.time.length > 0 && (
        <Fragment key='forecast'>
            <div className='forecast'>
                <h2 className='forecast-header'>5-Day Forecast</h2>
                <div className='forecast-days' >
                    {props.forecastLoaded && props.weatherForecast.time.map((time, index) => (
                        <Fragment key={`forecast-day${index}`}>
                            <ForecastDay index={index} weatherForecast={props.weatherForecast} url={props.urlPromises[index]} iconLoaded={props.forecastLoaded[index]} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </Fragment>
    )
    );
}
