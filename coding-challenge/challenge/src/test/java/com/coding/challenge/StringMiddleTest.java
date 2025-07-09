package com.coding.challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 * Test class for StringMiddle utility.
 * 
 * This class checks the functionality of the mid() method from the StringMiddle class.
 */
public class StringMiddleTest {

    @Test
    void testMid() {
        // "abc" → middle is 'b'
        assertEquals("b", StringMiddle.mid("abc"));

        // "aaaa" → even length, so expect ""
        assertEquals("", StringMiddle.mid("aaaa"));

        // "hello" → middle is 'l'
        assertEquals("l", StringMiddle.mid("hello"));

        // "xyz" → middle is 'y'
        assertEquals("y", StringMiddle.mid("xyz"));

        // "" → empty string, so expect ""
        assertEquals("", StringMiddle.mid(""));

        // "a" → only one character, middle is 'a'
        assertEquals("a", StringMiddle.mid("a"));
    }
}
