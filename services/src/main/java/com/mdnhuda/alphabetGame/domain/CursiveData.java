package com.mdnhuda.alphabetGame.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CursiveData {
    private int height;
    private int width;
    private List<Point> points;

    @JsonCreator
    public CursiveData(@JsonProperty("height") int height,
                       @JsonProperty("height") int width,
                       @JsonProperty("points") List<Point> points) {
        this.height = height;
        this.width = width;
        this.points = points;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }

    public List<Point> getPoints() {
        return points;
    }
}
