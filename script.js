document.addEventListener('DOMContentLoaded', function (e) {
	e.preventDefault();
	
    var history  = GetLocalStorage();
    history.forEach(item => {
		document.getElementById("myList").innerHTML="";
        var data = document.getElementById('list');
        var list = document.createElement('li');
        list.textContent = item;
       data.appendChild(list);
   });
})

function AddLocalStorage(result, historyoutput) {
	var op = ' ' + historyoutput + ' = ' + result ;
	var data = GetLocalStorage();
	if (data.length > 2){
		data.pop( );
	}
	data.unshift(op);
	localStorage.setItem('history', JSON.stringify(data));
	 GetLocalStorage();
	}
function GetLocalStorage() {
	var data ; 
    if (localStorage.getItem('history') == null || localStorage.getItem('history') == undefined) {
        data = [];
    } else {
		data = JSON.parse(localStorage.getItem('history'));
		document.getElementById("myList").innerHTML =data;
	}
   return data;
}
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
					AddLocalStorage(result, historyoutput);
	
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

