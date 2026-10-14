
const quotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Great things never come from comfort zones.", author: "Unknown" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Your only limit is your mind.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is the sum of small efforts repeated daily.", author: "Robert Collier" },
    { text: "Every day is a new beginning.", author: "Unknown" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Small progress is still progress.", author: "Unknown" }
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuote");
const copyQuoteButton = document.getElementById("copyQuote");
const favoriteQuoteButton = document.getElementById("favoriteQuote");
const favoritesElement = document.getElementById("favorites");

let currentQuote = quotes[0];
let favorites = [];

function showRandomQuote() {
    let nextQuote;

    do {
        nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (quotes.length > 1 && nextQuote === currentQuote);

    currentQuote = nextQuote;
    quoteElement.textContent = currentQuote.text;
    authorElement.textContent = "— " + currentQuote.author;
}

newQuoteButton.addEventListener("click", showRandomQuote);

copyQuoteButton.addEventListener("click", async function () {
    const text = '"' + currentQuote.text + '" — ' + currentQuote.author;

    try {
        await navigator.clipboard.writeText(text);
        copyQuoteButton.textContent = "Copied! ✓";

        setTimeout(function () {
            copyQuoteButton.textContent = "Copy Quote 📋";
        }, 1500);
    } catch (error) {
        alert("Copy is unavailable. You can select and copy the quote manually.");
    }
});

favoriteQuoteButton.addEventListener("click", function () {
    const alreadyAdded = favorites.some(
        quote => quote.text === currentQuote.text
    );

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

