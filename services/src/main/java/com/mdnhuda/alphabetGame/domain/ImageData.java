package com.mdnhuda.alphabetGame.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by naimulhuda on 26/09/2018.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageData {
    private String description;
    private String url;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
