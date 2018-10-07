package com.mdnhuda.alphabetGame.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by naimulhuda on 3/10/2018.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Word {
    private String text;
    private String audioUrl;
    private int highlight;
    private String imageUrl;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public int getHighlight() {
        return highlight;
    }

    public void setHighlight(int highlight) {
        this.highlight = highlight;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
