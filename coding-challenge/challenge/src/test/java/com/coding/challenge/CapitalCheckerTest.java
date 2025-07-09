package com.coding.challenge;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for the CapitalChecker class.
 * 
 * This test class verifies the correct identification of capital letter indexes
 * in a given input string using the capitalIndexes() method.
 * 
 * Author: Mohan Raj S
 * Date: 08-07-2025
 */
public class CapitalCheckerTest {

    /**
     * Test various input strings for correct index identification of capital letters.
     */
    @Test
    void testCapitalIndexes() {
        // Test with mixed-case input: Capital letters at index 0, 2, 4
        assertEquals(List.of(0, 2, 4), CapitalChecker.capitalIndexes("HeLlO"));

        // Test with no capital letters
        assertEquals(List.of(), CapitalChecker.capitalIndexes("hello"));

        // Test with all capital letters
        assertEquals(List.of(0, 1, 2, 3), CapitalChecker.capitalIndexes("JAVA"));

        // Test with alternating lowercase and uppercase letters
        assertEquals(List.of(1, 3, 5), CapitalChecker.capitalIndexes("aBcDeF"));

        // Test with an empty string
        assertEquals(List.of(), CapitalChecker.capitalIndexes(""));

        // Test with one capital letter in the middle
        assertEquals(List.of(2), CapitalChecker.capitalIndexes("abCdef"));

        // Test with capital letter only at the start
        assertEquals(List.of(0), CapitalChecker.capitalIndexes("Zebra"));
    }
}
