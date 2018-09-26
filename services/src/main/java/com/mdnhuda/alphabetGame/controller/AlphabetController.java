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

    @RequestMapping(value = "/alphabet", method = RequestMethod.GET)
    public Alphabet getAlphabet(@RequestParam AlphabetType type, @RequestParam int id) {
        return alphabetService.getAlphabet(type, id);
    }

    @RequestMapping(value = "/keyboard", method = RequestMethod.GET)
    public List<KeyboardEntry> getKeyboard(@RequestParam AlphabetType type) {
        return alphabetService.getKeyboard(type);
    }
}
