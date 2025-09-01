import { useEffect, useState } from 'react'

/*
 * Custom Hook to fetch the DWD weather data for specific coordinates from open-meteo.com. 
 *
 * @param an object with latitude, longitude and the loading state of the coordinates, as returned by useCoordinates
 * @return an object with the weather data and the loading state of said data as boolean. The weather data contains the wmo code, temperature, wind speed and relative humidity for the current weather and thewmo code and temperature for the 5-day forecast
 */
export default function useWeatherData({ latitude, longitude, loadingC }) {
    const [weatherData, setWeatherData] = useState(null);
    const [loadingW, setLoadingW] = useState(true);

    useEffect(() => {
        const fetchWeatherData = async (cityLatitude, cityLongitude) => {
            try {
                console.log("fetching weather data from open-meteo.com");
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLatitude}&longitude=${cityLongitude}&daily=weather_code,temperature_2m_max&models=icon_seamless&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&timezone=auto&forecast_days=5&timeformat=unixtime`;
                const response = await fetch(url);
                const data = response.json();
                data.then((value) => {
                    setWeatherData(value);
                    setLoadingW(false);
                });
            }
            catch (error) {
                console.log(error);
            }
        }

        if (!loadingC) {
            fetchWeatherData(latitude, longitude);
        }
    }, [loadingC]);

    return { weatherData, loadingW };
}