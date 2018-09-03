package com.mdnhuda.alphabetGame.service;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import com.mdnhuda.alphabetGame.domain.Language;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@Service
public class AlphabetService {
    public Alphabet getNext(Language language) {
        return new Alphabet.AlphabetBuilder()
                .label("B")
                .value("b")
                .image("http://pngimg.com/uploads/football/football_PNG52781.png")
                .cursive("https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/B_cursiva.gif/400px-B_cursiva.gif")
                .audio("https://upload.wikimedia.org/wikipedia/commons/2/2c/Voiced_bilabial_plosive.ogg")
                .audioType("audio/ogg")
                .build();
    }

    public List<KeyboardEntry> getKeyboard(Language language) {
        return Arrays.asList(new KeyboardEntry("a", "A"),
                new KeyboardEntry("b", "B"),
                new KeyboardEntry("c", "C"));
    }
}
