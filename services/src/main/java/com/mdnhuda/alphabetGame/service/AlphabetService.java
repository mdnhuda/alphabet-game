package com.mdnhuda.alphabetGame.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mdnhuda.alphabetGame.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

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

    public AlphabetService() throws IOException {
        Map<AlphabetType, List<Alphabet>> map = new HashMap<>();
        TypeReference<List<Alphabet>> alphabetListType = new TypeReference<List<Alphabet>>() {
        };

        map.put(AlphabetType.EN_UPPER, MAPPER.readValue(ResourceUtils.getFile("classpath:english_upper.json"), alphabetListType));

        map.put(AlphabetType.BN, MAPPER.readValue(ResourceUtils.getFile("classpath:bangla.json"), alphabetListType));

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
        return alphabetMap.get(alphabetType).stream().filter(alphabet -> alphabet.getId() == id).findFirst().get();
    }

    public List<KeyboardEntry> getKeyboard(AlphabetType alphabetType) {
        return keyboardMap.get(alphabetType);
    }
}
