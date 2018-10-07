package com.mdnhuda.alphabetGame.controller;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.AlphabetType;
import com.mdnhuda.alphabetGame.service.AlphabetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/alphabets")
public class AlphabetController {
    
    @Autowired
    private AlphabetService alphabetService;

    @RequestMapping(value = {"/", ""}, method = RequestMethod.GET)
    public List<Alphabet> getKeyboard(@RequestParam AlphabetType type) {
        return alphabetService.getAlphabets(type);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Alphabet getAlphabet(@RequestParam AlphabetType type, @PathVariable("id") int id) {
        return alphabetService.getAlphabet(type, id);
    }
}
