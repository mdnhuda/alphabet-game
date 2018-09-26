package com.mdnhuda.alphabetGame.domain;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
public class Alphabet {
    private int id;
    private String label;
    private String image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
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
