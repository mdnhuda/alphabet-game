package com.mdnhuda.alphabetGame.service;

import com.mdnhuda.alphabetGame.WebMvcConfig;
import com.mdnhuda.alphabetGame.domain.Alphabet;
import com.mdnhuda.alphabetGame.domain.AlphabetType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertEquals;

/**
 * Created by naimulhuda on 26/09/2018.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextHierarchy(@ContextConfiguration(classes = WebMvcConfig.class))
public class AlphabetServiceTest {
    private AlphabetService service;

    @Autowired
    private ApplicationContext context;

    @Before
    public void setUp() throws Exception {
        service = new AlphabetService(context);
    }

    @Test
    public void testGetAlphabet() {
        Alphabet alphabet = service.getAlphabet(AlphabetType.EN_UPPER, 1);
        assertEquals("A", alphabet.getLabel());
    }
}