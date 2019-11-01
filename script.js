const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => b == 0 ? display.value = 'can\'t divide by 0' : a / b;
const operate = (operator, a, b) => operator(a,b);
const display = document.querySelector('input');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', updateDisplay));

let numArr =[];
let tempNum = '';

function updateDisplay(e){
	let that = this;
	switch (true) {
		case this.value == 'equals':
			insertOperand();
			isValidCalc();
			orderOfOperations(numArr);
			break;
		case this.value == 'clear':
			clear();
			break;
		case this.classList.contains("operator"):
			insertOperand();
			addOperator(that);
			break;
		default:
			display.value += this.value;
			tempNum += this.value;
	}
}

function orderOfOperations(calcArr){
	let copyArr = calcArr;
	while(copyArr.length > 1) {
		switch(true){
			case copyArr.includes("multiply"):
				let multIndex = copyArr.findIndex(calcVal => calcVal === "multiply");
				let multValue = operate(multiply, copyArr[multIndex - 1], copyArr[multIndex + 1]);
				copyArr.splice(multIndex - 1, 3, multValue);
				break;
			case copyArr.includes("divide"):
				let divIndex = copyArr.findIndex(calcVal => calcVal === "divide");
				let divValue = operate(divide, copyArr[divIndex - 1], copyArr[divIndex + 1]);
        copyArr.splice(divIndex - 1, 3, divValue);
				break;
      case copyArr.includes("add"):
				let addIndex = copyArr.findIndex(calcVal => calcVal === "add");
				let addValue = operate(add, copyArr[addIndex - 1], copyArr[addIndex + 1]);
        copyArr.splice(addIndex - 1, 3, addValue);
				break;
      case copyArr.includes("subtract"):
        let subIndex = copyArr.findIndex(calcVal => calcVal === "subtract");
        let subValue = operate(subtract, copyArr[subIndex - 1], copyArr[subIndex + 1]);
        copyArr.splice(subIndex - 1, 3, subValue);
				break;
      default:
				return 'ERROR';
		}
	}
	display.value = copyArr[0].toFixed(2);
}

function insertOperand() {
	if(tempNum) {
		numArr.push(+tempNum);
		tempNum = '';
	}
}

function addOperator(that) {
	switch(true){
		case that.value == "+":
			display.value += that.value;
			numArr.push("add");
			break;
		case that.value == "-":
			display.value += that.value;
			numArr.push("subtract");
			break;
		case that.value == "*":
			display.value += that.value;
			numArr.push("multiply");
			break;
		case that.value == "/":
			display.value += that.value;
			numArr.push("divide");
			break; 
	}
}

function clear() {
	numArr = [];
	display.value = null;
}

function isValidCalc() {
	if(!numArr || typeof numArr[numArr.length - 1] === 'string'){
		display.value = 'OOPS';
		return;
	}
}