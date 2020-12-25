const submitBtn = document.getElementById("submit");
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const title = document.getElementById("title");
const datePicker = document.getElementById("date-picker");

const countdownContainer = document.getElementById("countdown");
const countdownTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
let allTimeEl = document.querySelectorAll("span");

const completeContainer = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let enteredTitle , enteredDate , countdownTime , countdownActive;

let distance , saveEnteredData;

// To make the time conversion easier in the function below
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// updateLocalStorage function to update the local storage
const updateLocalStorage = () => {
    
    // Hide the input container
    inputContainer.hidden  = true;

    // the localStorage is in the JSON string form first we have to convert it into object
    const getSavedData = JSON.parse(localStorage.getItem("countdown"));

    // Assigining the stored date and title to the entered title so that it would run eventually from our stored data
    enteredTitle = getSavedData.title;
    enteredDate = getSavedData.date;

    // Running updateTime function which will hide the input container and dynamically display countdown container and complete container.
    updateTime();
    

};

// Setting the min date in the date input as today's date coz we can't set countdown for the past
let today = new Date();
// converting date object into string so that the string can be added as the value of the attribute
today = today.toISOString().split("T")[0];
datePicker.setAttribute("min" , today);

// Function to calculate the days , hours , minutes , secs and update it to the UI
const updateTime = () => {

    // As we have to update the time each second , we are using setInterval which will update the times each second(1000 ms);
    countdownActive = setInterval( () => {
        // Current Time( it will be in milliseconds from Jan 1 1967 to today's date)
        const currentTime = new Date().getTime();

        // getting the time of the countdownTime
        countdownTime = new Date(enteredDate).getTime();

        // Getting the difference of current Time and the entered Countdown time to calculate days , hours and all
        distance = countdownTime - currentTime;

        // Converted days , hours , minutes and seconds
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        // Collection of all the time so that further assignments will be easier
        const timeCollections = [days , hours , minutes , seconds];

        // Assigning these times to all the span
        allTimeEl = Array.from(allTimeEl);
        allTimeEl.forEach((el , index) => {
            el.textContent = timeCollections[index];
        });

        // Hide the inputContainer
        inputContainer.hidden = true;

        // Show the countdown Container
        countdownContainer.hidden = false;

        // Updating the countdown title
        countdownTitle.textContent = enteredTitle;

        // If the distance value becomes negative then , show complete Container and its all values
        if(distance < 0) {
            // Hide the inputContainer
            inputContainer.hidden = true;

            // Hide the countdown Container
            countdownContainer.hidden = true;

            // Show the complete Container 
            completeContainer.hidden = false;

            // Add the entered title and entered date as the title of the complete container
            completeInfo.textContent = `${enteredTitle} finished on ${enteredDate}.`;
        }

    } , second);    
};



/*-------------------------*/
/*----FUNCTIONS USED IN THE EVENT LISTENERS------*/
/*-------------------------*/


const updateCountdown = (event) => {
    // to stop the form from reloading and not send the entered value
    event.preventDefault();

    // Getting the entered value in the form
    enteredTitle = title.value;
    enteredDate = datePicker.value;

    // localStorage to store entered title and date so that countdown will still run
    saveEnteredData = {
        title : enteredTitle,
        date : enteredDate
    };
    // Using JSON.stringify to convert js object to JSON string
    // we use JSON.parse for the exact opposite operationJ
    localStorage.setItem("countdown" , JSON.stringify(saveEnteredData));

    if(enteredTitle === "" || enteredDate === "") {
        alert("Enter appropriate title or date!!!");
    }
    else {

        // Function to calculate the days , hours , minutes , secs and update it to the UI
        updateTime();

    }
};


const reset = () => {

    // Hide the countdown container
    countdownContainer.hidden = true;

    // Hide the complete Container too
    completeContainer.hidden = true;

    // End the set Interval function
    clearInterval(countdownActive);

    // Clear the fields before showing the input container
    title.value = "";
    datePicker.value = "";

    // Show the input container
    inputContainer.hidden = false;

    // When the reset button or complete button is entered the stored data comes of no value , so removing the local storage
    localStorage.removeItem("countdown");


};


/*-------------------------*/
/*-------------------------*/
/*-------------------------*/





/*-------------------------*/
/*----EVENT LISTENERS------*/
/*-------------------------*/

// When Form is about to submit
countdownForm.addEventListener("submit" , updateCountdown);

// When you click reset button 
countdownBtn.addEventListener("click" , reset);

// When you click the complete button
completeBtn.addEventListener("click" , reset);




/*-------------------------*/
/*-------------------------*/
/*-------------------------*/

// On Load , the function below runs to check if there is localStorage present and if uses that
updateLocalStorage();



