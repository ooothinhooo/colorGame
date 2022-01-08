// id
const button = document.querySelector('#button')
const button2 = document.querySelector('#button2')
const box = document.querySelector('#box')
const game = document.querySelector('#game')
const cord = document.querySelector('#cord')
const win = document.querySelector('#win')
const cordGame = document.querySelector('#cordGame')
const g0 = document.querySelector('#g0')
const g1 = document.querySelector('#g1')

// class
const screen = document.querySelector('.screen')
const classTime = document.querySelector('.time')
const classCord = document.querySelector('.cord')
const classButton = document.querySelector('.button')
const classButton2 = document.querySelector('.button2')
const styleGame = document.querySelector('.game');
const styleBox = document.querySelector('.box');
const endGame = document.querySelector('.endgame')
const content = document.querySelector('.content')

var diem = 0;

const Array = [5, 8, 11, 14, 19, 23, 27, 34, 41, 47, 53, 59, 65];


// button Run Game
button.addEventListener('click', () => {
    removediv();
    makeGame();
    endGame.classList.add('active');
    classButton.classList.add('active');
    classCord.classList.remove('active');
    classTime.classList.remove('active');
    content.classList.add('active')

    time();
   
    //console.log(localStorage.getItem('cord'))
});
button2.addEventListener('click', () => {
    screen.classList.remove('active');
    classCord.classList.remove('active');
    classTime.classList.remove('active');
    classButton.classList.add('active');
    endGame.classList.add('active');
    diem=0;
    document.getElementById('cord').innerHTML = 000;
    localStorage['diem'] =0;
    removediv();
    makeGame();
    time();
});

// remove div box
function removediv() {
    const game = document.querySelector('#game')
    while (game.firstChild) {
        game.removeChild(game.lastChild);
    }
}

// win game
function gameWin() {
    removediv();
    makeGame();
    cordGameFun();
}

function diemFun() {
    return diem++;
}

function cordGameFun() {
    diemFun();
    cord.innerHTML = diem;
}
// random 1 num
function Random(x) {
    num = Math.floor(Math.random() * x);
    return num;

}


//opacityColor color 
function opacityColor() {
    var a = Math.floor(Math.random() * 11)
    if (a == 0) {
        a = 9;
    }
    x = "0." + a;
    return x;
}

// random num for array
function loopArray(x, y) {
    num = Math.floor(Math.random() * y)
    if (num >= x) {
        num = 4
    }
    return num;
}

// make color
function makeColor(x) {
    var color = "rgb(" + Random(256) + ", " + Random(256) + ", " + Random(256) + "," + x + ")";
    return color;
}

// make game color
function makeGame() {
    x = opacityColor()
    r = Random(256)
    g = Random(256)
    b = Random(256)
    const color = "rgb(" + r + ", " + g + ", " + b + ")";
    const colorwin = "rgb(" + r + ", " + g + ", " + b + "," + opacityColor() + ")";

    loop = loopArray(14, 11)
    //console.log("loop = " + loop)
    temp = Array[loop]
    //console.log("temp = " + temp)
    loopBox = Math.abs(temp - loopArray(temp, 11));
    //console.log("loopBox =" + loopBox)
    if (temp == loopBox) loopBox = temp - 2;
    //temp = Array[12]
    for (let i = 0; i < Array[loop]; i++) {
        //for(let i=0; i<temp;i++){
        // create element div
        const htmlObj = document.getElementById('game');
        htmlObj.innerHTML = htmlObj.innerHTML + `<div class="box" style="background:` + color + `;"></div>`;
        if (i === loopBox) {
            const htmlObj = document.getElementById('game');
            htmlObj.innerHTML = htmlObj.innerHTML + `<div class="box win" style="background:` + colorwin + `;" onclick=" gameWin();" ></div>`;
        }
    }

    check(Array[loop])
}

// check and changes gird columns
function check(x) {

    if (x > 16 && x < 25) {
        styleGame.style.gridTemplateColumns = "50px 50px 50px 50px";
    } else if (x > 26 && x < 32) {
        styleGame.style.gridTemplateColumns = "50px 50px 50px 50px 50px";
    } else if (x > 34 && x < 51) {
        styleGame.style.gridTemplateColumns = "50px 50px 50px 50px 50px 50px";
    } else if (x > 52) {
        styleGame.style.gridTemplateColumns = "50px 50px 50px 50px 50px 50px";
        styleBox.style.width = "30px";
        styleBox.style.height = "30px";
    }
}

// time
function time() {
    var fiveMinutes = 60 * 1.5,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);

}

function startTimer(duration, display) {
    var timer = duration,
        minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //display.textContent = minutes + ":" + seconds;
        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }

        if (timer === 0) {
            screen.classList.add('active');
            classCord.classList.add('active');
            classTime.classList.add('active');
            endGame.classList.remove('active');
           
            x = document.getElementById('cord').innerHTML;
            localStorage['diem'] =x;
            if( localStorage.getItem('cord') <= x ) {
                localStorage['cord'] = x
                g0.innerText= "Kỉ Lục Mới";
               g1.innerText =  x ;
            }else{
                g0.innerText="Thành Tích Mới"
                g1.innerText = x ;
            }

             localStorage['diem'] =0;
            classButton.classList.add('active');
            classButton2.classList.remove('active');
        }
    }, 1000);
}