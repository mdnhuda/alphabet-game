package com.mdnhuda.alphabetGame.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Alphabet {
    private int id;
    private String label;
    private ImageData image;
    private List<Word> words;
    private CursiveData cursive;
    private String audioUrl;
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

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }

    public CursiveData getCursive() {
        return cursive;
    }

    public void setCursive(CursiveData cursive) {
        this.cursive = cursive;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public String getAudioType() {
        return audioType;
    }

    public void setAudioType(String audioType) {
        this.audioType = audioType;
    }
}
