package com.coding.challenge;

/**
 * StringMiddle
 * -------------
 * A utility class to find the middle character of a string
 * if the string has odd length.
 * 
 * If the string has an even length, it returns an empty string.
 *
 * Example:
 * Input:  "abc"     → Output: "b"
 * Input:  "aaaa"    → Output: ""
 * Input:  "x"       → Output: "x"
 *
 * Author: Mohan Raj S
 * Date :08-07-2025
 */
public class StringMiddle {

    /**
     * Returns the middle character of the input string if its length is odd.
     * Returns an empty string if the length is even.
     *
     * @param input the input string
     * @return the middle character or empty string
     */
    public static String mid(String input) {
        if (input.length() % 2 == 0) {
            // Even length → no single middle character
            return "";
        } else {
            int middleIndex = input.length() / 2;
            return String.valueOf(input.charAt(middleIndex));
        }
    }

    /**
     * Main method to test the mid() function with sample inputs.
     */
    public static void main(String[] args) {
        System.out.println("mid(\"abc\") = " + mid("abc"));           // b
        System.out.println("mid(\"aaaa\") = " + mid("aaaa"));         // (empty)
        System.out.println("mid(\"x\") = " + mid("x"));               // x
        System.out.println("mid(\"coding\") = " + mid("coding"));     // d
    }
}
