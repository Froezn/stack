// generate a number on start
let num = generateNumber();
console.log("Number = " + num);

// create a count for the number of tries used
let count = 0;

// select input text
const input = document.querySelector("#answer");
console.log(input);
// add event listener to prevent spaces
input.addEventListener("keypress", function(event) {
  let key = event.keyCode;
  if (key === 32) {
    event.preventDefault();
  }
})

// select and assign event listener to submit button, calls checkAnswer function
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", checkAnswer);

// compare answer against generated number
function checkAnswer(e) {
  let answer = input.value;
  let responseText;
  // log error if input is empty
  if (answer === "") {
    console.log("Error: empty string");
  } else {
    // disable submit button on click 
    submitButton.disabled = true;
    if (answer == num) {
      //  if answer is correct, display message, generate new number, set input to empty
      responseText = "Congratulations! You have guessed the correct number!";
      num = generateNumber();
      console.log();

    } else {
      // if answer is wrong, increment count by and display message
      count++;
      console.log(count);
      
      // if count gets to 3,  display appropriate message
      if (count >= 3) {
        responseText = "You have used 3 tries. Game Over. The correct number is " + num;
      } else {
        // tenary operator used to determine word to use based on value of count
        responseText = answer + " is not the correct number. You have " + (3 - count) + (count > 1 ? " try" :  " tries") + " left." ;
      }
    }
    input.value = "";


    // append response to body
    let response = document.createTextNode(responseText);
    document.body.appendChild(response);

    // re-enable button and remove response after 1 second
    setTimeout(function () {
      submitButton.disabled = false;
      document.body.removeChild(response);
    }, 1000);
  }

  // prevent default function of submit button
  e.preventDefault();
}

// function to generate new random number
function generateNumber() {
  return Math.ceil(Math.random() * 10);
}
