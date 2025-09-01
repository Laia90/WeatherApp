import { Fragment } from "react";

/*
 * Component showing the icon of the weather condition for a specific wmo-code. 
 *
 * @param {object} props   
 * @_key the key for the HTML fragment     
 * @property wmoCode - the wmo code for the weather condition
 * @property url - a String with the url of the weather condition image, once the api call is resolved
 * @property iconLoaded - contains 'true' if the image url has been fetched 
 */
export default function WeatherIcon(props) {
  console.log(props.url);
  return ((props.url != undefined) && (
    <Fragment key={`${props._key}`}>
      <img src={`/Images/${props.url}`} alt={`wmo code ${props.wmoCode}`} />
    </Fragment>
  ));
}
