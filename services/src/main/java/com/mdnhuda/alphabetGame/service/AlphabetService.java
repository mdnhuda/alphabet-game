package com.mdnhuda.alphabetGame.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import com.mdnhuda.alphabetGame.domain.Language;
import com.mdnhuda.alphabetGame.domain.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@Service
public class AlphabetService {
    private static final Logger       log    = LoggerFactory.getLogger(AlphabetService.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();
    static {
        MAPPER.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
    }

    private static List<List<Point>> convertCursive(String val) {
        try {
            return MAPPER.readValue(val, new TypeReference<List<List<Point>>>(){});
        }
        catch (IOException e) {
            log.error("conversion error", e);
            return null;
        }
    }

    private static final List<Alphabet> alphabets = Arrays.asList(

            new Alphabet.AlphabetBuilder()
                    .label("A")
                    .value("a")
                    .image("http://usapple.org/wp-content/uploads/2016/02/apple-honeycrisp-337x335.png")
                    .cursive(convertCursive("[[{\"x\":90,\"y\":339},{\"x\":200,\"y\":53}],[{\"x\":201,\"y\":53},{\"x\":311,\"y\":338}],[{\"x\":130,\"y\":233},{\"x\":271,\"y\":232}]]"))
                    .build(),
            new Alphabet.AlphabetBuilder()
                    .label("B")
                    .value("b")
                    .image("http://pngimg.com/uploads/football/football_PNG52781.png")
                    .cursive(convertCursive("[[{\"x\":101,\"y\":53},{\"x\":99,\"y\":337}],[{\"x\":102,\"y\":54},{\"x\":221,\"y\":55},{\"x\":273,\"y\":74},{\"x\":295,\"y\":106},{\"x\":297,\"y\":139},{\"x\":274,\"y\":175},{\"x\":210,\"y\":192},{\"x\":102,\"y\":192}],[{\"x\":103,\"y\":193},{\"x\":211,\"y\":197},{\"x\":276,\"y\":197},{\"x\":308,\"y\":231},{\"x\":310,\"y\":272},{\"x\":294,\"y\":310},{\"x\":257,\"y\":330},{\"x\":191,\"y\":339},{\"x\":100,\"y\":337}]]"))
                    .audio("https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg")
                    .audioType("audio/ogg")
                    .build(),
            new Alphabet.AlphabetBuilder()
                    .label("C")
                    .value("c")
                    .image("http://pngimg.com/uploads/alfa_romeo/alfa_romeo_PNG47.png")
                    .cursive(convertCursive("[[{\"x\":282,\"y\":107},{\"x\":279,\"y\":129},{\"x\":301,\"y\":137},{\"x\":318,\"y\":115},{\"x\":299,\"y\":85},{\"x\":265,\"y\":60},{\"x\":217,\"y\":49},{\"x\":149,\"y\":63},{\"x\":107,\"y\":99},{\"x\":78,\"y\":183},{\"x\":90,\"y\":266},{\"x\":131,\"y\":320},{\"x\":198,\"y\":341},{\"x\":285,\"y\":317},{\"x\":320,\"y\":272}]]"))
                    .build()
    );

    public Alphabet getNext(Language language) {
        return alphabets.get(new Random().nextInt(3));
    }

    public List<KeyboardEntry> getKeyboard(Language language) {
        return Arrays.asList(new KeyboardEntry("a", "A"),
                new KeyboardEntry("b", "B"),
                new KeyboardEntry("c", "C"));
    }
}
