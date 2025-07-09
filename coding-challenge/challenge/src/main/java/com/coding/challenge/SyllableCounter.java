package com.coding.challenge;

/**
 * SyllableCounter
 * ----------------
 * A simple utility to count syllables in a word,
 * assuming syllables are separated by hyphens.
 * 
 * Example:
 * Input:  "ho-tel"       → Output: 2
 * Input:  "cat"          → Output: 1
 * Input:  "met-a-phor"   → Output: 3
 *
 * Author: Mohan Raj S
 * Date: 08-07-2025
 */
public class SyllableCounter {

    /**
     * Counts syllables in a word separated by hyphens.
     *
     * @param word The hyphen-separated word.
     * @return The number of syllables. Returns 0 if the word is null or blank.
     */
    public static int count(String word) {
        if (word == null || word.isBlank()) {
            return 0;
        }
        // Split by hyphen and count parts
        return word.split("-").length;
    }

    public static void main(String[] args) {
        // Sample test cases
        System.out.println("Syllables in 'ho-tel': " + count("ho-tel"));               // 2
        System.out.println("Syllables in 'cat': " + count("cat"));                     // 1
        System.out.println("Syllables in 'met-a-phor': " + count("met-a-phor"));       // 3
        System.out.println("Syllables in 'ter-min-a-tor': " + count("ter-min-a-tor")); // 4
        System.out.println("Syllables in null: " + count(null));                       // 0
        System.out.println("Syllables in '': " + count(""));                           // 0
    }
}
