package com.mdnhuda.alphabetGame.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Alphabet {
    private int id;
    private String label;
    private ImageData image;
    private CursiveData cursive;
    private String audio;
    private String audioType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public ImageData getImage() {
        return image;
    }

    public void setImage(ImageData image) {
        this.image = image;
    }

    public CursiveData getCursive() {
        return cursive;
    }

    public void setCursive(CursiveData cursive) {
        this.cursive = cursive;
    }

    public String getAudio() {
        return audio;
    }

    public void setAudio(String audio) {
        this.audio = audio;
    }

    public String getAudioType() {
        return audioType;
    }

    public void setAudioType(String audioType) {
        this.audioType = audioType;
    }
}
