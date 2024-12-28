/**
 * project-name: calculator with history of your current activity
 * developer-name: Joel Ababio Dartey (JADE);
 */

var expressionDiv = document.getElementById("expression");
var resultDiv = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let historyText = document.getElementById("historyText");

let expression = ""; //expression
let result = ""; //the evaluated result

//what happens when a button is being clicked
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let action = event.target.dataset.action; //action attribute
    let value = event.target.dataset.value; //value attribute

    //checks for the button targeted data attribute value
    switch (action) {
      case "number":
        addValue(value);
        break;
      case "operator":
        if (lastCharOperator(expression)) {
          return;
        } else {
          if (expression == "") {
            expression += result;
            addValue(value);
          } else {
            addValue(value);
          }
        }
        break;
      case "clear":
        expression = " ";
        result = " ";
        break;
      case "dot":
        if (!expression.endsWith(".")) {
          addValue(value);
        } else {
          return;
        }
        break;
      case "back-tip":
        expression = expression.slice(0, -1);
        break;
      case "evaluate":
        try {
          if (!expression == "" && result == "") {
            result += eval(expression);
            updateStorage(result, expression);
            expression = "";
          } else {
            result = eval(expression);
            updateStorage(result, expression);
            expression = "";
          }
        } catch (error) {
          result = error;
          expression = "";
        }
        break;
      case "history":
        document.getElementById("history").classList.toggle("active");
        document.querySelector(".wrapper").classList.toggle("active");
        break;
      case "percentage":
        percentage();
    }
    expressionDiv.innerHTML = expression; //equates the expression value to the expression div
    resultDiv.innerHTML = result; //equates the resulted value to the result div
  });
});

function addValue(value) {
  //adds the value
  expression += value;
}

//checks for the last index equals an operator
function lastCharOperator(str) {
  const operator = ["/", "*", "-", "+"];
  let checkInput = str.slice(-1);
  return operator.includes(checkInput);
}

//evaluates to percentage
function percentage() {
  if (lastCharOperator(expression)) {
    return;
  } else if (
    (!lastCharOperator(expression) && expression != "") ||
    result == ""
  ) {
    result = eval(expression) / 100;
    updateStorage(result, expression);
  } else if (expression == "" && !result == "") {
    result /= 100;
    updateStorage(result, expression);
  }
}

//closes the history tab
document.getElementById("bin").addEventListener("click", () => {
  document.querySelector(".wrapper").classList.toggle("active");
  document.getElementById("history").classList.toggle("active");
});

//update storage
//  historyText.innerHTML += "<br>" + storage;
function updateStorage(result, expression) {
  let storedValued = localStorage.getItem("storedValue");
  let storage = "";

  if (storedValued) {
    storage += expression + " = " + result + "\n";
  } else {
    storage = expression + " = " + result + "\n";
  }

  localStorage.setItem("storedValue", storage);

  historyText.innerHTML += "<br>" + storage;
}
