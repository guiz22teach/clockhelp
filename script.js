document.addEventListener('DOMContentLoaded', function() {
    function setClock(clockElement, type) {
        const now = new Date();
        let degrees;

        if (type === 'hour') {
            const hours = now.getHours() % 12; // Ensure hours are in 12-hour format
            const minutes = now.getMinutes();
            degrees = ((hours / 12) * 360) + ((minutes / 60) * 30) - 90; // Adjust for minutes and correct offset
            clockElement.querySelector('.hour-hand').style.transform = `rotate(${degrees}deg)`;
        } else if (type === 'minute') {
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            degrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90; // Adjust for seconds and correct offset
            clockElement.querySelector('.minute-hand').style.transform = `rotate(${degrees}deg)`;
        } else if (type === 'second') {
            const seconds = now.getSeconds();
            degrees = ((seconds / 60) * 360) - 90; // Correct offset
            clockElement.querySelector('.second-hand').style.transform = `rotate(${degrees}deg)`;
        } else {
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours() % 12; // Ensure hours are in 12-hour format
            const secondDegrees = ((seconds / 60) * 360) - 90; // Correct offset
            const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) - 90; // Correct offset
            const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) - 90; // Correct offset

            clockElement.querySelector('.second-hand').style.transform = `rotate(${secondDegrees}deg)`;
            clockElement.querySelector('.minute-hand').style.transform = `rotate(${minuteDegrees}deg)`;
            clockElement.querySelector('.hour-hand').style.transform = `rotate(${hourDegrees}deg)`;
        }
    }

    function updateClocks() {
        setClock(document.getElementById('hour-clock'), 'hour');
        setClock(document.getElementById('minute-clock'), 'minute');
        setClock(document.getElementById('second-clock'), 'second');
        setClock(document.getElementById('full-clock'), 'full');
    }



 function hideTextBox() {
        const textBox = document.querySelector('.text-box');
        textBox.style.display = 'none'; // Hide the text box
    }

    // Hide the text box after 10 seconds
    setTimeout(hideTextBox, 10000); // 10000 milliseconds = 10 seconds

      // Add event listener for the text box
        document.querySelector('.text-box').addEventListener('click', hideTextBox);

    function createMinuteMarkers() {
        const analogClocks = document.querySelectorAll('.clock:not(#digital-clock)'); // Exclude the digital clock
        analogClocks.forEach(clock => {
            for (let i = 0; i < 60; i++) {
                const marker = document.createElement('div');
                marker.classList.add('marker');
                if (i % 5 === 0) {
                    marker.classList.add('hour-marker'); // Add class for hour markers
                }
                marker.style.setProperty('--rotate-angle', `${i * 6}deg`);
                clock.appendChild(marker);
            }
        });
    }


    createMinuteMarkers();
    setInterval(updateClocks, 1000);
    updateClocks(); // Initial call to set the clocks immediately

    let toggleState = 0;

    document.getElementById('toggle-clock').addEventListener('click', function() {
        const fullClockWrapper = document.getElementById('full-clock-wrapper');
        const hourClockWrapper = document.getElementById('hour-clock-wrapper');
        const minuteClockWrapper = document.getElementById('minute-clock-wrapper');
        const secondClockWrapper = document.getElementById('second-clock-wrapper');

        toggleState = (toggleState + 1) % 3;

        if (toggleState === 0) {
            fullClockWrapper.style.display = 'flex';
            hourClockWrapper.style.display = 'none';
            minuteClockWrapper.style.display = 'none';
            secondClockWrapper.style.display = 'none';
        } else if (toggleState === 1) {
            fullClockWrapper.style.display = 'none';
            hourClockWrapper.style.display = 'flex';
            minuteClockWrapper.style.display = 'flex';
            secondClockWrapper.style.display = 'flex';
        } else {
            fullClockWrapper.style.display = 'flex';
            hourClockWrapper.style.display = 'flex';
            minuteClockWrapper.style.display = 'flex';
            secondClockWrapper.style.display = 'flex';
        }
    });

  document.getElementById('toggle-seconds').addEventListener('click', function() {
      const secondHands = document.querySelectorAll('.second-hand');
      const secondClock = document.getElementById('second-clock');
      const secondLabel = secondClock.previousElementSibling;

      // Toggle visibility of second hands
      secondHands.forEach(hand => {
          hand.style.display = hand.style.display === 'none' ? 'block' : 'none';
      });


      if (secondClock.style.display === 'none') {
          secondClock.style.display = 'flex';
          secondLabel.style.display = 'block';

      } else {
          secondClock.style.display = 'none';
          secondLabel.style.display = 'none';

      }

  });


    document.getElementById('toggle-theme').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });


});


// script.js
window.addEventListener("load", () => {
    let timeFormatState = 0; // 0: none, 1: 12-hour, 2: 24-hour
    const toggleButton = document.getElementById("toggle-digital");

    toggleButton.addEventListener("click", () => {
        timeFormatState = (timeFormatState === 2) ? 0 : timeFormatState + 1; // Cycle between 0, 1, and 2
        updateDigitalClock();
        });

 // Toggle digital date visibility
     let digitalDateVisible = true; // Initially visible

     document.getElementById('toggle-date').addEventListener('click', function() {
             const digitalDateContainer = document.getElementById('date-container');
             const digitalDateText = document.getElementById('date'); // Get the digital date text

 // Toggle visibility
             digitalDateVisible = !digitalDateVisible;
             digitalDateContainer.style.display = digitalDateVisible ? 'block' : 'none';
             digitalDateText.style.display = digitalDateVisible ? 'block' : 'none'; // Hide/show the digital date text
 });

    function updateDigitalClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Add '0' to hour, minute, and second when they are less than 10
        const hour = hours < 10 ? "0" + hours : hours;
        const minute = minutes < 10 ? "0" + minutes : minutes;
        const second = seconds < 10 ? "0" + seconds : seconds;

        // Calculate 12-hour time format
        const hour12 = hours % 12 || 12;
        const ampm = hours < 12 ? "am" : "pm";
        const time12Hour = hour12 + ":" + minute + (toggleSecondsDisplay() ? ":" + second : "") + " " + ampm;

        // Calculate 24-hour time format
        const time24Hour = hour + ":" + minute + (toggleSecondsDisplay() ? ":" + second : "");

        // Get current date and time
        const date = now.toLocaleDateString();
        let time = "";
        if (timeFormatState === 1) {
            time = time12Hour;
        } else if (timeFormatState === 2) {
            time = time24Hour;
        }

        // Get the day of the week
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[now.getDay()]; // 0 = Sunday, 1 = Monday, ...

        // Print current date, time, and day of the week to the DOM
        document.getElementById("time").textContent = time; // Display time in the chosen format
        document.getElementById("date").textContent = `${dayOfWeek}, ${date}`; // Display date and day of the week

        // Update every second
        setTimeout(updateDigitalClock, 1000);
    }

    function toggleSecondsDisplay() {
        return document.querySelector(".digital-seconds").style.display === "block";
    }

    // Call the function immediately to display seconds from the start
    const digitalSeconds = document.querySelector(".digital-seconds");
    digitalSeconds.style.display = "block"; // Show seconds initially

    // Toggle seconds display
    const toggleSecondsButton = document.getElementById("toggle-seconds");
    toggleSecondsButton.addEventListener("click", () => {
        digitalSeconds.style.display = toggleSecondsDisplay() ? "none" : "block";
    });

    // Initial call to set the clock immediately
    updateDigitalClock();
});
