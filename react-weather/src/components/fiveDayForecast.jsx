import ForecastDay from "./forecastDay";
import { Fragment, useEffect, useState } from "react";

export default function FiveDayForecast(props) {

    /* useEffect(() => {
        console.log(props.forecastLoaded);
        console.log(props.urlPromises);
    }, [props.forecastLoaded]); */

    return (props.weatherForecast && props.weatherForecast.time.length > 0 && (
        <Fragment key='forecast'>
            <div className='forecast'>
                <h2 className='forecast-header'>5-Day Forecast</h2>
                <div className='forecast-days' >
                    {props.forecastLoaded && props.weatherForecast.time.map((time, index) => (
                        <Fragment key={`forecast-day${index}`}>
                            <ForecastDay index={index} weatherForecast={props.weatherForecast} url={props.urlPromises[index]} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </Fragment>
    )

    );
}
