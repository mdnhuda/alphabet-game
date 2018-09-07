package com.mdnhuda.alphabetGame.service;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import com.mdnhuda.alphabetGame.domain.Language;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@Service
public class AlphabetService {
    private static final List<Alphabet> alphabets = Arrays.asList(

            new Alphabet.AlphabetBuilder()
                    .label("A")
                    .value("a")
                    .image("http://usapple.org/wp-content/uploads/2016/02/apple-honeycrisp-337x335.png")
                    .cursive("https://upload.wikimedia.org/wikipedia/commons/c/c7/A_cursiva.gif")
                    .build(),
            new Alphabet.AlphabetBuilder()
                    .label("B")
                    .value("b")
                    .image("http://pngimg.com/uploads/football/football_PNG52781.png")
                    .cursive("https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/B_cursiva.gif/400px-B_cursiva.gif")
                    .audio("https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg")
                    .audioType("audio/ogg")
                    .build(),
            new Alphabet.AlphabetBuilder()
                    .label("C")
                    .value("c")
                    .image("http://pngimg.com/uploads/alfa_romeo/alfa_romeo_PNG47.png")
                    .cursive("https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/C_cursiva.gif/400px-C_cursiva.gif")
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
