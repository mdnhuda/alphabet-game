package com.mdnhuda.alphabetGame.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.AlphabetType;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

/**
 * @author mdnhuda@gmail.com
 * @since 3/09/2018
 */
@Service
public class AlphabetService {
    private static final Logger log = LoggerFactory.getLogger(AlphabetService.class);
    private static final ObjectMapper MAPPER = new ObjectMapper();

    static {
        MAPPER.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
    }

    private Map<AlphabetType, List<Alphabet>> alphabetMap;
    private Map<AlphabetType, List<KeyboardEntry>> keyboardMap;

    @Autowired
    public AlphabetService(ApplicationContext context) throws IOException {
        Map<AlphabetType, List<Alphabet>> map = new HashMap<>();
        TypeReference<List<Alphabet>> alphabetListType = new TypeReference<List<Alphabet>>() {
        };

        map.put(AlphabetType.EN_UPPER,
                MAPPER.readValue(context.getResource("classpath:english_upper.json").getInputStream(), alphabetListType));

        map.put(AlphabetType.BN, MAPPER.readValue(context.getResource("classpath:bangla.json").getInputStream(), alphabetListType));

        this.alphabetMap = map;

        Map<AlphabetType, List<KeyboardEntry>> keyboardMap = new HashMap<>();
        this.alphabetMap.forEach((type, list) -> {
            keyboardMap.put(type,
                    list.stream().map(alphabet -> new KeyboardEntry(alphabet.getId(), alphabet.getLabel()))
                            .collect(Collectors.toList()));
        });
        this.keyboardMap = keyboardMap;
    }

    public Alphabet getAlphabet(AlphabetType alphabetType, int id) {
        return alphabetMap.get(alphabetType).stream().filter(alphabet -> alphabet.getId() == id).findFirst().orElse(null);
    }

    public List<KeyboardEntry> getKeyboard(AlphabetType alphabetType) {
        return keyboardMap.get(alphabetType);
    }
}
