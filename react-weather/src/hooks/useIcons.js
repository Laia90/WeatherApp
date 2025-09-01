import { useEffect, useState } from 'react'

/*
 * Custom Hook to fetch the icon urls for specific weather data.
 *
 * @param the weather data as fetched by useWeatherData
 * @return an object with the url for the current weather as String, an array of String urls for the 5-day forecast, a boolean for the loading state of the former and an array containing 'true' for each url fetched for the forecast.
 */
export default function useIcons({ weatherData, loadingW }) {
    const [current, setCurrent] = useState('/01d@2x.png');
    const [forecast, setForecast] = useState([]);
    const [currentLoaded, setCurrentLoaded] = useState(false);
    const [forecastLoaded, setForecastLoaded] = useState([]);

    useEffect(() => {
        const fetchIcon = async (wmoCode, array, index) => {
            try {
                console.log(`fetching icon ${wmoCode}`);
                const url = `http://localhost:8080/icon/${wmoCode}`;
                const response = await fetch(url);
                const iconURL = response.text();

                if (array != undefined) {
                    console.log("adding promise");
                    iconURL.then((value) => {
                        console.log("resolving promise");
                        array.push(value);
                        let newForecastLoaded = [...forecastLoaded, true];
                        setForecastLoaded(newForecastLoaded);
                    })
                }
                else {
                    iconURL.then((value) => {
                        setCurrent(value);
                        setCurrentLoaded(true);
                    })
                }
            }
            catch (error) {
                console.log(error);
                return null;
            }
        }
        const fetchForecastIcons = async (wmoCodes) => {
            try {
                let urls = [];
                wmoCodes.forEach(async (code) => {
                    await fetchIcon(code, urls);
                })
                setForecast(urls);
            }
            catch (error) {
                console.log(error);
            }
        }

        if (!loadingW && weatherData && weatherData.current && weatherData.current.weather_code) {
            fetchIcon(weatherData.current.weather_code);
        }
        if (!loadingW && weatherData && weatherData.daily && weatherData.daily.weather_code) {
            fetchForecastIcons(weatherData.daily.weather_code);

            const iconURLs = [];
            Promise.all(forecast).then((values) => {
                iconURLs.push(values);
                console.log(iconURLs);
                console.log(`forecast loaded: ${forecastLoaded}`);
            });
        }
    }, [loadingW]);

    return { current, forecast, currentLoaded, forecastLoaded };
}