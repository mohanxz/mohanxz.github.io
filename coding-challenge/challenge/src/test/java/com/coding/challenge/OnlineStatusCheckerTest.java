package com.coding.challenge;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for {@link OnlineStatusChecker}.
 *
 * This test class verifies the correctness of the method:
 * {@link OnlineStatusChecker#onlineCount(Map)}
 *
 * Author: Mohan raj S
 * Date: 08-07-2025
 */
public class OnlineStatusCheckerTest {

    /**
     * Test various scenarios for onlineCount()
     */
    @Test
    void testOnlineCount() {
        // Test case 1: mix of online and offline
        Map<String, String> test1 = new HashMap<>();
        test1.put("Alice", "online");
        test1.put("Bob", "offline");
        test1.put("Eve", "online");
        assertEquals(2, OnlineStatusChecker.onlineCount(test1), 
            "Should count 2 online users");

        // Test case 2: empty map
        Map<String, String> test2 = new HashMap<>();
        assertEquals(0, OnlineStatusChecker.onlineCount(test2), 
            "Empty map should return 0");

        // Test case 3: all offline
        Map<String, String> test3 = new HashMap<>();
        test3.put("Tom", "offline");
        test3.put("Jerry", "offline");
        assertEquals(0, OnlineStatusChecker.onlineCount(test3), 
            "All offline should return 0");

        // Test case 4: single online user
        Map<String, String> test4 = new HashMap<>();
        test4.put("Anna", "online");
        assertEquals(1, OnlineStatusChecker.onlineCount(test4), 
            "Single online user should return 1");
    }
}
