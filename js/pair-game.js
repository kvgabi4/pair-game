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

const randomize = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
};

const randomizeCards = () => {
    randomFigureArray = randomize([...figures, ...figures]);
    cardsUp.forEach((item, index) => cardsUp[index].textContent = randomFigureArray[index])
};

const addClass = (element, className) => {
    element.classList.add(className);
};
const removeClass = (element, className) => {
    element.classList.remove(className);
};

const hit = () => {
    hits += 1;
    previousCard = ['', NaN];
    return hits, previousCard;
};

const notHit = (index) => {
    addClass(cardsUp[index], 'hide');
    addClass(cardsUp[index], 'flashDown');
    removeClass(cardsDown[index], 'hide');
    removeClass(cardsDown[index], 'flashUp');
};

const stepCounting = () => {
    stepCounter += 1;
};

const setPreviousCard = (value, index) => {
    previousCard = [value, index];
};

const setTime = (index) => {
    setTimeout(() => {
        notHit(previousCard[1]);
        notHit(index);
        setPreviousCard('', NaN);
        stepCounting();
    }, 600)
    return stepCounter;
};

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

const defaults = () => {
    previousCard = ['', NaN];
    stepCounter = 1;
    hits = 0;
    time = 0;
};

const bestTimeHighLight = () => {
    if (time < bestTime) {
        bestTime = time;
        addClass(highlight, 'highlight');
    };
    highlight.textContent = `${timeTxt(bestTime)}`;
}

const stopStopper = () => {
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
}

cardsDown.forEach((item, index) => item.addEventListener('click', () => {
    if (stepCounter === 1) {
        startStopper();
        randomizeCards();
    };
    addClass(cardsDown[index], 'hide');
    addClass(cardsDown[index], 'flashDown');
    removeClass(cardsUp[index], 'hide');
    removeClass(cardsUp[index], 'flashUp');
    if (stepCounter % 2 === 0) {
        cardsUp[index].textContent !== previousCard[0] ? setTime(index) : (hit(), stepCounting());
    } else {
        setPreviousCard(cardsUp[index].textContent, index);
        stepCounting();
    };
    if (hits === 5) {
        removeClass(wait, 'hidden');
        stopStopper();
    };
}));