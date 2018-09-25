package com.mdnhuda.alphabetGame.controller;

import java.util.List;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import com.mdnhuda.alphabetGame.domain.AlphabetType;
import com.mdnhuda.alphabetGame.service.AlphabetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/alphabet")
public class AlphabetController {
    
    @Autowired
    private AlphabetService alphabetService;

    @RequestMapping(value = "/next", method = RequestMethod.GET)
    public Alphabet getNextAlphabet(@RequestParam AlphabetType alphabetType) {
        return alphabetService.getNext(alphabetType);
    }

    @RequestMapping(value = "/keyboard", method = RequestMethod.GET)
    public List<KeyboardEntry> getKeyboard(@RequestParam AlphabetType alphabetType) {
        return alphabetService.getKeyboard(alphabetType);
    }
}
