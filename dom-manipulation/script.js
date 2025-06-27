
const AwoQuote = [
    {
        category: "Life",
        text: "It is not life that matters, but the courage you bring into it."
    },
    {
        category: "Nationhood",
        text: "Nigeria is not a nation. It is a mere geographical expression."
    },
    {
        category: "Peace",
        text: "Violence never settles anything right. Apart from injuring your opponent, it also hurts you."
    },
    {
        category: "Education",
        text: "Any system of education which does not help a man to have a healthy and sound body, alert brain, and active mind is a false education."
    },
    {
        category: "Social Justice",
        text: "The children of the poor you fail to train today will never let your children have peace."
    },
    {
        category: "Patriotism",
        text: "I have never regarded myself as a tribalist; I am a nationalist of the highest order."
    },
    {
        category: "Freedom",
        text: "The black man shall be free, and in his freedom, he shall demonstrate the superiority of the mind over brute force."
    },
    {
        category: "Justice",
        text: "The worst form of injustice is pretended justice."
    },
    {
        category: "Politics",
        text: "Politics should be an avenue of service to the people and not an opportunity to make money."
    },
    {
        category: "Leadership",
        text: "The strong, the just, the selfless, the fearless, and the politically sagacious will always lead."
    }
];


const quoteDisplay = document.getElementById('quoteDisplay')
const newQuote = document.getElementById('newQuote')


function showRandomQuote(){
    const randomInt = Math.floor(Math.random() * 9) + 1;
    quoteDisplay.innerHTML = `${AwoQuote[randomInt]["text"]}`
}

newQuote.addEventListener('click', showRandomQuote)

