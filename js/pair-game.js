const cardsDown = document.querySelectorAll('.cards-down');
const cardsUp = document.querySelectorAll('.cards-up');
const stopper = document.querySelector('.stopper');
const wait = document.querySelector('.wait');
const highlight = document.querySelector('.bestTime');

let previousCard = ['', NaN];
let stepCounter = 1;
let time = 0;
let timeText = '';
let bestTime = Infinity;
let hits = 0;
let timeSetting;
let timeEnding;
let randomFigureArray = [];

const figures = ['🐸', '🐔', '🐭', '🐻', '🐱'];

// Randomize cards.
const randomize = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
};

const randomizeCards = () => {
    randomFigureArray = randomize([...figures, ...figures]);
    cardsUp.forEach((item, index) => cardsUp[index].textContent = randomFigureArray[index])
};

// Add and remove classes.
const addClass = (element, className) => {
    element.classList.add(className);
};

const removeClass = (element, className) => {
    element.classList.remove(className);
};

// When there is a hit.
const hit = () => {
    hits += 1;
    previousCard = ['', NaN];
    return hits, previousCard;
};

// When there is no hit.
const notHit = (index) => {
    addClass(cardsUp[index], 'hide');
    addClass(cardsUp[index], 'flashDown');
    removeClass(cardsDown[index], 'hide');
    removeClass(cardsDown[index], 'flashUp');
};

// Counting of the steps.
const stepCounting = () => {
    stepCounter += 1;
};

// Storing the previous card.
const setPreviousCard = (value, index) => {
    previousCard = [value, index];
};

// Turn back the nothit cards.
const turnBack = (index) => {
     setTimeout(() => {
        notHit(previousCard[1]);
        notHit(index);
        setPreviousCard('', NaN);
        stepCounting();
     }, 600)
    return stepCounter;
};

// Stopper settings.
const twoDigits = (digits) => {
    digits < 10 ? digits = `0${digits}` : `${digits}`;
    return digits;
};

const timeTxt = (time) => {
    const seconds = twoDigits(time % 60);
    const minutes = twoDigits(Math.floor(time / 60) % 60);
    timeText = `${[minutes, seconds].join(':')}`;
    return timeText;
};

const startStopper = () => {
    timeStarting = setInterval(() => {
        time += 1;
        timeTxt(time);
        stopper.textContent = timeText;
    }, 1000)
};

// Set best time.
const bestTimeHighLight = () => {
    if (time < bestTime) {
        bestTime = time;
        addClass(highlight, 'highlight');
    };
    highlight.textContent = `${timeTxt(bestTime)}`;
};

// End of the game. 5 seconds waiting before next round.
const defaults = () => {
    previousCard = ['', NaN];
    stepCounter = 1;
    hits = 0;
    time = 0;
};

const endOfTheGame = () => {
    clearInterval(timeStarting);
    bestTimeHighLight();
    defaults();
    timeEnding = setInterval(() => {
        stopper.textContent = '00:00';
        cardsDown.forEach((item, index) => {
            addClass(cardsUp[index], 'hide');
            addClass(cardsUp[index], 'flashDown');
            removeClass(cardsDown[index], 'hide');
            removeClass(cardsDown[index], 'flashUp');
        });
        addClass(wait, 'hidden');
        removeClass(highlight, 'highlight');
        clearInterval(timeEnding);
    }, 5000);
};

// New game.
const newGame = () => {
    if (stepCounter === 1) {
        startStopper();
        randomizeCards();
    };
};

// Main steps.
cardsDown.forEach((item, index) => item.addEventListener('click', () => {
    newGame();
    addClass(cardsDown[index], 'hide');
    addClass(cardsDown[index], 'flashDown');
    removeClass(cardsUp[index], 'hide');
    removeClass(cardsUp[index], 'flashUp');
    if (stepCounter % 2 === 0) {
        cardsUp[index].textContent !== previousCard[0] ? turnBack(index) : (hit(), stepCounting());
    } else {
        setPreviousCard(cardsUp[index].textContent, index);
        stepCounting();
    };
    if (hits === 5) {
        removeClass(wait, 'hidden');
        endOfTheGame();
    };
}));