let local = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : [];
localStorage.setItem('history', JSON.stringify(local));
const data = JSON.parse(localStorage.getItem('history'));
const ul = document.querySelector('ul');

const liMaker = (operation) => {
	const li = document.createElement('li');
	li.textContent = operation;
	ul.appendChild(li);
  }
document.addEventListener('DOMContentLoaded', function (e) {
	e.preventDefault();
		data.forEach(local => {
		liMaker(local);
	  });
})

function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
 	return document.getElementById("output-value").innerText;
}
function printOutput(num){
    if (num.length > 9){
      return ;
  } else {
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
        }
}
function getFormattedNumber(num){
 	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var historyoutput=getHistory();
			if(output==""&&historyoutput!=""){
				if(isNaN(historyoutput[historyoutput.length-1])){
					historyoutput= historyoutput.substr(0,historyoutput.length-1);
				}
			}
			if(output!="" || historyoutput!=""){
				output= output==""?output:reverseNumberFormat(output);
                historyoutput=historyoutput+output;
                if(this.id=="="){
					var result=eval(historyoutput);
					if (result == historyoutput){ return;}
					printOutput(result);
                    printHistory("");
					operation = '' + historyoutput + ' = ' + result;
					AddLocalStorage(operation);
                     }
				else{
					historyoutput=historyoutput+this.id;
					printHistory(historyoutput);
					printOutput("");
				}
			}
		}
		
	});
}

var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ 
			output=output+this.id;
      printOutput(output);
	  
		}
	});
}
var btn = document.getElementById('clear-history');
btn.addEventListener('click', clearLocal);

function clearLocal() {
        localStorage.clear();
		location.reload();
}

function AddLocalStorage() {
	if (local.length > 3 ){
		local.pop( );
	}
	local.unshift(operation);
	localStorage.setItem('history', JSON.stringify(local)); 
	liMaker(local);
}

