package com.coding.challenge;

import java.util.HashMap;
import java.util.Map;

/**
 * OnlineStatusChecker
 * --------------------
 * A utility program to count the number of users who are "online" 
 * based on their status in a given map of usernames and statuses.
 *
 * Example:
 * Input:  {Alice=online, Bob=offline, Eve=online}
 * Output: 2
 *
 * Author: Mohan Raj S
 * Date: 08-07-2025
 */
public class OnlineStatusChecker {

    /**
     * Counts how many users have the status "online".
     *
     * @param statuses a map of usernames to their status
     * @return the count of users who are online
     */
    public static int onlineCount(Map<String, String> statuses) {
        int count = 0;

        // Iterate through each status in the map
        for (String status : statuses.values()) {
            // Compare ignoring case for flexibility
            if ("online".equalsIgnoreCase(status)) {
                count++;
            }
        }

        return count;
    }

    public static void main(String[] args) {
        // Sample data
        Map<String, String> statuses = new HashMap<>();
        statuses.put("Alice", "online");
        statuses.put("Bob", "offline");
        statuses.put("Eve", "online");

        // Call the method and print the result
        int result = onlineCount(statuses);
        System.out.println("Number of people online: " + result);
    }
}
