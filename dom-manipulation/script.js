
    const quoteDisplay = document.getElementById('quoteDisplay')
    const newQuote = document.getElementById('newQuote')

    // Setting up the local Storage
    const awo = localStorage.getItem('quote')
    let storedAwoQuote = JSON.parse(awo)
   
    // Function that handules the randoom qoute
    function showRandomQuote(){
        if (storedAwoQuote !== null){
        const randomInt = Math.floor(Math.random() * (storedAwoQuote.length ));
        quoteDisplay.innerHTML = `<div>Category: ${storedAwoQuote[randomInt]["category"]}</div>
                                <div>Text: ${storedAwoQuote[randomInt]["text"]}</div>`
        sessionStorage.setItem('recentQuote', JSON.stringify({
            "category": storedAwoQuote[randomInt]["category"],
            "text": storedAwoQuote[randomInt]["text"]
        }))
        }else{
            alert("No Stored Quote")
        }
    }

    newQuote.addEventListener('click', showRandomQuote)

    // SHow the last Showned Qoute
    const recent = sessionStorage.getItem('recentQuote')
    const recentQuote = JSON.parse(recent)

    if (recentQuote !== null){
        quoteDisplay.innerHTML = `<div>Category: ${recentQuote["category"]}</div>
                                <div>Text: ${recentQuote["text"]}</div>`
    }


// Make the user to be able to add a new quote
const createAddQuoteForm = document.createElement('div')
createAddQuoteForm.innerHTML = `<div>
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
</div>`

document.querySelector('body').appendChild(createAddQuoteForm)


function addQuote(){
    const newQuoteText = document.getElementById('newQuoteText')
    const newQuoteCategory = document.getElementById('newQuoteCategory')
    
    if (newQuoteCategory.value.trim() !== "" && newQuoteText.value.trim() !== ""){
        if (storedAwoQuote !== null){
            storedAwoQuote.push({
                "category": newQuoteCategory.value,
                "text": newQuoteText.value
            })
        }else{
            storedAwoQuote = [
                {
                "category": newQuoteCategory.value,
                "text": newQuoteText.value
            }
            ]
        }
        localStorage.setItem('quote', JSON.stringify(storedAwoQuote))
        newQuoteText.value = ""
        newQuoteCategory.value = ""
    }else{
        alert("Fill the fields")
    }
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

const exportBtn = document.getElementById('exportBtn')
exportBtn.addEventListener('click', () => {
      const jsonData = JSON.stringify(storedAwoQuote, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      a.click();

      URL.revokeObjectURL(url); // optional cleanup
    });