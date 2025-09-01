import { useEffect, useState } from 'react'

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
                //setWeatherData(data);
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