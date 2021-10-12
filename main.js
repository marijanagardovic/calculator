//change theme

const themes = document.getElementsByClassName('theme');
for (var i=0; i<themes.length; i++){
    themes[i].addEventListener('click',changeTheme);
}

function changeTheme(e){
    var colorTheme = e.target.id;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', colorTheme);

    for (var i=0; i<themes.length; i++){
        themes[i].style.setProperty('background-color', 'inherit');
    }

    var circle = document.getElementById(colorTheme);
    circle.style.setProperty('background-color', 'var(--key-eq-bg)');
}

// functions for calculator

const screen = document.getElementsByClassName("result")[0];
let screenNum = screen.innerHTML;
let resultArr = [];
let result=0;

const delKey = document.getElementById("delete");
delKey.addEventListener('click', () => {

    if(screenNum != 0) {
        let temp = screenNum.toString();
        if(temp.length == 1){
            screenNum = 0;
        }
        else if(( !temp.includes('.')) && ( !temp.includes(','))) {
            screenNum = splitJoin(temp);
        } else if (temp.includes('.')){
            screenNum = splitJoin(temp);
        } else {
            temp = splitJoin(temp);
            temp = temp.toString().replace(/\,/g,'');
            screenNum = parseInt(temp).toLocaleString('en-US');
        }
    } 
    screen.innerHTML = screenNum;
});

function splitJoin(temp) {
    temp = temp.split('');
    temp.pop();
    return temp.join('');
}

const resetKey = document.getElementById('reset-key');
resetKey.addEventListener('click', () => {
    resultArr = [];
    result = '';
    screenNum = 0;
    screen.innerHTML = screenNum;
});

const keys = document.getElementsByClassName("key");
for(let i =0; i <keys.length; i++){
    keys[i].addEventListener('click', changeScreenNum);
}

function changeScreenNum(ev) {
    const keyNum = ev.target.innerHTML;
    
    if(screenNum == 0) {
        screenNum = keyNum;
    } 
    else if(((keyNum == '.') || (screenNum.toString().includes('.')) 
        || (( !screenNum.toString().includes('.')) && (screenNum.length < 3)))){
        screenNum = screenNum+keyNum;
        } else {
        let temp = screenNum.toString();
            temp = temp.replace(/\,/g,'');
            temp += keyNum;
            screenNum = parseInt(temp).toLocaleString('en-US');
        }
    
    screen.innerHTML = screenNum;
}


const operators = document.getElementsByClassName("operator");
for(let i =0; i <operators.length; i++){
    operators[i].addEventListener('click', addOperator);
}

function addOperator(ev){
    let operator = ev.target.innerHTML;
    if(operator == 'x') {
        operator = '*';
    }
    resultArr.push(screenNum);
    resultArr.push(operator);
    
    screenNum = 0;
}

const equals = document.getElementById('equals-key');
equals.addEventListener('click', sum);

function sum(ev){
    resultArr.push(screenNum);
    result = resultArr.join('');
    screenNum = window.eval(result);
    screen.innerHTML = screenNum;
    resultArr = [];
    result = '';
}