var numSquares = 6;
var colors = [];
var pickedColor;

var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("resetButton");
var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");


Init();

//reset button event listener
resetButton.addEventListener("click", function(){
    Reset();
});


//***FUNCTIONS***//

//for structuring sake in future: set up objects+their functions

function ChangeColors(){
        //loop through squares
        for (var i=0; i < squares.length; i++){
        //change each color to match correct color
        squares[i].style.background = pickedColor;
        }
    }

function Reset(){
    //figure out how many squares to show
    colors = GenerateRandomColors(numSquares);
    //pick new colors
    pickedColor = PickColor();
    //pick new pickedColors
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        //check if there is color that matches the square
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        }
        //when colors[i] is null display none
        else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}

function PickColor(){
    //pick random number to access element of colors array
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function GenerateRandomColors(num){
    //create array
    var arr = [];
    //repeat num times
    for (var i=0; i < num; i++){
        //get random color and push into array
        arr.push(RandomColor ());
    }
    //return array
    return arr;
}

function SetUpModeButtons(){
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            //"this" refers to what was clicked on
            this.classList.add("selected");

            //change this line to add/remove difficulty
            this.textContent === "Easy" ? numSquares = 3: numSquares =6;
            //if this.textContent is equal to "Easy" then ..=3 otherwise ..=6

            Reset();
        });
    }
}

function SetUpSquares() {
    //change color
    for (var i=0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of picked square
            var clickedColor = this.style.background;
            //compare color to pickedColor - check if you win
                if (clickedColor === pickedColor){
                    messageDisplay.textContent = "Correct!";
                    resetButton.textContent = "Play Again?";
                    ChangeColors(clickedColor);
                    h1.style.background = clickedColor;
                }
                else {
                    this.style.background = "#232323";
                    messageDisplay.textContent = "Try Again!"
                }
        });
    }
}

function RandomColor(){
    //pick red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    //pick green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    //pick blue from 0 to 255
    var b = Math.floor(Math.random() * 256);
    //"rgb(r, g, b)"
    return "rgb(" + r + "," + " " + g + "," + " " + b + ")";
}

function Init(){
    //mode buttons event listeners
    SetUpModeButtons();
    SetUpSquares();

    Reset();
}