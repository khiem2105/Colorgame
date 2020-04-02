//*****Select object*****//
var cells = document.querySelectorAll(".color-cell");
var red = document.querySelector(".red");
var green = document.querySelector(".green");
var blue = document.querySelector(".blue");
var title = document.querySelector(".title");
var replay = document.querySelector(".new-colors");
var message = document.querySelector(".text");
var answer;//the index of the correct cell
var easyBtn = document.querySelector(".easy");
var hardBtn = document.querySelector(".hard");
var btns = document.querySelectorAll("a");
var turns = 0;//
var mainHeading = document.querySelector("h1");
var subHeadings = document.querySelectorAll("h2");
var isEasy = false;
var isHard = true;
var isOver = false;
var score = document.querySelector(".score");
var points = 0;
//*****Function to pick random number and random color*****//
function pickRandomNum(b) {
    return Math.floor(Math.random() * b);
}
function pickRandomColor() {
    var red,green,blue;
    var color = "rgb(";
    red = pickRandomNum(255);
    green = pickRandomNum(255);
    blue = pickRandomNum(255);
    color = color + red + ", " + green + ", " + blue + ")";
    return color;
}
//****Adding logic to the game****//
function pickColor() {
//pick the correct color
    red.textContent = pickRandomNum(254);
    green.textContent = pickRandomNum(254);
    blue.textContent = pickRandomNum(254);
//set the correct color to the correct cell
    cells[answer].style.backgroundColor = "rgb(" + red.textContent + ", " 
                                    + green.textContent + ", " + blue.textContent + ")";
};
//generate a random color for all the other cell
function generateColor() {
    for(var i = 0; i < answer; i++) {
        cells[i].style.backgroundColor = pickRandomColor();
    }
    for(i = answer + 1; i < cells.length; i++) {
        cells[i].style.backgroundColor = pickRandomColor();
    }
};
//event click to play
function clickCell() {
    turns ++;
    if(this.style.backgroundColor === cells[answer].style.backgroundColor && turns <= 3) {
        gameOver();
        message.textContent = "You won!";
        points++;
        score.textContent = points;
    }
    else if(((turns === 3 && this.style.backgroundColor !== cells[answer].style.background)
            || turns > 3) && !isOver ) {
        gameOver();
        message.textContent = "You lost!";
    }
    else if(this.style.backgroundColor !== cells[answer].style.backgroundColor) {
        this.style.backgroundColor = "#21243d";
        message.textContent = "Try Again";
    }
};
function chooseCorrectColorHard() {
    for(var i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click",clickCell);
    }
};
function chooseCorrectColorEasy() {
    for(var i = 0; i < 6; i++) {
        cells[i].addEventListener("click",clickCell);
    }
}
//play
function playHard() {
    answer = pickRandomNum(8);
    pickColor();
    generateColor();
    chooseCorrectColorHard();
    subHeadings[0].classList.remove("invisible");
    subHeadings[1].classList.remove("invisible");
    mainHeading.innerHTML = "RGB(<span>" + red.textContent + "</span>, "
                            + "<span>" + green.textContent + "</span>, "
                            + "<span>" + blue.textContent + "</span>)";
    isOver = false;                        
};
function playEasy() {
    answer = pickRandomNum(5);
    pickColor();
    generateColor();
    chooseCorrectColorEasy();
    subHeadings[0].classList.remove("invisible");
    subHeadings[1].classList.remove("invisible");
    mainHeading.innerHTML = "RGB(<span>" + red.textContent + "</span>, "
                            + "<span>" + green.textContent + "</span>, "
                            + "<span>" + blue.textContent + "</span>)";
    isOver = false;                        
}
playHard();
//replay
function rePlayHard() {
    turns = 0;
    for(var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click",clickCell);
    }
    replay.textContent = "NEW COLORS";
    message.textContent = "You have 3 turns";
    title.style.backgroundColor = "#3282b8";
    playHard();
};
function rePlayEasy() {
    turns = 0;
    for(var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click",clickCell);
    }
    replay.textContent = "NEW COLORS";
    message.textContent = "You have 3 turns";
    title.style.backgroundColor = "#3282b8";
    playEasy();
};
replay.addEventListener("click",rePlayHard);
//game over
function gameOver() {
    for(var j = 0; j < cells.length; j++) {
        cells[j].style.backgroundColor = cells[answer].style.backgroundColor;
    }
    title.style.backgroundColor = cells[answer].style.backgroundColor;
    replay.textContent = "CONTINUE ?"
    subHeadings[0].classList.add("invisible");
    subHeadings[1].classList.add("invisible");
    mainHeading.textContent = "This is the answer!";
    isOver = true;
};
//*****Choose level*****
//easy
easyBtn.addEventListener("click",function() {
    if(isHard) {
        for(var i = 6; i < cells.length; i++) {
            cells[i].classList.add("invisible");
        }
        rePlayEasy();
        isHard = false;
        isEasy = true;
        replay.removeEventListener("click",rePlayHard);
        replay.addEventListener("click",rePlayEasy);
        points = 0;
        score.textContent = 0;
        hardBtn.classList.remove("active");
        easyBtn.classList.add("active");
    }
});
//hard
hardBtn.addEventListener("click",function() {
    if(isEasy) {
        for(var i = 6; i < cells.length; i++) {
            cells[i].classList.remove("invisible");
        }
        rePlayHard();
        isEasy = false;
        isHard = true;
        replay.removeEventListener("click",rePlayEasy);
        replay.addEventListener("click",rePlayHard);
        points = 0;
        score.textContent = 0;
        hardBtn.classList.add("active");
        easyBtn.classList.remove("active");
    }
});