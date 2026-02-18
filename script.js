let runningResult = 0;
let buffer = "0";
let previusOperator;

const screen = document.querySelector('.screen');
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
        buffer = '0';
        runningResult = 0;
        break;
    case '=':
        if(previusOperator === null)
            return
        flushOperator(parseInt(buffer));
        previusOperator = null;
        buffer = runningResult;
        runningResult = 0;
        break;
    case '←':
        if(buffer.length ===1){
            buffer = '0';
        } else {
            buffer = buffer.slice(0, buffer.length - 1);
        }
        break;
    case '+':
    case '-':
    case '×':
    case '÷':
        handleMath(symbol);
        break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningResult === 0){
        runningResult = intBuffer;
    } else {
        flushOperator(intBuffer);
    }
    previusOperator =  symbol;
    buffer = '0';
}

function flushOperator(intBuffer){
    if(previusOperator === '+'){
        runningResult += intBuffer;
    } else if(previusOperator === '-'){
        runningResult -= intBuffer;
    } else if(previusOperator === '×'){
        runningResult *= intBuffer;
    } else if(previusOperator === '÷'){
        runningResult /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();