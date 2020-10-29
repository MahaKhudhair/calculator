let itemsArray = localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")): [];
localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();

  data.forEach((textnode) => {
    var data = document.getElementById("myList");
    var node = document.createElement("li");
    node.textContent = textnode;
    data.appendChild(node);
  });
});
function AddLocalStorage(result, historyoutput) {
  var op = " " + historyoutput + " = " + result;
  if (itemsArray.length > 2) {
    itemsArray.pop();
  }
  itemsArray.unshift(op);
  var c = document.getElementById("myList").childElementCount;
  var data = document.getElementById("myList");
  var node = document.createElement("LI");
  var textnode = document.createTextNode(op);
  node.prepend(textnode);
  data.prepend(node);
  if (c > 2) {
    data.removeChild(data.childNodes[3]);
  }
  localStorage.setItem("items", JSON.stringify(itemsArray));
}
function getHistory() {
  return document.getElementById("history-value").innerText;
}
function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}
function getOutput() {
  return document.getElementById("output-value").innerText;
}
function printOutput(num) {
  if (num.length > 9) {
    return;
  } else {
    if (num == "") {
      document.getElementById("output-value").innerText = num;
    } else {
      document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
  }
}
function getFormattedNumber(num) {
  if (num == "-") {
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
    } else if (this.id == "backspace") {
      var output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      var output = getOutput();
      var historyoutput = getHistory();
      if (output == "" && historyoutput != "") {
        if (isNaN(historyoutput[historyoutput.length - 1])) {
          historyoutput = historyoutput.substr(0, historyoutput.length - 1);
        }
      }
      if (output != "" || historyoutput != "") {
        output = output == "" ? output : reverseNumberFormat(output);
        historyoutput = historyoutput + output;
        if (this.id == "=") {
          document.getElementById("=").disabled = true;
          var result = eval(historyoutput);
          if (result == historyoutput) {
            return;
          } else if (!isFinite(result)) {
            alert("Can't divide by zero.");

            return;
          }

          printOutput(result);
          printHistory("");
          AddLocalStorage(result, historyoutput);
        } else {
          document.getElementById("=").disabled = false;
          historyoutput = historyoutput + this.id;
          printHistory(historyoutput);
          printOutput("");
        }
      }
    }
  });
}
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    var output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output = output + this.id;
      printOutput(output);
    }
  });
}
var btn = document.getElementById("clear-history");
btn.addEventListener("click", clearLocal);

function clearLocal() {
  localStorage.clear();

  document.getElementById("myList").innerHTML = "";
}
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}
toggleSwitch.addEventListener("change", switchTheme, false);


