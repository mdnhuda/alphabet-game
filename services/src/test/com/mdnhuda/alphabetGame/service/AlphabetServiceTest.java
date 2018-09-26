package com.mdnhuda.alphabetGame.service;

import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.AlphabetType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import static org.junit.Assert.assertEquals;

/**
 * Created by naimulhuda on 26/09/2018.
 */
public class AlphabetServiceTest {
    private AlphabetService service;

    @Before
    public void setUp() throws Exception {
        service = new AlphabetService();
    }

    @Test
    public void testGetAlphabet() {
        Alphabet alphabet = service.getAlphabet(AlphabetType.EN_UPPER, 1);
        assertEquals("A", alphabet.getLabel());
    }
}