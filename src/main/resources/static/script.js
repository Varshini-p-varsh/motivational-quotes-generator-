
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuote");
const copyQuoteButton = document.getElementById("copyQuote");
const favoriteQuoteButton = document.getElementById("favoriteQuote");
const favoritesElement = document.getElementById("favorites");

let currentQuote = {
    text: "Believe in yourself. Every small step matters.",
    author: "Unknown"
};

let favorites = [];

async function showRandomQuote() {
    try {
        const response = await fetch("/api/quotes/random");

        if (!response.ok) {
            throw new Error("API request failed");
        }

        currentQuote = await response.json();

        quoteElement.textContent = currentQuote.text;
        authorElement.textContent = "— " + currentQuote.author;
    } catch (error) {
        quoteElement.textContent =
            "Unable to load quote. Please start the Java backend.";
        authorElement.textContent = "— Motivational Quotes";
    }
}

newQuoteButton.addEventListener("click", showRandomQuote);

copyQuoteButton.addEventListener("click", async function () {
    const textToCopy =
        '"' + currentQuote.text + '" — ' + currentQuote.author;

    try {
        await navigator.clipboard.writeText(textToCopy);
        copyQuoteButton.textContent = "Copied! ✓";

        setTimeout(function () {
            copyQuoteButton.textContent = "Copy Quote 📋";
        }, 1500);
    } catch (error) {
        alert("Copy failed. Please try using HTTPS.");
    }
});

favoriteQuoteButton.addEventListener("click", function () {
    const alreadyAdded = favorites.some(function (quote) {
        return quote.text === currentQuote.text;
    });

    if (alreadyAdded) {
        alert("This quote is already in your favorites!");
        return;
    }

    favorites.push(currentQuote);
    displayFavorites();
});

function displayFavorites() {
    favoritesElement.innerHTML = "";

    favorites.forEach(function (quote) {
        const item = document.createElement("li");
        item.textContent = '"' + quote.text + '" — ' + quote.author;
        favoritesElement.appendChild(item);
    });
}

showRandomQuote();

