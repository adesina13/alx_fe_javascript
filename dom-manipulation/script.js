
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

const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')

function addQuote(){
    if (newQuoteText.value.trim() !== "" && newQuoteCategory.value.trim() !== "" ){
        AwoQuote.push({
            "category": newQuoteCategory.value,
            "text": newQuoteText.value
        })
        newQuoteText.value = ""
        newQuoteCategory.value = ""
    }else{
        alert("Fill the fields")
    }
}