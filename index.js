const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('.board');
const colorCircle = ['red', 'blue', 'green', 'pink', 'white', 'purple', 'browm', 'yellow'];
const maxCountColor = colorCircle.length;
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if(e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('circle')){
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    const interval = setInterval(() => {
        if(time === 0){
            clearInterval(interval);
        }
        decreaseTime();
    }, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if(time === 0){
        finishGame();

    } else {
        let current = --time;
        if(current < 10){
        current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`;
}

function replace() {
    screens[1].classList.remove('up');
    timeEl.parentNode.classList.remove('hide');
    board.innerHTML = '';
    score = 0;
    board.removeEventListener('click', replace);
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span> </h1>`;
    board.addEventListener('click', replace);
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const color = getRandomColor();
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.background = color;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colorCircle[Math.round(Math.random() * maxCountColor)];
}