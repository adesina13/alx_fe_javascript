
const AwoQuote = [
    {
        category: "Life",
        text: "It is not life that matters, but the courage you bring into it."
    },
    {
        category: "Nationhood",
        text: "Nigeria is not a nation. It is a mere geographical expression."
    },
    
];


const quoteDisplay = document.getElementById('quoteDisplay')
const newQuote = document.getElementById('newQuote')


function showRandomQuote(){
    const randomInt = Math.floor(Math.random() * (AwoQuote.length ));
    quoteDisplay.innerHTML = `${AwoQuote[randomInt]["text"]}`
    console.log(randomInt)
}

newQuote.addEventListener('click', showRandomQuote)


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
    AwoQuote.push({
        "category": newQuoteCategory.value,
        "text": newQuoteText.value
    })
    newQuoteText.value = ""
    newQuoteCategory.value = ""
   
}