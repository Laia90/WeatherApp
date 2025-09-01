import { useEffect, useState } from 'react'

export default function useIcons({ weatherData, loadingW }) {
    const [current, setCurrent] = useState('/01d@2x.png');
    const [forecast, setForecast] = useState([]);
    const [currentLoaded, setCurrentLoaded] = useState(false);
    //const [forecastLoaded, setForecastLoaded] = useState(false);
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

                //setForecastLoaded(true);
                console.log(`forecast loaded: ${forecastLoaded}`);
            });
            //console.log(iconURLs);
        }
    }, [loadingW]);

    return { current, forecast, currentLoaded, forecastLoaded };
}