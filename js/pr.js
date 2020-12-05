let time = 0;
let timeIsRunning = 0;

setInterval(() => {
    if (!timeIsRunning) {
        return;
    }
    time += 1;
    const seconds = twoDigits(time % 60);
    const minutes = twoDigits(Math.floor(time / 60) % 60);
    time = `${[minutes, seconds].join(':')}`;
    const stopper = document.querySelector('.stopper');
    stopper.textContent = time;
}, 1000)

const twoDigits = (digits) => {
    digits.length < 2 ? `0${digits}` : `${digits}`;
    return digits;
}


const reset = (time) => {
    return parseInt(time) - parseInt(time);
}

const runStopper = (time) => {
    time[1] < 60 ? time[1] += 1 : (time[1] = 0, time[0] += 1);
    let timeStr = [time[0].toString(), time[1].toString()];
    twoDigits(timeStr[0]);
    twoDigits(timeStr[1]);
    stopper.textContent = `${twoDigits(timeStr[0])} : ${twoDigits(timeStr[1])}`;
    setTimeout(() => {
        runStopper(time);
    }, 1000);
    return time;
}


let time = new Date().toLocaleTimeString('hu-HU');
time = time.split(':');
console.log(time)
const startStopper = (time) => {
    time = [reset(time[0]), reset(time[1])];
    runStopper(time);
    return time;
}

const twoDigits = (digits) => {
    digits.length < 2 ? digits = '0' + digits : digits;
    return digits;
}

const stopStopper = (time) => {
    console.log('time',time);
    time = [reset(time[0]), reset(time[1])];
    stopper.textContent ='00:00';
    clearTimeout((time) => {
        runStopper(time);
        stopStopper(time);
    }, 5000);
}
