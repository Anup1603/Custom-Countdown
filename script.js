const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')


let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown
const updateDOM = function () {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now;
        // console.log('Distance: ', distance);

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        // console.log(days, hours, minutes, seconds);

        // Hide Inputs
        inputContainer.hidden = true

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else {
            // Else , show countdown in progress
            // Populated countdown
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`

            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second);
}

// Take Value From Form Inputs
const updateCountdown = function (e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    // console.log(countdownTitle, countdownDate);
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))

    // Check the valid date
    if (countdownDate === '') {
        alert("Please select the date for countdown")
    }
    else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime()
        // console.log('Countdown Value:', countdownValue)
        updateDOM()
    }
}

// Reset all value
const reset = function () {
    // Hide Countdown
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false

    // Stop the countdown
    clearInterval(countdownActive)

    // Reset Value
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}

const restorePreviousCountdown = function () {
    // Get countdown from localstroage if avaliable
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// On load
restorePreviousCountdown();