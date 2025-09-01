import { Fragment } from "react";

export default function WeatherIcon(props) {

  console.log(props.url);
  return ((props.url != undefined) && (
    <Fragment key={`${props._key}`}>
      <img src={`/Images/${props.url}`} alt={`wmo code ${props.wmoCode}`} />
    </Fragment>
  ));
}
