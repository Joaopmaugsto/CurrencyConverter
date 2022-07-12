// Variables

let firstValue = document.querySelector('.rate1');
let secondValue = document.querySelector('.rate2');
let resultBtn = document.querySelector('.result');


let selection = document.querySelectorAll('.options select');
let select1 = selection[0];
let select2 = selection[1];

let inputs = document.querySelectorAll('.input input');
let input1 = inputs[0];
let input2 = inputs[1];

// Adding empty object for currencies
let rates = {};

// Add Currency API

let requestURL = "https://api.exchangerate.host/latest?base=USD";

fetchRates();

// Adding Async Function

async function fetchRates() {
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populateOptions();
}

// Adding Functions

function populateOptions(){
    let val = ''
    Object.keys(rates).forEach((code) =>{
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    })
    selection.forEach((s) => (s.innerHTML = val));
}

function convert(val, fromCurr, toCurr) {
    let v = (val/rates[fromCurr]) * rates[toCurr];
    let v1 = v.toFixed(3);
    return v1 = 0.0 ? v.toFixed(5) : v1;
}

function displayRate(){
    let v1 = select1.value;
    let v2 = select2.value;

    let val = convert(1, v1, v2);

    firstValue.innerHTML = `1 ${v1} equals`;
    secondValue.innerHTML = `${val} ${v2}`;
}

// Adding Click Event

resultBtn.addEventListener('click', () =>{
    let fromCurr = select1.value;
    let fromVal = parseFloat(input1.value);
    let toCurr = select2.value;

    if(isNaN(fromVal)){
        alert("Please enter a Number!");
    } else {
        let cVal = convert(fromVal, fromCurr, toCurr);
        input2.value = cVal;
    }
});

selection.forEach(s => s.addEventListener('change', displayRate));

document.querySelector('.switch').addEventListener('click', () => {
    let in1 = input1.value;
    let in2 = input2.value;
    let op1 = select1.value;
    let op2 = select2.value;

    input2.value = in1;
    input1.value = in2;

    select2.value = op1;
    select1.value = op2;

    displayRate();

})

