package com.coding.challenge;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * CapitalChecker
 * ---------------
 * A simple program to find all indexes of capital (uppercase) letters in a given string.
 * 
 * Example:
 * Input:  "HeLLo"
 * Output: [0, 2, 3]
 *
 * Author:Mohan raj S
 * Date: 08-07-2025
 */
public class CapitalChecker {

    /**
     * Finds the indexes of all uppercase letters in the given string.
     *
     * @param input the input string
     * @return a list of indexes where uppercase letters are present
     */
    public static List<Integer> capitalIndexes(String input) {
        List<Integer> result = new ArrayList<>();

        // Loop through each character in the string
        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);

            // Check if the character is uppercase
            if (Character.isUpperCase(ch)) {
                result.add(i);  // Store the index
            }
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter a string
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        // Get the list of capital letter indexes
        List<Integer> result = capitalIndexes(input);

        // Display the result
        System.out.println("Capital indexes in \"" + input + "\": " + result);

        scanner.close();
    }
}
