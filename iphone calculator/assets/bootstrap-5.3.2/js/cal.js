const display = document.querySelector('#display')
const clearBtn = document.querySelector('#clear')
const signBtn = document.querySelector('#sign')
const percentageBtn = document.querySelector('#percent')
const equalBtn = document.querySelector('#equal')
const operators = ["+", "-", "*", "/","+/-"]
let numberString = ""
let equation = ""
let result = null
let operator = ""

document.addEventListener("click", e => {
    if (!e.target.matches ('.num')) return
    if (numberString === "") { 
        display.innerText = ""

    }

    if (result != null) {
        clear ()
    }

    const value = e.target.innerText
    if (value === ".") {
        checkDecimal()
        return
    }

    display.innerText += value
    numberString = display.innerText
})

document.addEventListener("click", e => {
  if (!e.target.matches('.operator')) return
  if (result != null){
    equation = result.toString()
    display.innerText = equation
    result = null
  } else {
    equation += numberString
  }
 
  operator = e.target.innerText
  if (operator === "×"){
    operator = "*"
  }
  if (operator === "÷"){
    operator = "/"
  }
  numberString = ""
  checkOperator()

})

percentageBtn.addEventListener("click", () =>{
    const convertDisplay = parseFloat(display.innerText)
    const percentage = convertDisplay / 100
    display.innerText = percentage.toString()
    numberString = display.innerText
    if (result !== null){
        equation = ""
        result = null
    }

})

signBtn.addEventListener("click", () =>{
    const convertDisplay = parseFloat (display.innerText)
    if (result !== null){
        equation = ""
        if (convertDisplay > 0){
            display.innerText = "-" + result.toString()
            numberString =display.innerText
        } else if (convertDisplay < 0){
            const string = result.toString()
            const negativeSign = display.innerText.substr(string[0], 1)
            display.innerText = string.replace(negativeSign, "")
            numberString = display.innerText
        }
        result = null
        return
    }

    if (convertDisplay > 0){
        display.innerText = "-" + display.innerText
        numberString = display.innerText
    } else if (convertDisplay < 0){
        const negativeSign = display.innerText.substr(display.innerText[0], 1)
        display.innerText = display.innerText.replace(negativeSign, "")
        numberString = display.innerText
    }
})

clearBtn.addEventListener ("click", clear)

equalBtn.addEventListener("click", () =>{
    equation += numberString
    result = eval(equation)
    display.innerText = result
})

function checkDecimal() {
    const lastChar = numberString.charAt(numberString.length-1)
    if (lastChar === ".") return
    else{
        numberString +="."
        display.innerText = numberString
    }
}

function checkOperator(){
    const lastChar = equation.charAt(equation.length-1)
    for (let i = 0; i < operators.length; i++){
        if (operators[i] === lastChar) {
            const remove = equation.substr(equation.length-1, 1)
            equation = equation.replace(remove, operator)
            return
        }
    }
    equation += operator
}

function clear(){
    display.innerHTML = ""
    numberString = ""
    equation = ""
    result = null
}