package com.mdnhuda.alphabetGame.domain;

import java.util.List;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
public class KeyboardEntry {
    private int id;
    private String label;

    public KeyboardEntry(int id, String label) {
        this.id = id;
        this.label = label;
    }

    public int getId() {
        return id;
    }

    public String getLabel() {
        return label;
    }
}
