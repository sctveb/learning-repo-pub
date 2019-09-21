var numSquares = 6;
var colors = [];
var pickedColor;

var colorDisplay = document.querySelector("#colorDisplay");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.getElementById("message");

init();

function init() {
    setupModeButtons();
    setupSquareListener();
    reset();
}

resetButton.addEventListener("click", function () {
    reset();
})

for (var i = 0; modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
        reset();
    })
}

function changeColor(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random]
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }
}

function setupSquareListener() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                changeColor(clickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;   
    messageDisplay.textContent = "";
    h1.style.background = "steelblue";
    resetButton.textContent = "New Game";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }        
    }
}

// colorDisplay.textContent = pickedColor

// for (var i = 0; i < squares.length; i++) {
//     squares[i].addEventListener("click", function () {
//         var clickedColor = this.style.background;
//         if (clickedColor === pickedColor) {
//             messageDisplay.textContent = "Correct"
//             changeColor(clickedColor)
//             h1.style.background = clickedColor
//             resetButton.textContent = "Play Again?"
//         } else {
//             this.style.background = "#232323";
//             messageDisplay.textContent = "Try Again"
//         }
//     })
// }

// resetButton.addEventListener("click", function () {
//     colors = generateRandomColors(numSquares)
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].style.background = colors[i]
//     }
//     messageDisplay.textContent = ""
//     h1.style.background = "steelblue"
//     resetButton.textContent = "New Game"
// })

// easyBtn.addEventListener("click", function () {
//     hardBtn.classList.remove("selected")
//     easyBtn.classList.add("selected")
//     numSquares = 3
//     colors = generateRandomColors(numSquares)
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor
//     for (var i = 0; i < squares.length; i++) {
//         if (colors[i]) {
//             squares[i].style.background = colors[i]
//         } else {
//             squares[i].style.display = "none";
//         }
//     }

// })
// hardBtn.addEventListener("click", function () {
//     easyBtn.classList.remove("selected")
//     hardBtn.classList.add("selected")
//     numSquares = 6
//     colors = generateRandomColors(numSquares)
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor
//     for (var i = 0; i < squares.length; i++) {
//         squares[i].style.background = colors[i]
//         squares[i].style.display = "block"
//     }
// })