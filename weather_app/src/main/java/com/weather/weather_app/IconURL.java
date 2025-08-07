package com.weather.weather_app;

import jakarta.persistence.*;

@Entity
@Table(name = "wmo_code_icons")
public class IconURL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rowid;

    private int code;// wmo-code
    private String url;

    public IconURL() {
    }

    public IconURL(int id, int code, String url) {
        this.rowid = id;
        this.code = code;
        this.url = url;
    }

    public int getRowid() {
        return rowid;
    }

    public int getCode() {
        return code;
    }

    public String getUrl() {
        return url;
    }

    public void setRowid(int id) {
        this.rowid = id;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}