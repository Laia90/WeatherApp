package com.weather.weather_app;

import org.springframework.data.repository.CrudRepository;

public interface IconURLRepository extends CrudRepository<IconURL, Integer> {
    IconURL findByCode(int code);
}
