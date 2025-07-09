package com.coding.challenge;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for {@link SyllableCounter}.
 *
 * Tests the method {@link SyllableCounter#count(String)}
 * with various input scenarios.
 *
 * Author: Mohan raj S
 * Date: 08-07-2025
 */
public class SyllableCounterTest {

    /**
     * Tests different valid and edge case inputs for count().
     */
    @Test
    void testSyllableCount() {
        // Normal cases
        assertEquals(2, SyllableCounter.count("ho-tel"), 
            "Expected 2 syllables in 'ho-tel'");
        assertEquals(1, SyllableCounter.count("cat"), 
            "Expected 1 syllable in 'cat'");
        assertEquals(3, SyllableCounter.count("met-a-phor"), 
            "Expected 3 syllables in 'met-a-phor'");
        assertEquals(4, SyllableCounter.count("ter-min-a-tor"), 
            "Expected 4 syllables in 'ter-min-a-tor'");

        // Edge cases
        assertEquals(0, SyllableCounter.count(""), 
            "Empty string should return 0");
        assertEquals(0, SyllableCounter.count(null), 
            "Null input should return 0");
    }
}
