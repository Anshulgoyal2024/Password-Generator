const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`{~!@#+=[)_-;:,}".<$%^&*]]|(>/?';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();


function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
}

function getRandominteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min); 
}

function getRandomNumber() {
    return getRandominteger(0, 9);
}

function getRandomLowerc() {
    return String.fromCharCode(getRandominteger(97, 123));
}

function getRandomUpperc() {
    return String.fromCharCode(getRandominteger(65, 91));
}

function getRandomSymbol() {
    const randomNum = getRandominteger(0, symbols.length);
    return symbols.charAt(randomNum); 
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "failed";
    }
   
    setTimeout(() => {
      
        copyMsg.innerText="copy";
    }, 2000);
}

function shufflePassword(array) { 
   
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach((CheckBox) => {
        if (CheckBox.checked) {
            checkCount++;
        }
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((CheckBox) => {
    CheckBox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }


    password = "";

    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(getRandomUpperc);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(getRandomLowerc);
    }
    if (numbersCheck.checked) {
        funcArr.push(getRandomNumber);
    }
    if (symbolsCheck.checked) {
        funcArr.push(getRandomSymbol);
    }

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomindex = getRandominteger(0, funcArr.length);
        password += funcArr[randomindex]();
    }

    
    password = shufflePassword(Array.from(password)); 
    passwordDisplay.value = password;
    calcStrength();
});
