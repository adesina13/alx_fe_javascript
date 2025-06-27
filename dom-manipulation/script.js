const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const exportBtn = document.getElementById('exportBtn');
const categoryFilter = document.getElementById('categoryFilter');
const notification = document.getElementById('notification');

// Load stored quotes
let storedAwoQuote = JSON.parse(localStorage.getItem('quote')) || [];

// Show random quote
function showRandomQuote() {
  if (storedAwoQuote.length === 0) {
    alert("No Stored Quotes");
    return;
  }

  const randomIndex = Math.floor(Math.random() * storedAwoQuote.length);
  const quote = storedAwoQuote[randomIndex];

  quoteDisplay.innerHTML = `<div>Category: ${quote.category}</div><div>Text: ${quote.text}</div>`;

  sessionStorage.setItem('recentQuote', JSON.stringify(quote));
}

// Load last shown quote
const recent = sessionStorage.getItem('recentQuote');
if (recent) {
  const quote = JSON.parse(recent);
  quoteDisplay.innerHTML = `<div>Category: ${quote.category}</div><div>Text: ${quote.text}</div>`;
}

// Show new random quote
newQuoteBtn.addEventListener('click', showRandomQuote);

// Add new quote
async function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText');
  const newQuoteCategory = document.getElementById('newQuoteCategory');

  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please fill both fields.");
    return;
  }

  const newQuote = {
    id: Date.now(),
    text,
    category,
    updatedAt: new Date().toISOString()
  };

  // Add to local storage
  storedAwoQuote.push(newQuote);
  localStorage.setItem('quote', JSON.stringify(storedAwoQuote));
  populateCategories();
  notifyUser("Quote added locally.");

  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Simulated POST to server
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuote)
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Quote sent to server (mock):", result);
      notifyUser("Quote also sent to server.");
    } else {
      throw new Error("Server did not accept the quote");
    }
  } catch (err) {
    console.error("Failed to post quote to server:", err);
    notifyUser("Failed to sync quote to server.");
  }
}


// Export quotes to JSON
exportBtn.addEventListener('click', () => {
  const jsonData = JSON.stringify(storedAwoQuote, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const imported = JSON.parse(event.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");

      imported.forEach(q => {
        if (!q.text || !q.category) return;
        q.id = q.id || Date.now();
        q.updatedAt = q.updatedAt || new Date().toISOString();
        storedAwoQuote.push(q);
      });

      localStorage.setItem('quote', JSON.stringify(storedAwoQuote));
      populateCategories();
      notifyUser("Quotes imported successfully!");
    } catch (e) {
      alert("Failed to import quotes: " + e.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Populate dropdown from categories
function populateCategories() {
  const selectedCategory = [...new Set(storedAwoQuote.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  selectedCategory.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const saved = localStorage.getItem('lastSelectedCategory');
  if (saved) {
    categoryFilter.value = saved;
    filterQuotes();
  }
}

// Filter quotes
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem('lastSelectedCategory', selected);

  const filtered = selected === 'all'
    ? storedAwoQuote
    : storedAwoQuote.filter(q => q.category === selected);

  quoteDisplay.innerHTML = filtered.map(q =>
    `<div><strong>${q.category}</strong>: ${q.text}</div>`
  ).join('');
}

// Simple notification
function notifyUser(message) {
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => notification.style.display = "none", 4000);
}

// Simulate server syncing
async function syncWithServer() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const fetchQuotesFromServer = await res.json();

    const formatted = fetchQuotesFromServer.slice(0, 5).map(post => ({
      id: post.id,
      category: "Server Category",
      text: post.body,
      updatedAt: new Date().toISOString()
    }));

    formatted.forEach(serverQuote => {
      const index = storedAwoQuote.findIndex(q => q.id === serverQuote.id);
      if (index >= 0) {
        storedAwoQuote[index] = serverQuote;
      } else {
        storedAwoQuote.push(serverQuote);
      }
    });

    localStorage.setItem('quote', JSON.stringify(storedAwoQuote));
    populateCategories();
    notifyUser("Synced with server.");
  } catch (err) {
    console.error("Sync failed:", err);
    notifyUser("Server sync failed.");
  }
}

// Run sync every 30 seconds
setInterval(syncWithServer, 30000);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
});
