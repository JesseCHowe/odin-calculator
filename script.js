function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(operator, a, b){
    return operator(a,b);
}

let numArr =[];

function updateDisplay(e){
    if(this.value == 'equals') {
        orderOfOperations(numArr)
    } else if(this.value == 'clear') {
        numArr = [];
        display.value = null;
    } else if(this.classList.contains("operator")){
            switch(true){
                case this.value == "+":
                    display.value += this.value;
                    numArr.push("add");
                    break;
                case this.value == "-":
                    display.value += this.value;
                    numArr.push("subtract");
                    break;
                case this.value == "*":
                    display.value += this.value;
                    numArr.push("multiply");
                    break;
                case this.value == "/":
                    display.value += this.value;
                    numArr.push("divide");
                    break; 
            }
    } else {
            display.value += this.value;
            numArr.push(+this.value);
    }
}

let display = document.querySelector('input');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', updateDisplay));

//Order of Operations
function orderOfOperations(calcArr){
    let copyArr = calcArr;
    while(copyArr.length > 1) {
        switch(true){
            case copyArr.includes("multiply"):
                let multIndex = copyArr.findIndex(calcVal => calcVal === "multiply");
                let multValue = operate(multiply, copyArr[multIndex - 1], copyArr[multIndex + 1]);
                copyArr.splice(multIndex - 1, 3, multValue);
                console.log(copyArr);
                break;
            case copyArr.includes("divide"):
                let divIndex = copyArr.findIndex(calcVal => calcVal === "divide");
                let divValue = operate(divide, copyArr[divIndex - 1], copyArr[divIndex + 1]);
                copyArr.splice(divIndex - 1, 3, divValue);
                console.log(copyArr);
                break;
            case copyArr.includes("add"):
                let addIndex = copyArr.findIndex(calcVal => calcVal === "add");
                let addValue = operate(add, copyArr[addIndex - 1], copyArr[addIndex + 1]);
                copyArr.splice(addIndex - 1, 3, addValue);
                console.log(copyArr);
                break;
            case copyArr.includes("subtract"):
                let subIndex = copyArr.findIndex(calcVal => calcVal === "subtract");
                let subValue = operate(subtract, copyArr[subIndex - 1], copyArr[subIndex + 1]);
                copyArr.splice(subIndex - 1, 3, subValue);
                console.log(copyArr);
                break;
            default:
                return 'ERROR';

        }
    }
    display.value = copyArr;
}