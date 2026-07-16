const board = document.getElementById('board');

const cardsArray = [
    'img/1.png',  'img/1.png',
    'img/2.png',  'img/2.png',
    'img/3.png',  'img/3.png',
    'img/4.png',  'img/4.png',
    'img/5.png',  'img/5.png',
    'img/6.png',  'img/6.png',
    'img/7.png',  'img/7.png',
    'img/8.png',  'img/8.png',
    'img/9.png',  'img/9.png',
    'img/10.png', 'img/10.png'
];

cardsArray.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let canClick = true;
let time = 0;
let timerInterval = null;
let pairsFound = 0; 

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.innerText = 'Время: ' + time + ' с';
        }
    }, 1000);
}

cardsArray.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = 'img/back.jpg';
    img.dataset.src = src;
    img.id = 'card' + index;
    img.onclick = () => flipCard(img);
    board.appendChild(img);
});

function flipCard(img) {
    if (!canClick || img.src.includes(img.dataset.src) || img === firstCard) return;

    img.src = img.dataset.src;

    if (!firstCard) {
        firstCard = img;
    } else {
        secondCard = img;
        canClick = false;
        setTimeout(checkMath, 800);
    }
}

function checkMath() {
    if (firstCard.dataset.src === secondCard.dataset.src) {
        pairsFound++;
        if (pairsFound === 10) {
            clearInterval(timerInterval);
            alert('Победа! Твое время: ' + time + ' с');
        }
    } else {
        firstCard.src = 'img/back.jpg';
        secondCard.src = 'img/back.jpg';
    }
    firstCard = null;
    secondCard = null;
    canClick = true;
}

startTimer();