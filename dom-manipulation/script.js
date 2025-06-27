


const awo = localStorage.getItem('quote')
let storedAwoQuote = JSON.parse(awo)



    const quoteDisplay = document.getElementById('quoteDisplay')
    const newQuote = document.getElementById('newQuote')


    function showRandomQuote(){
        if (storedAwoQuote !== null){
        const randomInt = Math.floor(Math.random() * (storedAwoQuote.length ));
        quoteDisplay.innerHTML = `<div>Category: ${storedAwoQuote[randomInt]["category"]}</div>
                                <div>Text: ${storedAwoQuote[randomInt]["text"]}</div>`
        
        }else{
            alert("No Stored Quote")
        }
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