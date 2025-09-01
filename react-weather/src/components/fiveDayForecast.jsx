import ForecastDay from "./forecastDay";
import { Fragment, useEffect, useState } from "react";

export default function FiveDayForecast(props) {

    console.log(props.forecastLoaded);
    console.log(props.urlPromises);

    return (props.weatherForecast && props.weatherForecast.time.length > 0 && (
        <Fragment key='forecast'>
            <div className='forecast'>
                <h2 className='forecast-header'>5-Day Forecast</h2>
                <div className='forecast-days' >
                    {props.forecastLoaded > 0 && props.weatherForecast.time.map((time, index) => (props.forecastLoaded >= index &&
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
