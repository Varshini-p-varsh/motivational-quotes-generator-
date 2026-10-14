```java
package com.example.motivationalquotes;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
public class QuoteController {

    private final List<Map<String, String>> quotes = List.of(
        Map.of("text", "Believe you can and you're halfway there.",
               "author", "Theodore Roosevelt"),
        Map.of("text", "Great things never come from comfort zones.",
               "author", "Unknown"),
        Map.of("text", "It always seems impossible until it's done.",
               "author", "Nelson Mandela"),
        Map.of("text", "The secret of getting ahead is getting started.",
               "author", "Mark Twain"),
        Map.of("text", "Your only limit is your mind.",
               "author", "Unknown"),
        Map.of("text", "Dream big and dare to fail.",
               "author", "Norman Vaughan")
    );

    @GetMapping("/api/quotes")
    public List<Map<String, String>> getAllQuotes() {
        return quotes;
    }

    @GetMapping("/api/quotes/random")
    public Map<String, String> getRandomQuote() {
        Random random = new Random();
        return quotes.get(random.nextInt(quotes.size()));
    }
}
```
