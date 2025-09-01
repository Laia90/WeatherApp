import { useEffect, useState } from 'react'

/*
 * Custom Hook to fetch coordinates for a city from open-meteo.com.
 *
 * @return an object with latitude, longitude and the loading state of the coordinates
 */
export default function useCoordinates(cityName) {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [loadingC, setLoadingC] = useState(true);

    useEffect(() => {
        const fetchCityCoordinates = async (cityName) => {
            try {
                console.log("fetching city coordinates");
                const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=de&format=json`;
                const response = await fetch(url);
                const coordinates = response.json();
                coordinates.then((value) => {
                    setLatitude(value.results[0].latitude);
                    setLongitude(value.results[0].longitude);
                    setLoadingC(false);
                });
            }
            catch (error) {
                console.log(error);
            }
        };

        if (cityName != null && cityName != '') fetchCityCoordinates(cityName);

    }, [cityName]);

    return { latitude, longitude, loadingC };
}