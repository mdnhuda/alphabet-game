package com.mdnhuda.alphabetGame.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.KeyboardEntry;
import com.mdnhuda.alphabetGame.domain.Language;
import com.mdnhuda.alphabetGame.service.AlphabetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/alphabet")
public class AlphabetController {
    
    @Autowired
    private AlphabetService alphabetService;

    @RequestMapping(value = "/next", method = RequestMethod.GET)
    public Alphabet getNextAlphabet(@RequestParam Language language) {
        return alphabetService.getNext(language);
    }

    @RequestMapping(value = "/keyboard", method = RequestMethod.GET)
    public List<KeyboardEntry> getKeyboard(@RequestParam Language language) {
        return alphabetService.getKeyboard(language);
    }
}
