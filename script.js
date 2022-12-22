const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restart = document.querySelector("#restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "Kittie";
let running = false;
let wins = "";

// calls the begin game function to start the game
beginGame();

// function to begin the game
function beginGame(){

    // event listener on each cell in the grid to detect click on the cell - using the .foreach() method
    cells.forEach(cell => cell.addEventListener("click", squareClicked));

    // event listener to restart the game on the restart button and begin the game again
    restart.addEventListener("click", restartGame);

    // text showing the players whose turn it is using the template literal
    statusText.textContent = `${currentPlayer}'s turn`;

    // sets the state of game running
    running = true;
}

// function for what happens when a cell is clicked
function squareClicked(){

    // local variable using this.getAttribute to get the cell's index number
    const squareIndex = this.getAttribute("squareIndex");

    // only update cell if it is empty and the game is running
    if(options[squareIndex] != "" || !running){
        return;
    }

    // update the cell passing in this and the index of the cell as an argument.
    updateCell(this, squareIndex);

    // check to see if there is a winner.
    checkWinner();
}
// function for updating the cell
function updateCell(cell, index){

    // update our placeholders for the current option chosen and current player
    options[index] = currentPlayer;

    // show which player clicked the cell within the cell's text content
    cell.textContent = currentPlayer;
}
// function to check if a player has won the game
function checkWinner(){

    // use temporary local boolean variable to track if the round has yet been won and set default to false
    let roundWon = false;

    // win conditions logic: iterate over all the win conditions in the winConditions array and check to see if they exist in the options variable
    for(let i = 0; i < winConditions.length; i++){
        // store each inner array, of the winConditions array, in a temporary variable called condition
        const condition = winConditions[i];
        // store each indice of the condition array in three temporary variables
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        // check to see if there is an empty space and then continue the game if there is
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        // check to see if there is a winner across three cells that are the same and then end the game if the round has been won
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    // if the roundWon is true then update the status text to show who won using the template literal
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    // if our options array does not include any empty spaces after no winner has been found then update the status text to declare a draw and end the game
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    // else change the player if there is no winner and no draw
    else{
        changePlayer();
    }
}
// function for changing the player
function changePlayer(){

    // use ternary operator to check who is currently taking a turn and if the answer is truthy change to the other player 
    currentPlayer = (currentPlayer == "Kittie") ? "SBF" : "Kittie";

    // update game status to show whose turn it is using the template literal
    statusText.textContent = `${currentPlayer}'s turn`;
}
// function to restart the game
function restartGame(){

    //  set the first player to take the first turn by updating the current player
    currentPlayer = "Kittie";
    // reset the options to empty strings
    options = ["", "", "", "", "", "", "", "", ""];
    // show whose turn it is using the template literal
    statusText.textContent = `${currentPlayer}'s turn`;
    // reset the cell text content to empty 
    cells.forEach(cell => cell.textContent = "");
    // set game running
    running = true;
}
