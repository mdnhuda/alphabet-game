package com.mdnhuda.alphabetGame.domain;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
public class Alphabet {
    private int id;
    private String label;
    private String value;
    private String image;
    private CursiveData cursive;
    private String audio;
    private String audioType;

    private Alphabet() {
    }

    public String getLabel() {
        return label;
    }

    public String getValue() {
        return value;
    }

    public String getImage() {
        return image;
    }

    private CursiveData getCursive() {
        return cursive;
    }

    public String getAudio() {
        return audio;
    }

    public String getAudioType() {
        return audioType;
    }

    public static final class AlphabetBuilder {
        private Alphabet alphabet = new Alphabet();

        public AlphabetBuilder label(String label) {
            alphabet.label = label;
            return this;
        }

        public AlphabetBuilder value(String value) {
            alphabet.value = value;
            return this;
        }

        public AlphabetBuilder image(String image) {
            alphabet.image = image;
            return this;
        }

        public AlphabetBuilder cursive(CursiveData cursive) {
            alphabet.cursive = cursive;
            return this;
        }

        public AlphabetBuilder audio(String audio) {
            alphabet.audio = audio;
            return this;
        }

        public AlphabetBuilder audioType(String audioType) {
            alphabet.audioType = audioType;
            return this;
        }

        public Alphabet build() {
            return alphabet;
        }
    }
}
