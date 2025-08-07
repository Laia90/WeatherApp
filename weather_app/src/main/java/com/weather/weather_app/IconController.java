package com.weather.weather_app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IconController {
    private IconURLRepository urlRepository;

    @Autowired
    public IconController(final IconURLRepository repo) {
        this.urlRepository = repo;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(path = "/icon/{code}", produces = "application/json; charset=UTF-8")
    public String getURLByWMOCode(@PathVariable int code) {
        IconURL url = urlRepository.findByCode(code);// handle error here
        return url.getUrl();
    }
}
