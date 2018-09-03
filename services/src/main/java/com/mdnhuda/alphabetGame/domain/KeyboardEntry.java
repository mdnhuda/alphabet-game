package com.mdnhuda.alphabetGame.domain;

import java.util.List;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
public class KeyboardEntry {
    private String value;
    private String label;

    public KeyboardEntry(String value, String label) {
        this.value = value;
        this.label = label;
    }

    public String getValue() {
        return value;
    }

    public String getLabel() {
        return label;
    }
}
