function decOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function isValideDate (targetDate) {
    const date = new Date(targetDate);
    const currentDate = new Date();
    const validDate = !isNaN(date.getTime())
    const count = Math.floor((date - currentDate) / 1000);
    return { validDate, count };
}

function getFormattedTime (count) {
    const formattedTime = {
        day: Math.floor((count / 86400)),
        hour: Math.floor((count / 3600) % 24),
        minute: Math.floor((count / 60) % 60),
        second: count % 60
    };
    return formattedTime;
}

function renderTime (timeData, timerElem) {
    Object.keys(timeData).forEach(key => {
        const segment = timerElem[key].querySelector('.cirlce-block__segment');
        timerElem[key].querySelector('.num').textContent = timeData[key];
        const timerName = timerElem[key].querySelector('.name');

        if (timerName.classList.contains('day')) {
            timerName.textContent = decOfNum(timeData.day, ['день', 'дня', 'дней']);
        } else if (timerName.classList.contains('hour')) {
            timerName.textContent = decOfNum(timeData.hour, ['час', 'часа', 'часов']);
        } else if (timerName.classList.contains('minute')) {
            timerName.textContent = decOfNum(timeData.minute, ['минута', 'минуты', 'минут']);
        } else if (timerName.classList.contains('second')) {
            timerName.textContent = decOfNum(timeData.second, ['секунда', 'секунды', 'секунд']);
        }

        changeCircleSegment(segment, key, timeData[key]);
    });
}

function changeCircleSegment (elem, key, value) {
    const style = elem.style;

    if (['second', 'minute'].includes(key)) {
        style.strokeDasharray = `${value} 60`;
    } else if (key === 'hour') {
        const segment = 60 / 24 * value;
        style.strokeDasharray = `${segment} 60`;
    } else if (key === 'day') {
        const segment = 60 / 7 * value;
        style.strokeDasharray = `${segment} 60`;
    }

    style.strokeLinecap = value ? 'round': 'initial';
}

function digitalTimer (time, timerBlock) {
    const timerElement = {
        day: timerBlock.querySelector('.day'),
        hour: timerBlock.querySelector('.hour'),
        minute: timerBlock.querySelector('.minute'),
        second: timerBlock.querySelector('.second')
    };

    const now = new Date();
    const targetTime = new Date(time);
    let count = Math.floor((targetTime - now) / 1000);

    if (count >= 0) {
        const formattedTime = getFormattedTime(count);

        renderTime(formattedTime, timerElement);
    } else if (count === -1) {
        [...timerBlock.children].forEach(child => {
            child.remove();
        });
        
        timerBlock.textContent = 'Поздровляю с днем рождения';
    } else if (count < -1) {
        timerBlock.textContent = 'Вы ввели дату которая уже прошла';
    }
}

const digitalTimers = document.querySelectorAll('[data-digital-timer]');

if (digitalTimers.length) {
    for (let i = 0; i<digitalTimers.length; i++) {
        const timer = digitalTimers[i];
        const targetTime = timer.dataset.digitalTimer;

        const { validDate, count } = isValideDate(targetTime);

        if (timer && validDate === true && count >= 0) {
            setInterval(() => {
                digitalTimer(targetTime, timer);
            }, 1000);
    
            digitalTimer(targetTime, timer);
        }

        if (count < 0) {
            [...timer.children].forEach(child => {
                child.remove();
            });

            timer.textContent = 'Вы ввели дату которая уже прошла';
        }

        if (validDate === false) {
            [...timer.children].forEach(child => {
                child.remove();
            });
        }
    }
}